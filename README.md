# Present Simple Quiz - Telegram Mini App

A production-ready Telegram Mini App for English grammar learning, built with Next.js, TypeScript, and Tailwind CSS.

## 🎯 Features

- ✅ Beautiful, modern mobile-first UI
- ✅ 12 Present Simple grammar questions
- ✅ Interactive quiz flow with instant feedback
- ✅ Detailed explanations for each answer
- ✅ Comprehensive results screen with answer review
- ✅ Telegram Mini App SDK integration
- ✅ Smooth animations and transitions
- ✅ Responsive design for all devices
- ✅ TypeScript for type safety
- ✅ Easy to expand with more topics

## 📱 Project Structure

```
telegram-grammar-quiz/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main page component
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── QuizContainer.tsx   # Main quiz logic and flow
│   │   ├── HomeScreen.tsx      # Start screen
│   │   ├── QuestionCard.tsx    # Question display & options
│   │   ├── ResultsScreen.tsx   # Results and review
│   │   └── ProgressBar.tsx     # Progress indicator
│   ├── data/
│   │   ├── questions.ts        # Question database
│   │   └── types.ts            # TypeScript types
│   ├── hooks/
│   │   └── useTelegram.ts      # Telegram integration hook
│   └── utils/
│       └── telegram.ts         # Telegram utilities
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── next.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn installed

### Installation

1. Navigate to the project folder:
```bash
cd /Users/sheyn/Desktop/telegram-grammar-quiz
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎮 Testing Locally

### Without Telegram (Browser)
The app works perfectly in any browser. Just visit `http://localhost:3000`.

### With Telegram Mini App Emulator
1. Use Telegram Bot API to create a link: `https://t.me/YourBotName/startapp`
2. Or use a Mini App tester like [Mini App Test Bot](https://t.me/mytonctestnet_testnet_bot)

## 📚 How to Add More Questions

Questions are stored in `src/data/questions.ts`:

```typescript
{
  id: 1,
  question: 'I .... to school every day.',
  options: {
    a: 'go',
    b: 'went',
    c: 'gone',
    d: 'am going',
  },
  correct: 'a',
  explanation: 'Use the simple present tense for daily habits and routines.',
}
```

Simply add new question objects to the `presentSimpleQuestions` array.

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to customize the color scheme:
```typescript
colors: {
  primary: '#0098ea',
  success: '#31a24c',
  error: '#dd2c20',
}
```

### Quiz Duration
Modify the instruction text in `HomeScreen.tsx`:
```typescript
<p className="text-center text-gray-500 text-sm mt-6">
  Takes about 5-10 minutes to complete
</p>
```

### Animations
Tailwind animations are defined in `tailwind.config.ts`. Add more animations as needed.

## 🤖 Telegram Bot Integration

### Step 1: Create a Telegram Bot
1. Talk to [@BotFather](https://t.me/botfather) on Telegram
2. Create a new bot with `/newbot`
3. Get your bot token

### Step 2: Set Up Mini App
1. Send `/setmenubutton` to @BotFather
2. Configure the Mini App URL

### Step 3: Connect Backend (Later)

#### Send Quiz Results to Your Bot

In `src/utils/telegram.ts`, uncomment the API call:

```typescript
// Later: send to your bot/backend API
await fetch('/api/quiz-results', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
```

Create an API route `/api/quiz-results` in your backend to receive results.

#### Example Backend Endpoint (Node.js/Express)
```javascript
app.post('/api/quiz-results', async (req, res) => {
  const { user_id, name, score, total, percentage } = req.body;
  
  // Save to database or send to Telegram
  console.log(`${name} scored ${score}/${total} (${percentage}%)`);
  
  res.json({ success: true });
});
```

## 📦 Building for Production

### Build the app:
```bash
npm run build
```

### Start production server:
```bash
npm start
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)
1. Push project to GitHub
2. Connect to [Vercel](https://vercel.com)
3. Deploy with one click

```bash
vercel
```

### Option 2: Railway
```bash
npm install -g railway
railway link
railway up
```

### Option 3: Docker
Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t grammar-quiz .
docker run -p 3000:3000 grammar-quiz
```

## 🔗 Setting Mini App URL

After deployment:

1. Use Telegram Bot API to set the Mini App button:
```bash
curl -X POST https://api.telegram.org/bot<BOT_TOKEN>/setWebAppMaxInlineSize \
  -H "Content-Type: application/json" \
  -d '{"web_app_info": {"url": "https://your-domain.com"}}'
```

2. Or use BotFather - send `/setmenubutton` and follow the prompts

## 🎯 Adding New Quiz Topics

### To add a new grammar topic (e.g., Past Tense):

1. Create `src/data/past-tense-questions.ts`
2. Add questions following the same format
3. Import in `QuizContainer.tsx`
4. Add a topic selector on the home screen

Example structure:
```typescript
// src/data/past-tense-questions.ts
import { Question } from './types';

export const pastTenseQuestions: Question[] = [
  // ... past tense questions
];
```

## 🔐 Environment Variables

Create `.env.local` for sensitive data:
```
NEXT_PUBLIC_BOT_TOKEN=your_bot_token
NEXT_PUBLIC_BOT_USERNAME=your_bot_username
```

## 📊 Monitoring

The app automatically logs user info and quiz results:
- Check browser console for debug info
- Server logs show all requests
- Later: implement analytics dashboard

## 🐛 Debugging

### Enable detailed logging:
In `src/app/page.tsx`:
```typescript
useEffect(() => {
  if (user) {
    console.log('Telegram User:', user);
  }
}, [user]);
```

### Test Telegram integration:
In browser console:
```javascript
Telegram.WebApp.ready();
console.log(Telegram.WebApp.initDataUnsafe);
```

## 📝 Code Quality

- ✅ TypeScript for type safety
- ✅ React hooks for state management
- ✅ Tailwind CSS for styling
- ✅ Component-based architecture
- ✅ Easy to test and maintain

## 🚦 Starting the App

**Quick Start:**
```bash
cd /Users/sheyn/Desktop/telegram-grammar-quiz
npm install
npm run dev
```

Then visit: `http://localhost:3000`

## 📱 Telegram Mini App Checklist

- [x] Telegram WebApp SDK integration
- [x] Responsive mobile design
- [x] Touch-friendly interface
- [x] Fast load times
- [x] Offline-capable structure
- [x] User data access ready
- [x] Results sharing prepared

## 🎓 Learning Resources

- [Telegram Mini Apps Documentation](https://core.telegram.org/bots/webapps)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 📞 Support

For questions or issues:
1. Check the code comments
2. Review the project structure
3. Test in browser console
4. Check Telegram bot logs

## 📄 License

Open source project by @Mr_Sheyns

---

**Ready to launch?** Follow the deployment steps above and share your Mini App with students! 🚀
