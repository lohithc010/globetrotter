require('dotenv').config();
const { Pool } = require('pg');

// Create a connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
    sslmode: 'require'
  }
});

async function runMigrations() {
  const client = await pool.connect();
  
  try {
    console.log('Starting database migrations...');
    
    // Begin transaction
    await client.query('BEGIN');
    
    // Create tables if they don't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS destinations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS clues (
        id SERIAL PRIMARY KEY,
        destination_id INTEGER REFERENCES destinations(id) ON DELETE CASCADE,
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS facts (
        id SERIAL PRIMARY KEY,
        destination_id INTEGER REFERENCES destinations(id) ON DELETE CASCADE,
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        score INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS challenges (
        id UUID PRIMARY KEY,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Create indexes for performance
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_clues_destination_id ON clues(destination_id);
      CREATE INDEX IF NOT EXISTS idx_facts_destination_id ON facts(destination_id);
      CREATE INDEX IF NOT EXISTS idx_challenges_user_id ON challenges(user_id);
    `);
    
    // Commit transaction
    await client.query('COMMIT');
    
    console.log('Database migrations completed successfully');
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error running migrations:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Run migrations
runMigrations()
  .then(() => {
    console.log('Migration process completed');
    pool.end();
  })
  .catch((error) => {
    console.error('Migration process failed:', error);
    pool.end();
    process.exit(1);
  });
