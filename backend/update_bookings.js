const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'questtours_db',
  password: 'vineet',
  port: 5432,
});

async function update() {
  try {
    await pool.query("UPDATE bookings SET status = 'completed' WHERE amount = 5000");
    console.log('Bookings updated successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error updating bookings:', err);
    process.exit(1);
  }
}

update();
