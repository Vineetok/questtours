import { Request, Response } from 'express';
import pool from '../config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key';

export const createBooking = async (req: Request, res: Response) => {
  const client = await pool.connect();

  try {
    const { formData, tourDetails } = req.body;

    // 0. Authenticate or Create User
    if (!formData.password) {
      return res.status(400).json({ message: 'Password is required to secure your booking.' });
    }

    let userId;
    let token;
    let userRole = 'customer';
    let userName = formData.fullName;

    const userExistResult = await client.query('SELECT * FROM users WHERE email = $1', [formData.email]);
    
    if (userExistResult.rows.length > 0) {
      const user = userExistResult.rows[0];
      const isMatch = await bcrypt.compare(formData.password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Account exists. Incorrect password.' });
      }
      userId = user.id;
      userRole = user.role;
      userName = user.name;
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(formData.password, salt);
      const newUser = await client.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id',
        [formData.fullName, formData.email, hashedPassword, 'customer']
      );
      userId = newUser.rows[0].id;
    }

    token = jwt.sign({ id: userId, role: userRole }, JWT_SECRET, { expiresIn: '24h' });

    // Start transaction
    await client.query('BEGIN');

    // 1. Insert or Update Traveler
    let dbGender = 'Mx.';
    if (['Mr.', 'Mrs.', 'Ms.', 'Mx.'].includes(formData.salutation)) {
      dbGender = formData.salutation;
    }

    const travelerQuery = `
      INSERT INTO travelers (
        full_legal_name, date_of_birth, gender, nationality, country_of_residence, email, phone, 
        passport_number, issuing_country, passport_expiry,
        has_limitations, limitation_description, has_allergies, allergy_details, dietary_restrictions
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
      )
      ON CONFLICT (passport_number) DO UPDATE SET
        full_legal_name = EXCLUDED.full_legal_name,
        email = EXCLUDED.email,
        phone = EXCLUDED.phone
      RETURNING traveler_id;
    `;

    const hasLimitations = formData.health ? true : false;
    const healthDetails = formData.health || '';

    const travelerValues = [
      formData.fullName,
      formData.dob,
      dbGender,
      formData.nationality,
      formData.nationality,
      formData.email,
      formData.whatsapp,
      formData.passport,
      formData.issuingCountry,
      formData.passportExpiry,
      hasLimitations,
      healthDetails,
      false,
      '',
      ''
    ];

    const travelerResult = await client.query(travelerQuery, travelerValues);
    const travelerId = travelerResult.rows[0].traveler_id;

    // 2. Insert Booking
    const bookingReference = 'BR-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    const groupData = {
      total_passengers: tourDetails.passengers || 1,
      adults: formData.adults || 1,
      children: formData.children || 0,
      infants: formData.infants || 0
    };

    const bookingQuery = `
      INSERT INTO bookings (
        booking_reference, travel_start_date, travel_end_date, group_data, accommodation_preferences,
        insurance_policy_number, amount, payment_method, last_four_digits, payment_status, booking_status, user_id
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
      ) RETURNING booking_id;
    `;

    const lastFour = formData.cardNumber ? formData.cardNumber.slice(-4) : '0000';

    const bookingValues = [
      bookingReference,
      formData.arrival,
      formData.departure,
      JSON.stringify(groupData),
      formData.accommodation || '',
      formData.insurance,
      tourDetails.totalPrice,
      'Credit Card',
      lastFour,
      'paid',
      'confirmed',
      userId
    ];

    const bookingResult = await client.query(bookingQuery, bookingValues);
    const bookingId = bookingResult.rows[0].booking_id;

    // 3. Insert Booking_Traveler Link
    const linkQuery = `
      INSERT INTO booking_travelers (booking_id, traveler_id, seat_status)
      VALUES ($1, $2, 'confirmed');
    `;
    await client.query(linkQuery, [bookingId, travelerId]);

    // Commit transaction
    await client.query('COMMIT');

    res.status(201).json({
      message: 'Booking successfully created',
      bookingId,
      bookingReference,
      token,
      user: {
        id: userId,
        name: userName,
        email: formData.email,
        role: userRole
      }
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    client.release();
  }
};
