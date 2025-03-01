/**
 * Configuration file for the Globetrotter application
 * Contains environment-specific settings
 */

// Determine which environment we're in
const env = process.env.REACT_APP_ENV || process.env.NODE_ENV || 'development';

// Configuration for different environments
const config = {
  development: {
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  },
  test: {
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  },
  production: {
    // In production, this could be a different URL or use the same origin
    apiUrl: process.env.REACT_APP_API_URL || window.location.origin + '/api',
  },
};

// Export the configuration for the current environment
export default config[env];
