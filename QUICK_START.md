# ⚡ Quick Start - 2 Minutes

## 🚀 Get Running NOW

```bash
cd /Users/sheyn/Desktop/telegram-grammar-quiz
npm run dev
```

Open browser: **http://localhost:3000**

✅ Done! Quiz app is running locally.

---

## 🎮 Test It

1. Click **"Start Quiz"**
2. Select answers to 3 questions (scroll down if needed)
3. See your **results** with score and review

---

## 📦 What's Inside

- **11 React components** (~900 lines TypeScript)
- **12 Present Simple grammar questions** with explanations
- **Complete quiz flow**: home → quiz → results → restart
- **Mobile responsive** design (works on phone)
- **Telegram integration ready** (SDK included)
- **Zero database** needed (questions hardcoded)

---

## ➕ Add More Questions

Edit `src/data/questions.ts` and add:

```typescript
{
  id: 13,
  question: 'She .... tea every afternoon.',
  options: { a: 'drink', b: 'drinks', c: 'drinking', d: 'drank' },
  correct: 'b',
  explanation: 'With "she" (3rd person singular), add -s to the verb in present simple.',
},
```

Save file → browser auto-refreshes → new question appears!

---

## 🌐 Deploy to Production

### Vercel (Easiest - 3 clicks)

1. Push to GitHub:
   ```bash
   git init && git add . && git commit -m "init"
   git remote add origin https://github.com/YOUR_USERNAME/telegram-grammar-quiz.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → Import repo → Deploy

3. You get a URL like: `https://telegram-grammar-quiz.vercel.app`

### Or: Railway / Docker / VPS (See SETUP.md)

---

## 🤖 Connect to Telegram Bot

1. **Get your deployed URL** from Vercel/railway
2. **Talk to [@BotFather](https://t.me/botfather)**
3. Send `/setmenubutton` and set to Web App
4. Users can now play quiz from your Telegram bot!

---

## 📁 Project Files

```
11 React components       (~600 lines)
├── QuizContainer (main logic)
├── HomeScreen, QuestionCard, ResultsScreen
└── ProgressBar

Data & Types              (~180 lines)
├── 12 grammar questions
└── TypeScript interfaces

Utilities & Configuration (~200 lines)
├── Telegram SDK integration
├── Next.js config
└── Tailwind CSS theme
```

---

## 📚 Full Docs

- **[README.md](README.md)** - Features overview
- **[SETUP.md](SETUP.md)** - Detailed setup & deployment
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Code structure explained

---

## ✅ Next Steps

1. ✅ **Running locally?** → Test all screens
2. ➡️ **Ready to deploy?** → Follow SETUP.md
3. ➡️ **Want more questions?** → Edit src/data/questions.ts
4. ➡️ **Need bot integration?** → See SETUP.md "Connecting to Telegram Bot"

---

**That's it! Your quiz app is ready to use.** 🎉

Questions? Check the docs or dive into the code. It's clean, well-commented, and easy to modify.
