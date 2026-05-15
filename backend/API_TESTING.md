# FreelanceComm Booking API - Testing Guide

## 🚀 Quick Start

### 1. Start the Server
```bash
cd backend
npm start
```

Server will run on: `http://localhost:5000`

### 2. Test Health Check
```bash
curl http://localhost:5000/health
```

## 📅 Create Meeting from Chatbot

### Endpoint
```
POST http://localhost:5000/api/bookings
```

### Request Body
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "meetingTime": "2024-05-10T14:00:00",
  "duration": 30,
  "message": "I want to discuss my project requirements"
}
```

### Fields Explanation
- **name** (required): User's full name
- **email** (required): User's email address
- **meetingTime** (required): Meeting start time in ISO 8601 format
- **duration** (optional): Meeting duration in minutes (default: 30)
- **message** (optional): Additional message or meeting purpose

### Example using cURL
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -D '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "meetingTime": "2024-05-10T14:00:00",
    "duration": 30,
    "message": "Project discussion"
  }'
```

### Example using PowerShell
```powershell
$body = @{
    name = "John Doe"
    email = "john.doe@example.com"
    meetingTime = "2024-05-10T14:00:00"
    duration = 30
    message = "Project discussion"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/bookings" `
  -Method Post `
  -Body $body `
  -ContentType "application/json"
```

### Example using JavaScript (Fetch)
```javascript
fetch('http://localhost:5000/api/bookings', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john.doe@example.com',
    meetingTime: '2024-05-10T14:00:00',
    duration: 30,
    message: 'Project discussion'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### Success Response
```json
{
  "status": "success",
  "message": "Meeting scheduled successfully! Google Meet link has been sent to john.doe@example.com and freelancecomm9@gmail.com",
  "data": {
    "bookingId": "abc123xyz",
    "meetLink": "https://meet.google.com/abc-defg-hij",
    "calendarLink": "https://calendar.google.com/event?eid=...",
    "startTime": "2024-05-10T14:00:00.000Z",
    "endTime": "2024-05-10T14:30:00.000Z",
    "attendees": [
      "john.doe@example.com",
      "freelancecomm9@gmail.com"
    ],
    "userName": "John Doe",
    "userEmail": "john.doe@example.com"
  }
}
```

### Error Response (Missing Fields)
```json
{
  "status": "error",
  "message": "Please provide name, email, and meeting time"
}
```

### Error Response (Invalid Email)
```json
{
  "status": "error",
  "message": "Please provide a valid email address"
}
```

## 🕐 Meeting Time Format

The `meetingTime` field must be in **ISO 8601 format**:

### Examples:
- `2024-05-10T14:00:00` - May 10, 2024 at 2:00 PM
- `2024-05-10T09:30:00` - May 10, 2024 at 9:30 AM
- `2024-12-25T16:45:00` - December 25, 2024 at 4:45 PM

### JavaScript Date to ISO String:
```javascript
const meetingDate = new Date('2024-05-10 14:00:00');
const meetingTime = meetingDate.toISOString();
// Result: "2024-05-10T14:00:00.000Z"
```

## 📧 Email Invites

When a meeting is created:
1. **User's email** receives a Google Calendar invite with the Meet link
2. **freelancecomm9@gmail.com** receives the same invite
3. Both can join the meeting at the scheduled time

## 🔍 Check Availability

### Endpoint
```
POST http://localhost:5000/api/bookings/availability
```

### Request Body
```json
{
  "startTime": "2024-05-10T14:00:00",
  "endTime": "2024-05-10T15:00:00"
}
```

### Example using cURL
```bash
curl -X POST http://localhost:5000/api/bookings/availability \
  -H "Content-Type: application/json" \
  -D '{
    "startTime": "2024-05-10T14:00:00",
    "endTime": "2024-05-10T15:00:00"
  }'
```

## 🧪 Testing with Postman

1. **Import Collection**:
   - Create a new request
   - Set method to `POST`
   - URL: `http://localhost:5000/api/bookings`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
   ```json
   {
     "name": "Test User",
     "email": "test@example.com",
     "meetingTime": "2024-05-10T14:00:00",
     "duration": 30
   }
   ```

2. **Click Send**

3. **Check Response**

## 🐛 Troubleshooting

### Server Not Starting
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process if needed
taskkill /PID <process_id> /F
```

### Google Calendar API Not Configured
- Make sure `.env` file has `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- Complete OAuth flow to get access tokens

### Meeting Not Created
- Check server logs for errors
- Verify Google Calendar API is enabled
- Ensure OAuth tokens are valid

## 📝 Notes

- **Default Duration**: 30 minutes if not specified
- **Timezone**: Asia/Kolkata (IST) by default
- **Attendees**: Always includes user email + freelancecomm9@gmail.com
- **Meet Link**: Automatically generated by Google Calendar API

## 🔗 All Available Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/bookings` | Create new meeting | No |
| POST | `/api/bookings/availability` | Check availability | No |
| GET | `/api/bookings` | Get all bookings | Yes |
| GET | `/api/bookings/:id` | Get specific booking | Yes |
| PUT | `/api/bookings/:id` | Update booking | Yes |
| DELETE | `/api/bookings/:id` | Cancel booking | Yes |
| POST | `/api/bookings/:id/reschedule` | Reschedule booking | Yes |

## 🎯 Integration with Frontend Chatbot

```javascript
// Example chatbot integration
async function createMeetingFromChatbot(userData) {
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
      // Show success message with meet link
      showSuccessMessage(`Meeting scheduled! Join at: ${result.data.meetLink}`);
    } else {
      // Show error message
      showErrorMessage(result.message);
    }
  } catch (error) {
    console.error('Error creating meeting:', error);
    showErrorMessage('Failed to create meeting. Please try again.');
  }
}
```

## 📞 Support

For issues or questions:
- Email: freelancecomm9@gmail.com
- Check server logs: `backend/logs/`
- GitHub Issues: [Repository URL]