const express = require('express');
const app = express();

// Simple test endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Test server is running' });
});

// Start server
const PORT = 5000;
const HOST = 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`Test server running on http://${HOST}:${PORT}`);
});
