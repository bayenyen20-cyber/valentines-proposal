# Quick Setup Guide

## 🚀 5-Minute Deployment

### Step 1: Get MongoDB URL
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free
3. Create a free cluster (M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password

### Step 2: Deploy to Vercel
1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click "Add New Project"
4. Import this repository
5. Add Environment Variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
JWT_SECRET=paste-random-string-here
ADMIN_EMAIL=youremail@example.com
ADMIN_PASSWORD=your-secure-password
```

To generate JWT_SECRET, run this in terminal:
```bash
openssl rand -base64 32
```

6. Click "Deploy"
7. Wait 2-3 minutes ✅

### Step 3: Share with Your Valentine
Copy the deployment URL (e.g., `https://your-app.vercel.app`) and share it with your girlfriend!

## 📧 Optional: Email Notifications

To receive emails when she says YES:

1. Enable Gmail 2-Factor Authentication
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Add these to Vercel Environment Variables:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-digit-app-password
NOTIFICATION_EMAIL=where-to-receive-notifications@gmail.com
```

## 📊 View Responses

### Option 1: Admin Dashboard
Visit `https://your-app.vercel.app/admin`
Login with your ADMIN_EMAIL and ADMIN_PASSWORD

### Option 2: Terminal/Console
If running locally with `npm run dev`, you'll see notifications in your terminal

### Option 3: Vercel Logs
Go to Vercel Dashboard → Your Project → Runtime Logs

## 🎯 What Happens Next?

1. She visits your site
2. Creates an account (name, email, password)
3. Sees the beautiful Valentine's proposal
4. Clicks "Yes" (hopefully! 💕)
5. You get notified instantly via:
   - Terminal/Console (real-time)
   - Email (if configured)
   - Admin Dashboard

## 🔧 Troubleshooting

**Can't connect to MongoDB?**
- Make sure to whitelist `0.0.0.0/0` in MongoDB Atlas Network Access
- Check if password in connection string is correct

**Not receiving emails?**
- Make sure 2FA is enabled on Gmail
- Use App Password, not regular password
- Check spam folder

**Admin dashboard not working?**
- Verify ADMIN_EMAIL and ADMIN_PASSWORD are set correctly
- They are case-sensitive

## 💡 Pro Tips

1. **Test First**: Create a test account yourself to see how it works
2. **Timing**: Send the link at a romantic moment
3. **Mobile**: The site works beautifully on phones
4. **Dashboard**: Keep the admin dashboard open to see responses in real-time
5. **Logs**: If running locally, keep your terminal open to see the celebration message

---

Need help? Check the full README.md for detailed instructions.

Good luck! 🌹💖
