// Simple test server to verify dependencies are installed
const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  res.json({
    message: 'FreelanceComm Booking Backend is working!',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Google Meet Booking API',
    version: '1.0.0'
  });
});

app.listen(PORT, () => {
  console.log(`✅ Test server running on http://localhost:${PORT}`);
  console.log(`✅ Express.js dependency is working correctly`);
});