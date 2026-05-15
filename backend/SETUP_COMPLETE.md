# ✅ FreelanceComm Google Meet Booking System - Setup Complete!

## 🎉 What's Been Created

Your Express.js backend server is now ready to handle Google Meet bookings from your chatbot!

### 📁 Files Created

1. **Backend Server** (`src/server.js`) - Main Express server
2. **Booking Controller** (`src/controllers/booking.controller.js`) - Handles meeting creation
3. **Calendar Service** (`src/services/calendar.service.js`) - Google Calendar API integration
4. **Chatbot Service** (`src/services/chatbot.service.js`) - NLP and message processing
5. **Routes** - API endpoints for bookings, webhooks, auth, calendar
6. **Test Page** (`test-chatbot.html`) - Beautiful UI to test the booking system
7. **API Documentation** (`API_TESTING.md`) - Complete testing guide

## 🚀 How It Works

### User Flow:
1. **User opens chatbot** on your website
2. **User enters**:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Meeting Time: "2024-05-10 2:00 PM"
   - Message: "I want to discuss my project"

3. **Backend creates**:
   - Google Meet link
   - Calendar event with both attendees

4. **Both receive**:
   - **john@example.com** gets calendar invite
   - **freelancecomm9@gmail.com** gets calendar invite
   - Both can join the meeting at scheduled time

## 🧪 Testing Your Setup

### Method 1: Use the Test HTML Page

1. **Open the test page**:
   ```bash
   # Open in browser
   start backend/test-chatbot.html
   ```

2. **Fill in the form**:
   - Your Name
   - Your Email
   - Meeting Date & Time
   - Duration (default: 30 minutes)
   - Message (optional)

3. **Click "Schedule Meeting"**

4. **You'll see**:
   - Success message
   - Meeting ID
   - Google Meet link
   - Confirmation that invites were sent

### Method 2: Use cURL

```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"meetingTime\":\"2024-05-10T14:00:00\",\"duration\":30,\"message\":\"Project discussion\"}"
```

### Method 3: Use PowerShell

```powershell
$body = @{
    name = "John Doe"
    email = "john@example.com"
    meetingTime = "2024-05-10T14:00:00"
    duration = 30
    message = "Project discussion"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/bookings" -Method Post -Body $body -ContentType "application/json"
```

## 📋 API Endpoint

### Create Meeting
```
POST http://localhost:5000/api/bookings
```

### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "meetingTime": "2024-05-10T14:00:00",
  "duration": 30,
  "message": "I want to discuss my project"
}
```

### Response
```json
{
  "status": "success",
  "message": "Meeting scheduled successfully!",
  "data": {
    "bookingId": "abc123",
    "meetLink": "https://meet.google.com/abc-defg-hij",
    "startTime": "2024-05-10T14:00:00.000Z",
    "endTime": "2024-05-10T14:30:00.000Z",
    "attendees": [
      "john@example.com",
      "freelancecomm9@gmail.com"
    ]
  }
}
```

## 🔧 Configuration

### Environment Variables (`.env`)

```env
# Server
PORT=5000
NODE_ENV=development
BASE_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback

# FreelanceComm Email
FREELANCECOMM_EMAIL=freelancecomm9@gmail.com

# Timezone
DEFAULT_TIMEZONE=Asia/Kolkata
```

## 🔐 Google OAuth Setup (Required)

To make the Google Meet creation work, you need to complete OAuth:

### Step 1: Enable Google Calendar API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Enable **Google Calendar API**

### Step 2: Configure OAuth Consent Screen
1. Go to **APIs & Services** → **OAuth consent screen**
2. Add test users (your email)
3. Add scopes:
   - `https://www.googleapis.com/auth/calendar`
   - `https://www.googleapis.com/auth/calendar.events`

### Step 3: Get OAuth Tokens
1. Visit: `http://localhost:5000/api/auth/google`
2. Sign in with Google
3. Grant calendar permissions
4. Tokens will be saved automatically

## 🎨 Integrate with Your Website Chatbot

### React/Next.js Example

```javascript
async function createMeeting(userData) {
  try {
    const response = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        meetingTime: userData.selectedTime,
        duration: 30,
        message: userData.message
      })
    });
    
    const result = await response.json();
    
    if (result.status === 'success') {
      // Show success message
      alert(`Meeting scheduled! Join at: ${result.data.meetLink}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Vanilla JavaScript Example

```javascript
document.getElementById('bookingForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    meetingTime: new Date(document.getElementById('meetingTime').value).toISOString(),
    duration: 30,
    message: document.getElementById('message').value
  };
  
  const response = await fetch('http://localhost:5000/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  
  const result = await response.json();
  console.log(result);
});
```

## 📧 Email Notifications

When a meeting is created:
- ✅ User receives Google Calendar invite
- ✅ freelancecomm9@gmail.com receives Google Calendar invite
- ✅ Both emails get the Google Meet link
- ✅ Calendar reminders are set (1 day before, 30 minutes before)

## 🐛 Troubleshooting

### Server Won't Start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <process_id> /F

# Restart server
npm start
```

### Google Calendar API Errors
- Make sure Google Calendar API is enabled
- Complete OAuth flow to get access tokens
- Check that credentials are correct in `.env`

### Meeting Not Created
- Check server logs in `backend/logs/`
- Verify Google OAuth tokens are valid
- Ensure calendar permissions are granted

## 📊 Server Status

Check if server is running:
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-05-08T...",
  "service": "Google Meet Booking API",
  "version": "1.0.0"
}
```

## 🎯 Next Steps

1. **Test the booking system** using `test-chatbot.html`
2. **Complete Google OAuth** to enable meeting creation
3. **Integrate with your website chatbot**
4. **Deploy to production** (Heroku, Vercel, AWS, etc.)

## 📚 Documentation

- **API Testing Guide**: `backend/API_TESTING.md`
- **Full README**: `backend/README.md`
- **Environment Setup**: `backend/.env.example`

## 🆘 Support

For help:
- Email: freelancecomm9@gmail.com
- Check logs: `backend/logs/`
- Review documentation: `backend/API_TESTING.md`

---

## ✨ Features Implemented

✅ Google Meet link generation
✅ Calendar invites to both emails
✅ Automatic reminders
✅ Timezone handling (Asia/Kolkata)
✅ Duration customization
✅ Message/notes support
✅ Error handling
✅ Input validation
✅ Beautiful test UI
✅ Complete API documentation

Your booking system is ready to use! 🚀