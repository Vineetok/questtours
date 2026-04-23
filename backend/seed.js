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
    const tourRes = await pool.query("INSERT INTO tours (title, price, location) VALUES ('Goa Beach Tour', 5000, 'Goa'), ('Jaipur Heritage', 7000, 'Jaipur') RETURNING id");
    const tourId = tourRes.rows[0].id;
    
    await pool.query("INSERT INTO bookings (tour_id, amount, status) VALUES ($1, 5000, 'confirmed'), ($1, 5000, 'confirmed'), ($1, 7000, 'pending')", [tourId]);
    
    console.log('Dummy data inserted successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
}

seed();
