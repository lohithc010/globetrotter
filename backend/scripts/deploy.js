require('dotenv').config();
const { execSync } = require('child_process');

console.log('Starting deployment process...');

try {
  // Run migrations
  console.log('Running database migrations...');
  execSync('node scripts/migrate.js', { stdio: 'inherit' });
  
  // Run seed
  console.log('Running database seed...');
  execSync('node scripts/seed.js', { stdio: 'inherit' });
  
  console.log('Deployment process completed successfully');
} catch (error) {
  console.error('Deployment process failed:', error.message);
  process.exit(1);
}
