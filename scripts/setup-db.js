require('dotenv').config({ path: '../backend/.env' });
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function setupDatabase() {
  try {
    // Create the database if it doesn't exist
    console.log('Creating database if it doesn\'t exist...');
    await pool.query(`
      SELECT 'CREATE DATABASE ${process.env.DB_DATABASE}'
      WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${process.env.DB_DATABASE}')
    `);
    
    // Connect to the specific database
    const client = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });
    
    // Read and execute the SQL migration file
    console.log('Running migrations...');
    const sqlFilePath = path.join(__dirname, '../backend/db/migrations/01_init.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    
    await client.query(sqlContent);
    
    console.log('Database setup complete!');
    
    // Disconnect from databases
    await client.end();
    await pool.end();
    
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();
