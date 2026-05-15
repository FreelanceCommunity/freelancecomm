// Debug server to check what's happening
const express = require('express');
const app = express();
const PORT = 5000;

console.log('Starting debug server...');
console.log('Current directory:', process.cwd());
console.log('Environment file location:', process.cwd() + '/src/.env');

// Try to load .env
try {
  require('dotenv').config({ path: './src/.env' });
  console.log('✅ .env file loaded successfully');
  console.log('PORT from env:', process.env.PORT);
  console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Not set');
} catch (error) {
  console.error('❌ Error loading .env:', error.message);
}

app.get('/', (req, res) => {
  res.json({ message: 'Debug server working', env: process.env.GOOGLE_CLIENT_ID ? 'loaded' : 'not loaded' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const server = app.listen(PORT, () => {
  console.log(`✅ Debug server running on http://localhost:${PORT}`);
  console.log('Server started successfully!');
});

server.on('error', (error) => {
  console.error('Server error:', error);
});
