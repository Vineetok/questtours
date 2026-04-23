/* eslint-disable @typescript-eslint/no-require-imports */
const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'questtours_db',
  password: 'vineet',
  port: 5432,
});

async function seed() {
  try {
    const userId = 4; // dipali mudabe (customer)
    
    // 1. Add Support Requests
    await pool.query(`
      INSERT INTO support_requests (user_id, subject, priority, status) VALUES 
      ($1, 'Issue with booking confirmation', 'High', 'Open'),
      ($1, 'Refund request for cancelled trip', 'Medium', 'In Progress'),
      ($1, 'How to change profile picture?', 'Low', 'Resolved')
    `, [userId]);

    // 2. Add More Bookings for this user
    const tourRes = await pool.query("SELECT id FROM tours LIMIT 2");
    if (tourRes.rows.length > 0) {
        const tourId1 = tourRes.rows[0].id;
        const tourId2 = tourRes.rows[1] ? tourRes.rows[1].id : tourId1;

        await pool.query(`
            INSERT INTO bookings (user_id, tour_id, amount, status, booking_date) VALUES 
            ($1, $2, 12000, 'confirmed', NOW() - INTERVAL '2 days'),
            ($1, $3, 8500, 'pending', NOW() - INTERVAL '1 day')
        `, [userId, tourId1, tourId2]);
    }

    console.log('Extra seed data inserted successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding extra data:', err);
    process.exit(1);
  }
}

seed();
