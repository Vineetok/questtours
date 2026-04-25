
import pool from './src/config/db';

async function migrate() {
  try {
    console.log('Starting migration...');
    await pool.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(20)');
    await pool.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS location VARCHAR(255)');
    console.log('Migration completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
