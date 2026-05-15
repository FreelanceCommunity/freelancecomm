# FreelanceComm Google Meet Booking Chatbot Backend

Express.js backend server for Google Meet booking chatbot that integrates with Google Calendar API and multiple messaging platforms.

## 🎯 Purpose

This Express.js server enables automated Google Meet scheduling through various chatbot interfaces (WhatsApp, Telegram, Web Chat). It handles:

1. **Natural Language Processing** - Understands user booking requests
2. **Google Calendar Integration** - Creates, updates, and manages Google Meet events
3. **Multi-platform Support** - Works with WhatsApp, Telegram, and web chat
4. **Real-time Communication** - WebSocket support for live updates
5. **Booking Management** - Full CRUD operations for meetings

## 🏗️ Architecture

```
backend/
├── src/
│   ├── server.js              # Main server entry point
│   ├── routes/               # API route definitions
│   │   ├── booking.routes.js  # Booking management endpoints
│   │   ├── webhook.routes.js  # Chatbot webhook endpoints
│   │   ├── auth.routes.js     # Authentication endpoints
│   │   └── calendar.routes.js # Google Calendar operations
│   ├── controllers/          # Route controllers
│   ├── services/            # Business logic services
│   │   ├── calendar.service.js  # Google Calendar API integration
│   │   ├── chatbot.service.js   # NLP and message processing
│   │   └── database.service.js  # Database operations
│   ├── middleware/          # Express middleware
│   ├── models/             # Database models
│   └── utils/              # Utility functions
├── package.json            # Dependencies and scripts
└── .env.example           # Environment variables template
```

## 🔧 Key Features

### 1. **Google Meet Integration**
- Create Google Meet events with automatic link generation
- Check calendar availability in real-time
- Send calendar invites and reminders
- Handle timezone conversions

### 2. **Chatbot NLP Processing**
- Intent recognition (booking, rescheduling, cancellation)
- Entity extraction (dates, times, durations)
- Multi-platform message handling
- Context-aware conversations

### 3. **Webhook Support**
- WhatsApp (Twilio integration)
- Telegram bot webhooks
- Web chat interface
- Dialogflow fulfillment

### 4. **Real-time Features**
- WebSocket connections for live updates
- Booking status notifications
- Instant availability checks

### 5. **Security & Reliability**
- JWT authentication
- Rate limiting
- Input validation and sanitization
- Error handling and logging

## 🚀 Quick Start

### 1. Installation
```bash
cd backend
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Required Environment Variables
```env
# Google API
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback

# Twilio (WhatsApp)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Database
MONGODB_URI=mongodb://localhost:27017/freelancecomm_booking

# JWT
JWT_SECRET=your_jwt_secret
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Production Build
```bash
npm start
```

## 📡 API Endpoints

### Booking Management
```
POST   /api/bookings           - Create new Google Meet booking
GET    /api/bookings           - Get user's bookings
GET    /api/bookings/:id       - Get specific booking
PUT    /api/bookings/:id       - Update booking
DELETE /api/bookings/:id       - Cancel booking
POST   /api/bookings/availability - Check time slot availability
```

### Chatbot Webhooks
```
POST   /api/webhooks/whatsapp     - WhatsApp messages (Twilio)
POST   /api/webhooks/telegram     - Telegram messages
POST   /api/webhooks/chat         - Web chat messages
POST   /api/webhooks/dialogflow   - Dialogflow fulfillment
```

### Authentication
```
GET    /api/auth/google          - Google OAuth login
GET    /api/auth/google/callback - OAuth callback
POST   /api/auth/login           - JWT login
POST   /api/auth/register        - User registration
```

### Calendar Operations
```
GET    /api/calendar/events      - List calendar events
POST   /api/calendar/sync        - Sync with Google Calendar
GET    /api/calendar/busy        - Get busy periods
```

## 🤖 Chatbot Usage Examples

### Booking a Meeting
```
User: "Book a meeting for tomorrow at 2 PM for 30 minutes"
Bot: "✅ Meeting booked! Google Meet link: https://meet.google.com/abc-defg-hij
     Date: Tomorrow at 2:00 PM
     Duration: 30 minutes
     [Add to Calendar] [Join Meeting]"
```

### Checking Availability
```
User: "Is 3 PM tomorrow available?"
Bot: "Checking availability... 
     ✅ 3 PM tomorrow is available.
     Alternative times: 2 PM, 4 PM, 5 PM"
```

### Rescheduling
```
User: "Reschedule meeting ABC123 to Friday at 11 AM"
Bot: "✅ Meeting rescheduled to Friday at 11:00 AM
     New link: https://meet.google.com/xyz-uvw-rst"
```

## 🔌 Integration Guide

### 1. Google Calendar Setup
1. Create Google Cloud Project
2. Enable Calendar API
3. Configure OAuth 2.0 credentials
4. Set up service account for server-to-server auth

### 2. Twilio WhatsApp Setup
1. Create Twilio account
2. Get WhatsApp Business API access
3. Configure webhook URL: `https://your-domain.com/api/webhooks/whatsapp`

### 3. Telegram Bot Setup
1. Create bot via @BotFather
2. Get bot token
3. Set webhook: `https://your-domain.com/api/webhooks/telegram`

### 4. Web Chat Integration
```javascript
// Frontend integration example
const socket = io('https://your-domain.com');
socket.emit('booking_request', {
  userId: 'user123',
  message: 'Book meeting tomorrow 2 PM'
});
```

## 📊 Database Schema

### Booking Model
```javascript
{
  _id: ObjectId,
  userId: String,
  title: String,
  description: String,
  startTime: Date,
  endTime: Date,
  timeZone: String,
  googleEventId: String,
  meetLink: String,
  attendees: [{
    email: String,
    name: String,
    responseStatus: String
  }],
  status: String, // 'scheduled', 'cancelled', 'completed'
  createdAt: Date,
  updatedAt: Date
}
```

### User Model
```javascript
{
  _id: ObjectId,
  email: String,
  name: String,
  phone: String,
  googleTokens: {
    accessToken: String,
    refreshToken: String,
    expiryDate: Date
  },
  preferences: {
    defaultDuration: Number,
    timeZone: String,
    notificationPreferences: Object
  },
  createdAt: Date
}
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run with coverage
npm run test:coverage
```

## 📈 Monitoring & Logging

- **Winston** for structured logging
- **Morgan** for HTTP request logging
- **Google Analytics** for usage tracking
- **Sentry** for error monitoring
- **Health check endpoint**: `/health`

## 🔒 Security Considerations

1. **OAuth 2.0** for Google API authentication
2. **JWT tokens** for API authentication
3. **Rate limiting** to prevent abuse
4. **Input validation** and sanitization
5. **HTTPS enforcement** in production
6. **CORS configuration** for frontend access
7. **Environment variables** for sensitive data

## 🚢 Deployment

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Vercel/Heroku Deployment
```bash
# Set environment variables
heroku config:set GOOGLE_CLIENT_ID=your_id
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

## 📚 API Documentation

Full API documentation available at `/api-docs` when running in development mode.

## 🆘 Support

For issues and questions:
- Email: support@freelancecomm.in
- GitHub Issues: [Repository Issues]
- Documentation: [Full Documentation]

## 📄 License

Proprietary - © FreelanceComm 2024