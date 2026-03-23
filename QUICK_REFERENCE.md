# 🚀 Multi-Topic Grammar Quiz - Quick Start

## Run It Now (30 seconds)

```bash
cd /Users/sheyn/Desktop/telegram-grammar-quiz
npm run dev
```

Open: **http://localhost:3000**

---

## What You'll See

1. **Welcome Screen** - "Grammar Mastery" title
2. Click **"Start Quiz"**
3. **Topic Selector** - 8 cards showing topics
4. Click any topic
5. **Quiz** - Answer 5-12 questions  
6. **Results** - See your score

---

## 8 Topics Ready (with questions)

| Topic | Questions | Icon |
|-------|-----------|------|
| Present Simple | 12 | 🌅 |
| Present Continuous | 5 | ⏳ |
| Past Simple | 5 | 📅 |
| Past Continuous | 5 | ⏰ |
| Present Perfect | 5 | ✨ |
| Future Forms | 5 | 🚀 |
| Articles | 5 | 📝 |
| Modal Verbs | 5 | ⚡ |

**Total: 47 Questions**

---

## Add New Topic (2 minutes)

Edit: `src/data/topics.ts`

```typescript
{
  id: 9,
  slug: 'conditionals',
  title: 'Conditionals',
  description: 'If, unless, and conditional statements',
  icon: '🔀',
  color: 'from-orange-400 to-orange-600',
  questions: [
    {
      id: 1,
      question: 'If I .... rich, I would travel.',
      options: { a: 'am', b: 'was', c: 'were', d: 'would be' },
      correct: 'c',
      explanation: 'Use "were" with "I" in conditionals.',
    },
  ],
},
```

Save → Refresh browser → Done! ✨

---

## Add Questions (1 minute)

In same file, find topic's `questions` array, add:

```typescript
{
  id: 6,
  question: 'Your question...',
  options: { a: '...', b: '...', c: '...', d: '...' },
  correct: 'a',
  explanation: 'Why a is correct...',
},
```

---

## Deploy to Vercel (2 minutes)

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "init"
git remote add origin https://github.com/YOUR_USERNAME/repo.git
git push -u origin main

# 2. Go to vercel.com → Import → Select repo → Deploy
```

Done! You get a public URL.

---

## Key Files

```
src/data/topics.ts           ← Add topics & questions HERE
src/components/TopicSelector.tsx  ← Topic cards UI
src/components/QuizContainer.tsx   ← App flow
src/app/layout.tsx           ← App title/metadata
```

---

## Features

✅ 8 topics, 47 questions
✅ Beautiful topic selector
✅ Responsive design (mobile/desktop)
✅ Smooth animations
✅ Score tracking
✅ Answer review with explanations
✅ Back button during quiz
✅ Restart functionality
✅ Production-ready

---

## File Structure

```
telegram-grammar-quiz/
├── src/
│   ├── data/
│   │   ├── topics.ts       ✨ NEW - All topics here
│   │   ├── types.ts        ✅ Updated
│   │   └── questions.ts    ✅ Updated
│   ├── components/
│   │   ├── TopicSelector.tsx     ✨ NEW
│   │   ├── QuizContainer.tsx     ✅ Refactored
│   │   ├── ResultsScreen.tsx     ✅ Updated
│   │   ├── HomeScreen.tsx        ✅ Updated
│   │   ├── QuestionCard.tsx      ✓ Same
│   │   └── ProgressBar.tsx       ✓ Same
│   └── app/
│       ├── layout.tsx      ✅ Updated
│       └── page.tsx        ✓ Same
└── [other files unchanged]
```

---

## Commands

```bash
npm run dev      # Run locally (http://localhost:3000)
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Check code quality
```

---

## How It Works

### Old (Single Topic)
```
Welcome → Quiz (Present Simple only) → Results
```

### New (Multi-Topic)
```
Welcome → Topic Selector → Quiz (chosen topic) → Results
```

---

## Tips

💡 **Add topics in bulk** - Copy/paste question template
💡 **Use emojis** - Makes topics visually distinct
💡 **Use colors** - Tailwind gradients: `from-X-400 to-X-600`
💡 **Short descriptions** - 1-2 sentence max
💡 **5-12 questions per topic** - Good balance

---

## Troubleshooting

**App won't start?**
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

**New topic not appearing?**
- Check `topics.ts` for syntax errors
- Save file
- Refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

**Build fails?**
```bash
rm -rf .next
npm run build
```

---

## Next: Add More Topics

Ideas ready to add:
- Conditionals 🔀
- Passive Voice 🔄
- Reported Speech 💬
- Relative Clauses 🔗
- Gerunds & Infinitives ∞
- Phrasal Verbs 📍
- Subject-Verb Agreement ✓
- Word Order 🔢

Each can be 5-10 questions!

---

## Deploy Commands

```bash
# Vercel (easiest)
vercel

# Self-host (VPS/AWS)
npm run build
npm start

# Docker
docker build -t quiz .
docker run -p 3000:3000 quiz
```

---

**Ready?** Run `npm run dev` and start! 🚀

See full docs in:
- `REFACTOR_GUIDE.md` - Detailed guide
- `CHANGES.md` - What changed
- `COMPLETION.md` - Full summary
