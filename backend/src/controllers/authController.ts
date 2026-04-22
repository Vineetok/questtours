import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user exists
    const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, hashedPassword, role || 'customer']
    );

    const user = newUser.rows[0];

    // Generate JWT
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: '24h',
    });

    res.status(201).json({
      message: 'User registered successfully',
      user,
      token,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log('Login attempt for:', email);

  try {
    // Check user
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      console.log('User not found in database');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];
    console.log('User found:', user.email, 'with role:', user.role);

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password isMatch:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: '24h',
    });

    res.json({
      message: 'Logged in successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
