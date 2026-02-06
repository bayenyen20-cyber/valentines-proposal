# 💖 Valentine's Day Proposal App

A beautiful, romantic web application to ask someone special to be your Valentine! Features glowing flowers, smooth animations, and a delightful user experience.

## ✨ Features

- 🌹 **Glowing animated flowers** that float and dance
- 💕 **Interactive "Yes/No" buttons** with playful interactions
- 🎉 **Confetti celebration** when she says yes
- 💾 **MongoDB integration** to save responses
- 📱 **Fully responsive** - works on all devices
- 🎨 **Beautiful UI/UX** with smooth animations using Framer Motion

## 🚀 Quick Deploy to Vercel

### Prerequisites
- A MongoDB database (you can get a free one at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- A Vercel account (sign up at [vercel.com](https://vercel.com))

### Deployment Steps

1. **Get your MongoDB connection string:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster if you haven't already
   - Click "Connect" → "Connect your application"
   - Copy your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

2. **Deploy to Vercel:**

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

   - Click the button above or go to [vercel.com](https://vercel.com)
   - Import this repository
   - Add your environment variable:
     - Name: `MONGODB_URI`
     - Value: Your MongoDB connection string
   - Click "Deploy"

3. **That's it!** Your Valentine's proposal site will be live in seconds! 🎉

## 💻 Local Development

If you want to run this locally first:

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd valentines-proposal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env.local` file:**
   ```bash
   MONGODB_URI=your_mongodb_connection_string_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

You can easily customize the app:

- **Colors:** Edit `tailwind.config.js` and `app/globals.css`
- **Text:** Modify the messages in `app/page.tsx`
- **Animations:** Adjust timing and effects in `app/page.tsx`

## 📁 Project Structure

```
valentines-proposal/
├── app/
│   ├── api/
│   │   └── save-response/
│   │       └── route.ts          # API endpoint for saving responses
│   ├── globals.css               # Global styles and animations
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main Valentine's proposal page
├── lib/
│   └── mongodb.ts                # MongoDB connection utility
├── .env.example                  # Environment variables template
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Database:** MongoDB
- **Deployment:** Vercel

## 📝 Environment Variables

Only one environment variable is needed:

- `MONGODB_URI` - Your MongoDB connection string

## 💡 How It Works

1. When your girlfriend visits the site, she sees a beautiful animated proposal
2. The "Yes" button is prominent and inviting
3. The "No" button playfully moves away when clicked
4. When she clicks "Yes", a celebration animation plays
5. Her response is saved to your MongoDB database

## 🎁 Tips for Success

- Share the Vercel deployment URL with your girlfriend
- Consider sending it at a special time
- You can check the MongoDB database to see when she responded
- The app works great on mobile devices too!

## 📄 License

This project is open source and available for personal use.

## 💕 Made with Love

Created to help you create a memorable Valentine's Day moment!

---

**Good luck with your proposal! 🌹💖**
