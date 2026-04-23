const { Pool } = require('pg');
require('dotenv').config({ path: './.env' });

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'questtours',
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT || '5432'),
});

async function seedTickets() {
  try {
    // Get a customer
    const userResult = await pool.query("SELECT id FROM users WHERE role = 'customer' LIMIT 1");
    if (userResult.rows.length === 0) {
      console.log('No customers found to seed tickets for.');
      process.exit(0);
    }
    const userId = userResult.rows[0].id;

    const tickets = [
      { subject: 'Issue with booking confirmation', description: 'I did not receive a confirmation email for my booking BK-001.', priority: 'High', status: 'Open' },
      { subject: 'Refund request for cancelled trip', description: 'I cancelled my trip but haven\'t received the refund yet.', priority: 'Medium', status: 'In Progress' },
      { subject: 'How to change profile picture?', description: 'I am unable to find the option to update my profile photo.', priority: 'Low', status: 'Resolved' }
    ];

    for (const ticket of tickets) {
      await pool.query(
        'INSERT INTO tickets (user_id, subject, description, priority, status) VALUES ($1, $2, $3, $4, $5)',
        [userId, ticket.subject, ticket.description, ticket.priority, ticket.status]
      );
    }

    console.log('Successfully seeded 3 tickets');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding tickets:', err);
    process.exit(1);
  }
}

seedTickets();
