const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from src/.env
dotenv.config({ path: path.join(__dirname, '.env') });

console.log('🚀 Starting FreelanceComm Booking Backend...');
console.log('📁 Loading environment from:', path.join(__dirname, '.env'));

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Google Meet Booking API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'FreelanceComm Google Meet Booking API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      bookings: '/api/bookings',
      webhooks: '/api/webhooks',
      calendar: '/api/calendar'
    },
    documentation: '/api-docs'
  });
});

// Import and use routes
try {
  const authRoutes = require('./routes/auth.routes');
  const webhookRoutes = require('./routes/webhook.routes');
  const bookingRoutes = require('./routes/booking.routes');
  const calendarRoutes = require('./routes/calendar.routes');
  
  app.use('/api/auth', authRoutes);
  app.use('/api/webhooks', webhookRoutes);
  app.use('/api/bookings', bookingRoutes);
  app.use('/api/calendar', calendarRoutes);
  
  console.log('✅ Routes loaded successfully');
} catch (error) {
  console.error('⚠️  Error loading routes:', error.message);
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
    path: req.path
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log('');
  console.log('✅ Server started successfully!');
  console.log('🌐 Server running on:', `http://localhost:${PORT}`);
  console.log('📅 Google Meet Booking API ready');
  console.log('🔑 Google Client ID:', process.env.GOOGLE_CLIENT_ID ? '✅ Configured' : '❌ Not configured');
  console.log('');
  console.log('Available endpoints:');
  console.log('  - GET  /health');
  console.log('  - GET  /api/auth/google');
  console.log('  - POST /api/bookings');
  console.log('  - POST /api/webhooks/whatsapp');
  console.log('  - GET  /api/calendar/events');
  console.log('');
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use`);
    console.error('   Try a different port or stop the other process');
  } else {
    console.error('❌ Server error:', error);
  }
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\nSIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

module.exports = app;