# Setup & Deployment Guide

## 🚀 Quick Start (5 minutes)

### 1. Install & Run Locally

```bash
# Navigate to project
cd /Users/sheyn/Desktop/telegram-grammar-quiz

# Install dependencies (First time only)
npm install

# Start development server
npm run dev
```

Then open: **http://localhost:3000**

You should see the quiz home screen with:
- "Let's Master Present Simple!" title
- Description with estimated time
- "Start Quiz" button
- Question count badge

---

## 🧪 Testing the App

### Test Scenarios

**Scenario 1: Complete Quiz**
1. Click "Start Quiz"
2. Select an answer for each question
3. Click "Next" after each answer
4. Review your results on the final screen
5. Click "Review Answers" to see all questions again
6. Click "Take Quiz Again" to restart

**Scenario 2: Check Animations**
- Watch the progress bar update smoothly
- Notice question cards slide in
- Results screen fades in gracefully

**Scenario 3: Mobile Testing**
- Open DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M)
- Test on iPhone 12, iPad, and Android sizes
- Ensure buttons are easy to tap (min 44px)

**Scenario 4: Telegram Integration (Later)**
- Wrap the app in Telegram Mini App
- Quiz results will be logged (console.log)
- Integration ready for backend API

---

## 🎯 Adding Questions

### Add Single Question

Edit `src/data/questions.ts`:

```typescript
{
  id: 13,
  question: 'He .... coffee every morning.',
  options: {
    a: 'drink',
    b: 'drinks',
    c: 'drinking',
    d: 'is drink',
  },
  correct: 'b',
  explanation: 'Use "drinks" (3rd person singular) with "he" in simple present tense.',
}
```

**Required Fields:**
- `id`: unique number (increment)
- `question`: the grammar question
- `options`: object with a, b, c, d keys
- `correct`: letter of correct answer ('a'|'b'|'c'|'d')
- `explanation`: why this answer is correct

### Add New Topic (e.g., Past Tense)

1. Create `src/data/past-tense-questions.ts`:

```typescript
import { Question } from './types';

export const pastTenseQuestions: Question[] = [
  {
    id: 1,
    question: 'I .... to the store yesterday.',
    options: {
      a: 'go',
      b: 'went',
      c: 'going',
      d: 'will go',
    },
    correct: 'b',
    explanation: 'Use past simple "went" for completed actions.',
  },
  // ... more questions
];
```

2. In `src/components/QuizContainer.tsx` (around line 20), add:

```typescript
import { pastTenseQuestions } from '@/data/past-tense-questions';

// Add selector for which topic to use
const [selectedTopic, setSelectedTopic] = useState<'present' | 'past'>('present');

// Use appropriate questions
const questionsToUse = selectedTopic === 'present' 
  ? presentSimpleQuestions 
  : pastTenseQuestions;
```

3. Add topic selector UI in HomeScreen

---

## 📦 Building for Production

### Build the App

```bash
npm run build
```

This creates an optimized build in the `.next/` folder.

### Run Production Build Locally

```bash
npm start
```

Then visit: **http://localhost:3000**

The production build is much faster than development mode.

---

## 🌐 Deploying to Production

### Option 1: Vercel (Easiest - FREE)

1. Push your project to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/telegram-grammar-quiz.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)

3. Click "Import Project"

4. Select your GitHub repo

5. Click "Deploy"

**Your app is now live at:** `https://telegram-grammar-quiz.vercel.app`

### Option 2: Railway (Also FREE)

```bash
npm install -g railway
railway link
railway up
```

### Option 3: Docker (For VPS/Cloud)

1. Create `Dockerfile` in project root:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

2. Build & Run:

```bash
docker build -t grammar-quiz .
docker run -p 3000:3000 grammar-quiz
```

### Option 4: Self-Hosted Linux Server

```bash
# SSH into your server
ssh user@your-server.com

# Clone repo
git clone https://github.com/YOUR_USERNAME/telegram-grammar-quiz.git
cd telegram-grammar-quiz

# Install Node.js (if not installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install and build
npm install
npm run build

# Run with PM2 (keeps app running)
npm install -g pm2
pm2 start "npm start" --name "grammar-quiz"
pm2 startup
pm2 save
```

---

## 🤖 Connecting to Telegram Bot

### Step 1: Get Your Deployed URL

After deploying, you'll have a URL like:
- Vercel: `https://telegram-grammar-quiz.vercel.app`
- Your server: `https://your-domain.com`

### Step 2: Configure Telegram Bot

1. Talk to [@BotFather](https://t.me/botfather) on Telegram

2. Send `/setmenubutton`

3. Choose your bot

4. Set the menu button to Web App with your deployed URL

### Step 3: Send Results to Your Channel (Optional)

To integrate with the Telegram bot you created earlier:

#### Backend Setup (Node.js + Express example):

```javascript
// server.js
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const BOT_TOKEN = '8586982987:AAFLelE_w_1dYW3OF3goKEKS0VlNLDONRwM';
const CHANNEL_ID = '-1003319421728';

app.post('/api/quiz-results', async (req, res) => {
  try {
    const { user_id, username, score, total, percentage } = req.body;
    
    // Format the message
    const message = `
✅ Quiz Result
👤 User: ${username || 'Anonymous'}
🎯 Score: ${score}/${total}
📊 Percentage: ${percentage}%
⏰ Time: ${new Date().toLocaleString()}
    `;
    
    // Send to Telegram channel
    await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: CHANNEL_ID,
        text: message,
        parse_mode: 'HTML',
      }
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('Server running on :3001'));
```

#### Update Frontend

In `src/utils/telegram.ts`, uncomment and update:

```typescript
export async function sendResultsToBot(data: {
  user_id: number;
  username: string;
  score: number;
  total: number;
  percentage: number;
  timestamp: string;
}): Promise<void> {
  try {
    const response = await fetch('https://your-backend-url.com/api/quiz-results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('Results sent successfully');
    }
  } catch (error) {
    console.log('Could not send results (offline or backend unavailable)');
  }
}
```

---

## 📊 Environment Variables

Create `.env.local` for sensitive data:

```
NEXT_PUBLIC_BOT_USERNAME=your_bot_username
NEXT_PUBLIC_BOT_TOKEN=your_bot_token_here
```

Note: Variables starting with `NEXT_PUBLIC_` are exposed to the browser. Keep sensitive data in your backend.

---

## 🔧 Troubleshooting

### Port 3000 is already in use
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9

# Then start again
npm run dev
```

### Build fails with TypeScript errors
```bash
# Clean and rebuild
rm -rf .next
npm run build
```

### Telegram SDK not loading
1. Check browser console for errors
2. Ensure script is loaded in `src/app/layout.tsx`
3. Test with Telegram Mini App wrapper, not regular browser

### Questions not showing
1. Check `src/data/questions.ts` has questions array
2. Verify JSON structure is valid
3. Check browser console for import errors

---

## ✅ Deployment Checklist

- [ ] App runs locally with `npm run dev`
- [ ] Production build succeeds: `npm run build`
- [ ] All questions display correctly
- [ ] Quiz flow works (start → answer → next → results)
- [ ] Animations are smooth
- [ ] Mobile responsive (test on phone)
- [ ] Deployed to Vercel/server (has public URL)
- [ ] Telegram bot configured with Mini App URL
- [ ] Results sending works (check console/channel)
- [ ] Share link with students!

---

## 📚 Useful Commands

```bash
# Development
npm run dev        # Start dev server

# Production
npm run build      # Build for production
npm start          # Run production server

# Maintenance
npm run lint       # Check code quality
npm audit          # Check for vulnerabilities
npm update         # Update dependencies
npm outdated       # See available updates

# Cleaning
rm -rf .next       # Remove build cache
rm -rf node_modules/ package-lock.json && npm install  # Fresh install
```

---

## 🎓 Next Steps

1. **Test Locally:** `npm run dev`
2. **Deploy:** Choose your hosting (Vercel is easiest)
3. **Connect Bot:** Set Mini App URL in BotFather
4. **Add More Questions:** Edit `src/data/questions.ts`
5. **Share:** Send link to students in Telegram

---

## 📞 Support URLs

- [Telegram Mini Apps Docs](https://core.telegram.org/bots/webapps)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Tailwind CSS Reference](https://tailwindcss.com/docs)

---

**Ready to launch?** Start with:
```bash
cd /Users/sheyn/Desktop/telegram-grammar-quiz
npm run dev
```

Then visit **http://localhost:3000** 🚀
