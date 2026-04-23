/* eslint-disable @typescript-eslint/no-require-imports */
const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'questtours_db',
  password: 'vineet',
  port: 5432,
});

async function run() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS support_requests (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id),
          subject VARCHAR(255) NOT NULL,
          priority VARCHAR(20) DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High')),
          status VARCHAR(20) DEFAULT 'Open' CHECK (status IN ('Open', 'In Progress', 'Resolved', 'Closed')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Table support_requests created or already exists');
    process.exit(0);
  } catch (err) {
    console.error('Error creating table:', err);
    process.exit(1);
  }
}

run();
