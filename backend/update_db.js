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
    await pool.query('ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_status_check');
    await pool.query("ALTER TABLE bookings ADD CONSTRAINT bookings_status_check CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed'))");
    console.log('Constraint updated successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error updating constraint:', err);
    process.exit(1);
  }
}

update();
