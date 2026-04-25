
import pool from './src/config/db';

async function testDB() {
  try {
    const result = await pool.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'tours')");
    console.log('Tours table exists:', result.rows[0]);
    
    const countResult = await pool.query('SELECT COUNT(*) FROM tours');
    console.log('Tours count:', countResult.rows[0]);
    
    process.exit(0);
  } catch (error) {
    console.error('DB Test Error:', error);
    process.exit(1);
  }
}

testDB();
