# Email Notification Setup Guide

## Overview
The booking system now sends email notifications to the freelancer when a new meeting is booked!

## What Gets Sent:
1. **To Freelancer** (`freelancecomm9@gmail.com`):
   - Beautiful HTML email with booking details
   - Client name and email
   - Meeting time and duration
   - Direct links to Google Meet and Calendar

2. **To User** (client's email):
   - Confirmation email
   - Meeting details
   - Google Meet link
   - Plus the Google Calendar invite

## Setup Gmail App Password (5 minutes)

### Step 1: Enable 2-Factor Authentication
1. Go to: https://myaccount.google.com/security
2. Sign in with `freelancecomm9@gmail.com`
3. Under "Signing in to Google", enable **2-Step Verification** if not already enabled

### Step 2: Create App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Sign in with `freelancecomm9@gmail.com`
3. In "Select app", choose **Mail**
4. In "Select device", choose **Other (Custom name)**
5. Enter name: **FreelanceComm Booking**
6. Click **Generate**
7. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

### Step 3: Update .env File
Open `backend/src/.env` and update:

```env
SMTP_USER=freelancecomm9@gmail.com
SMTP_PASS=abcdefghijklmnop  # Paste your 16-char app password (no spaces)
EMAIL_FROM=freelancecomm9@gmail.com
```

### Step 4: Restart Backend Server
```bash
# Stop the server (Ctrl+C)
# Start again
cd backend
npm start
```

### Step 5: Test It!
1. Book a test appointment from the frontend
2. Check `freelancecomm9@gmail.com` inbox
3. You should receive a beautiful notification email! 📧

## Troubleshooting

### ❌ "Invalid login" error
- Make sure you're using an **App Password**, not your regular Gmail password
- Remove any spaces from the app password
- Verify 2FA is enabled on the account

### ❌ "Less secure app access"
- You don't need this anymore - use App Passwords instead
- App Passwords are more secure and recommended by Google

### ❌ Email not received
- Check spam folder
- Check backend logs: `tail -f backend/logs/combined.log`
- Verify SMTP_USER and SMTP_PASS are correct in .env

### ❌ "Email service not initialized"
- This means SMTP credentials are missing or invalid
- Check the logs for specific error messages
- Verify .env file has SMTP_USER and SMTP_PASS

## Email Features

### Freelancer Email Includes:
- ✅ Client name and email
- ✅ Meeting date and time (formatted nicely)
- ✅ Direct "Join Google Meet" button
- ✅ "View in Calendar" button
- ✅ Professional HTML design with your brand colors

### User Email Includes:
- ✅ Confirmation message
- ✅ Meeting details
- ✅ Google Meet link
- ✅ Professional design

## Production Notes

For production deployment:
1. Consider using a dedicated email service (SendGrid, AWS SES, Mailgun)
2. Add email templates for different scenarios
3. Implement email queuing for reliability
4. Add unsubscribe links if sending marketing emails
5. Monitor email delivery rates

## Testing

To test email functionality:
```bash
# Check if email service initialized
curl http://localhost:5000/api/auth/status

# Book a test appointment and check logs
tail -f backend/logs/combined.log
```

Look for these log messages:
- ✅ "Email service initialized successfully"
- ✅ "Freelancer notification email sent successfully"
- ✅ "User confirmation email sent successfully"
