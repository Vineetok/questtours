const { Pool } = require('pg');
require('dotenv').config({ path: './.env' });

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'questtours',
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT || '5432'),
});

async function initPayments() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        booking_id INTEGER REFERENCES bookings(id),
        amount DECIMAL(10, 2) NOT NULL,
        method VARCHAR(50) NOT NULL,
        status VARCHAR(20) DEFAULT 'Succeeded' CHECK (status IN ('Succeeded', 'Failed', 'Refunded', 'Pending')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  try {
    await pool.query(createTableQuery);
    console.log('Payments table created successfully');
    
    // Check if we have any users and bookings to seed
    const usersResult = await pool.query('SELECT id FROM users WHERE role = $1 LIMIT 1', ['customer']);
    const bookingsResult = await pool.query('SELECT id, amount FROM bookings LIMIT 1');
    
    if (usersResult.rows.length > 0 && bookingsResult.rows.length > 0) {
      const userId = usersResult.rows[0].id;
      const bookingId = bookingsResult.rows[0].id;
      const amount = bookingsResult.rows[0].amount;
      
      const seedQuery = `
        INSERT INTO payments (user_id, booking_id, amount, method, status)
        VALUES ($1, $2, $3, 'Credit Card', 'Succeeded')
        ON CONFLICT DO NOTHING;
      `;
      await pool.query(seedQuery, [userId, bookingId, amount]);
      console.log('Seed payment added');
    }
    
    process.exit(0);
  } catch (err) {
    console.error('Error initializing payments:', err);
    process.exit(1);
  }
}

initPayments();
