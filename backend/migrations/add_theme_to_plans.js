const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function addThemeColumn() {
  const client = await pool.connect();
  try {
    console.log('Adding theme column to plans table...');
    
    // Check if column exists
    const result = await client.query(
      `SELECT column_name FROM information_schema.columns 
       WHERE table_name='plans' AND column_name='theme'`
    );
    
    if (result.rows.length === 0) {
      // Column doesn't exist, so add it
      await client.query(
        `ALTER TABLE plans ADD COLUMN theme VARCHAR(50) DEFAULT 'Culture'`
      );
      console.log('✓ Theme column added successfully');
    } else {
      console.log('✓ Theme column already exists');
    }
  } catch (error) {
    console.error('Error adding theme column:', error);
    throw error;
  } finally {
    await client.end();
  }
}

addThemeColumn()
  .then(() => {
    console.log('Migration completed');
    process.exit(0);
  })
  .catch(error => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
