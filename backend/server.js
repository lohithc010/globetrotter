require('dotenv').config();
const express = require('express');
const cors = require('cors');
const destinationRoutes = require('./routes/destinations');
const userRoutes = require('./routes/users');
const challengeRoutes = require('./routes/challenges');

// Log environment variables for debugging (only in development)
if (process.env.NODE_ENV !== 'production') {
  console.log('Environment variables:');
  console.log('PORT:', process.env.PORT);
  console.log('HOST:', process.env.HOST);
  console.log('DB_USER:', process.env.DB_USER);
  console.log('DB_HOST:', process.env.DB_HOST);
  console.log('DB_DATABASE:', process.env.DB_DATABASE);
  console.log('DB_PORT:', process.env.DB_PORT);
  console.log('NODE_ENV:', process.env.NODE_ENV);
}

const app = express();
const PORT = process.env.PORT || 5000;
// In Vercel, we don't need to specify HOST
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : (process.env.HOST || 'localhost');

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [/\.vercel\.app$/, /localhost/] // Allow Vercel domains and localhost
    : '*', // Allow any origin in development
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/destinations', destinationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/challenges', challengeRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Root endpoint for basic testing
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Globetrotter API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Start server
if (process.env.NODE_ENV !== 'production') {
  // Only bind to a specific host in non-production environments
  try {
    app.listen(PORT, HOST, () => {
      console.log(`Server running on http://${HOST}:${PORT}`);
      console.log(`Health check available at http://${HOST}:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
} else {
  // In production (Vercel), we don't need to specify the host
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the Express app for Vercel
module.exports = app;
