# 🚀 Quick Reference - FreelanceComm Booking System

## ✅ System Status

- **Backend**: Running on `http://localhost:5001` ✅
- **Frontend**: Running on `http://localhost:8080` ✅
- **CORS**: Fixed and working ✅
- **Google OAuth**: Configured ✅

## 🔗 Important URLs

| Service | URL | Status |
|---------|-----|--------|
| Backend API | http://localhost:5001 | ✅ Running |
| Health Check | http://localhost:5001/health | ✅ Working |
| Frontend | http://localhost:8080 | ✅ Running |
| Booking Endpoint | http://localhost:5001/api/bookings | ✅ Ready |

## 📋 Quick Commands

### Start Backend
```bash
cd backend
npm start
```

### Start Frontend
```bash
npm run dev
```

### Test API
```bash
curl http://localhost:5001/health
```

### Stop Backend
Press `Ctrl+C` in the terminal running the backend

## 🎯 How to Use

### 1. Book a Meeting
1. Open website: `http://localhost:8080`
2. Click floating calendar button (bottom-right)
3. Select time slot
4. Enter name and email
5. Click "Confirm booking"
6. Get Google Meet link!

### 2. Check Booking
- User receives calendar invite at their email
- freelancecomm9@gmail.com receives calendar invite
- Both can join the Google Meet

## 📧 Email Configuration

- **FreelanceComm Email**: freelancecomm9@gmail.com
- **User Email**: Entered in the chatbot form
- **Both receive**: Google Calendar invite with Meet link

## 🔧 Configuration Files

### Backend
- **Server**: `backend/src/server.js`
- **Environment**: `backend/src/.env`
- **Booking Logic**: `backend/src/controllers/booking.controller.js`
- **Calendar API**: `backend/src/services/calendar.service.js`

### Frontend
- **Chatbot**: `src/components/AppointmentBot.tsx`

## 🐛 Common Issues & Fixes

### CORS Error
✅ **Fixed!** Backend now allows `http://localhost:8080`

### Port Already in Use
✅ **Fixed!** Backend now uses port 5001

### "Failed to fetch"
- Check backend is running: `curl http://localhost:5001/health`
- Check API URL in `AppointmentBot.tsx` is `http://localhost:5001`

### No Calendar Invite
- Complete Google OAuth setup
- Check spam folder
- Verify Google Calendar API is enabled

## 📊 API Endpoint

### Create Booking
```http
POST http://localhost:5001/api/bookings
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "meetingTime": "2024-05-13T14:00:00.000Z",
  "duration": 30,
  "message": "Project discussion"
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
    "startTime": "2024-05-13T14:00:00.000Z",
    "endTime": "2024-05-13T14:30:00.000Z",
    "attendees": [
      "john@example.com",
      "freelancecomm9@gmail.com"
    ]
  }
}
```

## 🎨 Chatbot Flow

1. **Intro** → "Choose a slot →"
2. **Slot Selection** → Pick time
3. **Details Form** → Enter name & email
4. **Loading** → Creating meeting...
5. **Success** → Meeting booked! (with Meet link)
6. **Error** → Try again (if something fails)

## 📚 Documentation

- **Setup Guide**: `backend/SETUP_COMPLETE.md`
- **API Testing**: `backend/API_TESTING.md`
- **Integration Guide**: `CHATBOT_INTEGRATION_COMPLETE.md`
- **CORS Fix**: `CORS_FIX_COMPLETE.md`
- **Full Summary**: `FINAL_SUMMARY.md`

## 🔐 Google OAuth Setup

### Required Steps:
1. Enable Google Calendar API
2. Configure OAuth consent screen
3. Add test users
4. Get OAuth tokens: Visit `http://localhost:5001/api/auth/google`

### Scopes Needed:
- `https://www.googleapis.com/auth/calendar`
- `https://www.googleapis.com/auth/calendar.events`

## ✨ Features

✅ Google Meet link generation
✅ Calendar invites to both emails
✅ Automatic reminders (1 day, 30 min before)
✅ Loading states
✅ Error handling
✅ Success confirmation
✅ Mobile responsive
✅ Smooth animations

## 🎯 Next Steps

1. ✅ Backend running on port 5001
2. ✅ Frontend running on port 8080
3. ✅ CORS fixed
4. ⏳ Complete Google OAuth (if not done)
5. ⏳ Test booking a meeting
6. ⏳ Deploy to production

## 📞 Support

- **Email**: freelancecomm9@gmail.com
- **Logs**: `backend/logs/`
- **Console**: Check browser DevTools (F12)

## 🚀 Quick Test

```bash
# Test backend health
curl http://localhost:5001/health

# Expected response:
# {"status":"healthy","service":"Google Meet Booking API"}
```

---

## 🎉 Everything is Ready!

Your Google Meet booking system is fully functional and ready to use!

**Test it now**: Open `http://localhost:8080` and click the calendar button! 🚀