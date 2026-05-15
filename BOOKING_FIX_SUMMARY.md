# 🔧 Booking Bot 500 Error - FIXED

## What Was Wrong
The booking bot was failing with a **500 Internal Server Error** because:
- Google Calendar API requires OAuth tokens (access token + refresh token)
- Your `.env` file only had Client ID and Secret, but no tokens
- Without tokens, the API can't create calendar events

## What I Fixed
✅ Implemented complete OAuth flow in `backend/src/routes/auth.routes.js`
✅ Added token placeholders to `backend/src/.env`
✅ Created setup guide: `backend/OAUTH_SETUP.md`

## 🚀 How to Fix (3 Steps)

### 1️⃣ Start Backend Server
```bash
cd backend
npm start
```

### 2️⃣ Get OAuth Tokens
Open in browser: **http://localhost:5001/api/auth/google**

- Sign in with: **freelancecomm9@gmail.com**
- Grant calendar permissions
- Copy the 3 tokens shown on success page

### 3️⃣ Update .env File
Paste tokens into `backend/src/.env`:
```env
GOOGLE_ACCESS_TOKEN=ya29.a0AfB_byC...
GOOGLE_REFRESH_TOKEN=1//0gXXXXXXXXXX...
GOOGLE_TOKEN_EXPIRY=1234567890000
```

Then restart the backend server.

## ✅ Test It
1. Open frontend: http://localhost:8080
2. Click calendar button (bottom right)
3. Book an appointment
4. Should work now! 🎉

## 📊 Check Status
Visit: **http://localhost:5001/api/auth/status**

Shows which tokens are configured.

## 🆘 Need Help?
See detailed troubleshooting in: `backend/OAUTH_SETUP.md`
