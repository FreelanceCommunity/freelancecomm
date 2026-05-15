# Google Calendar OAuth Setup Guide

## Problem
You're getting a **500 Internal Server Error** because the Google Calendar API needs OAuth tokens to create meetings.

## Quick Fix (5 minutes)

### Step 1: Start Your Backend Server
```bash
cd backend
npm start
```

### Step 2: Complete OAuth Flow
1. Open your browser and visit: **http://localhost:5001/api/auth/google**
2. Sign in with the Google account: **freelancecomm9@gmail.com**
3. Grant calendar permissions when prompted
4. You'll see a success page with your tokens

### Step 3: Copy Tokens to .env
The success page will display three tokens. Copy them to `backend/src/.env`:

```env
GOOGLE_ACCESS_TOKEN=ya29.a0AfB_byC...
GOOGLE_REFRESH_TOKEN=1//0gXXXXXXXXXX...
GOOGLE_TOKEN_EXPIRY=1234567890000
```

### Step 4: Restart Backend
```bash
# Stop the server (Ctrl+C) and restart
npm start
```

### Step 5: Test the Booking Bot
1. Open your frontend: **http://localhost:8080**
2. Click the calendar button (bottom right)
3. Book a test appointment
4. Check if the meeting is created successfully! ✅

---

## Troubleshooting

### ❌ "Refresh token not provided"
This happens if you've already authorized the app before. Fix:
1. Go to https://myaccount.google.com/permissions
2. Find your app and remove access
3. Visit http://localhost:5001/api/auth/google again
4. Make sure to grant permissions

### ❌ "Redirect URI mismatch"
Make sure your Google Cloud Console has this redirect URI:
```
http://localhost:5001/api/auth/google/callback
```

### ❌ Still getting 500 errors
Check the backend logs:
```bash
tail -f backend/logs/error.log
```

---

## Check OAuth Status
Visit: **http://localhost:5001/api/auth/status**

This will show you which tokens are configured.

---

## Production Setup
For production, you'll need to:
1. Update `GOOGLE_REDIRECT_URI` to your production domain
2. Add the production redirect URI to Google Cloud Console
3. Store tokens securely (database, not .env)
4. Implement token refresh logic
