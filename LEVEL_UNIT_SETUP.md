# 📚 Level-Unit-Test Structure - Setup & Instructions

## Overview

Your grammar app has been refactored from a single grammar-topic model to a scalable **Level → Unit → Test** hierarchy:

```
📊 5 Proficiency Levels
├── 🌱 Beginner (14 units)
├── 📚 Elementary (12 units)
├── 🎯 Pre-Intermediate (12 units)
├── ⭐ Intermediate (12 units)
└── 🚀 Upper-Intermediate (12 units)
    └── Each Unit contains 1 Test
        └── Each Test contains multiple questions
```

**Total:** 62 units with placeholder test data ready for your questions.

---

## Navigation Flow

The app now flows like this:

```
Home Screen
    ↓ (Click "Start Quiz")
Level Selector (5 levels to choose from)
    ↓ (Click a level, e.g., "Beginner")
Unit Selector (12-14 units in that level)
    ↓ (Click a unit, e.g., "Unit 1")
Quiz Screen (Take the test for that unit)
    ↓ (Answer all questions)
Results Screen (See your score and review)
```

---

## Where to Add Your Questions

All test data is stored in: **`src/data/levels.ts`**

### Step 1: Open the file
```
src/data/levels.ts
```

### Step 2: Find the section for your level

Search for these comments in the file:

- **BEGINNER**: `=== BEGINNER LEVEL (14 UNITS) ===`
- **ELEMENTARY**: `=== ELEMENTARY LEVEL (12 UNITS) ===`
- **PRE-INTERMEDIATE**: `=== PRE-INTERMEDIATE LEVEL (12 UNITS) ===`
- **INTERMEDIATE**: `=== INTERMEDIATE LEVEL (12 UNITS) ===`
- **UPPER-INTERMEDIATE**: `=== UPPER-INTERMEDIATE LEVEL (12 UNITS) ===`

---

## How to Add Questions to a Unit

### Example: Adding questions to Beginner Unit 1

**File:** `src/data/levels.ts`

**Find this section** (around line 200):

```typescript
{
  id: 1,
  level: 'Beginner',
  unit: 1,
  title: 'Unit 1: Basic Greetings',
  description: 'Learn common greetings and introductions',
  icon: '👋',
  questions: [
    {
      id: 1,
      question: 'PLACEHOLDER: Replace with your question',
      options: { a: 'option a', b: 'option b', c: 'option c', d: 'option d' },
      correct: 'a',
      explanation: 'This is a placeholder. Replace with your explanation.',
    },
  ],
},
```

### Replace with your real questions:

```typescript
{
  id: 1,
  level: 'Beginner',
  unit: 1,
  title: 'Unit 1: Basic Greetings',
  description: 'Learn common greetings and introductions',
  icon: '👋',
  questions: [
    {
      id: 1,
      question: 'What is an appropriate greeting in English?',
      options: {
        a: 'Hello, how are you?',
        b: 'What is your salary?',
        c: 'How old are you?',
        d: 'Where do you work?',
      },
      correct: 'a',
      explanation: 'Hello or "How are you?" is a standard greeting in English.',
    },
    {
      id: 2,
      question: 'How do you respond to "Nice to meet you"?',
      options: {
        a: 'What do you do?',
        b: 'Nice to meet you too.',
        c: 'I am fine, thank you.',
        d: 'Good morning.',
      },
      correct: 'b',
      explanation: 'The appropriate response is "Nice to meet you too!"',
    },
    // Add more questions here...
  ],
},
```

---

## Question Format Template

Every question must follow this structure:

```typescript
{
  id: 1,                    // Unique number within the unit (1, 2, 3, ...)
  question: 'Your question text here?',
  options: {
    a: 'First option',
    b: 'Second option',
    c: 'Third option',
    d: 'Fourth option',
  },
  correct: 'a',             // Must be: 'a', 'b', 'c', or 'd'
  explanation: 'Why this answer is correct...',
}
```

### Rules:
- **id**: Must be sequential (1, 2, 3, 4, ...) within each unit
- **correct**: Must be one of `'a'`, `'b'`, `'c'`, `'d'`
- **question**: Clear, concise English grammar question
- **options**: All 4 options must be strings
- **explanation**: Detailed explanation for learning

---

## Location Reference

### Beginner Level Tests (14 units)
- **Units:** 1-14
- **Line:** ~105-265 (approximately)
- **IDs:** 1-14

### Elementary Level Tests (12 units)
- **Units:** 1-12
- **Line:** ~268-410 (approximately)
- **IDs:** 101-112

### Pre-Intermediate Level Tests (12 units)
- **Units:** 1-12
- **Auto-generated** (uses template)
- **IDs:** 201-212

### Intermediate Level Tests (12 units)
- **Units:** 1-12
- **Auto-generated** (uses template)
- **IDs:** 301-312

### Upper-Intermediate Level Tests (12 units)
- **Units:** 1-12
- **Auto-generated** (uses template)
- **IDs:** 401-412

---

## For Pre-Intermediate, Intermediate, and Upper-Intermediate

These levels use an auto-generated template. To customize them:

**Option 1:** Edit directly in `src/data/levels.ts` and replace the auto-generation with explicit arrays like Beginner & Elementary.

**Option 2:** Modify the template by editing these functions:
- `preIntermediateTests`
- `intermediateTests`
- `upperIntermediateTests`

---

## Unit Titles & Descriptions

You can customize these in `src/data/levels.ts`:

```typescript
{
  id: 3,
  level: 'Beginner',
  unit: 3,
  title: 'Unit 3: Numbers & Counting',  // ← Change this
  description: 'Numbers from 1 to 100', // ← Change this
  icon: '#️⃣',                          // ← Keep emoji or change
  questions: [ /* ... */ ],
}
```

---

## Adding Questions One-by-One

### Recommended Workflow:

1. **Open:** `src/data/levels.ts`

2. **Navigate** to the level you want (search for `=== LEVEL NAME ===`)

3. **Find the unit** by searching for `Unit X: ` within that level

4. **Replace the placeholder questions** with real ones

5. **Save the file** (Ctrl+S or Cmd+S)

6. **Test locally:**
   ```bash
   npm run dev
   ```

7. **Navigate** in the app:
   - Click "Start Quiz"
   - Select the level
   - Select the unit
   - Try the test

8. **Repeat** for the next unit

---

## Example: Full Unit with 5 Questions

```typescript
{
  id: 1,
  level: 'Beginner',
  unit: 1,
  title: 'Unit 1: Present Simple Basics',
  description: 'Introduction to present simple tense',
  icon: '🌅',
  questions: [
    {
      id: 1,
      question: 'I __ to school every day.',
      options: {
        a: 'go',
        b: 'goes',
        c: 'going',
        d: 'went',
      },
      correct: 'a',
      explanation: 'With the subject "I", use the base form "go" in present simple.',
    },
    {
      id: 2,
      question: 'She __ a teacher.',
      options: {
        a: 'are',
        b: 'is',
        c: 'am',
        d: 'be',
      },
      correct: 'b',
      explanation: 'With singular subjects like "she", we use "is".',
    },
    {
      id: 3,
      question: 'They __ football on Sundays.',
      options: {
        a: 'play',
        b: 'plays',
        c: 'playing',
        d: 'played',
      },
      correct: 'a',
      explanation: 'With plural subjects like "they", use the base form "play".',
    },
    {
      id: 4,
      question: 'Do you __ English?',
      options: {
        a: 'speak',
        b: 'speaks',
        c: 'speaking',
        d: 'spoke',
      },
      correct: 'a',
      explanation: 'In questions with "do", use the base form "speak".',
    },
    {
      id: 5,
      question: 'He doesn\'t __ breakfast early.',
      options: {
        a: 'eat',
        b: 'eats',
        c: 'eating',
        d: 'ate',
      },
      correct: 'a',
      explanation: 'With "doesn\'t", use the base form "eat".',
    },
  ],
},
```

---

## File Structure Overview

```
src/
├── data/
│   ├── types.ts          ← Type definitions (don't modify)
│   ├── levels.ts         ← ⭐ ALL YOUR QUESTIONS GO HERE
│   ├── topics.ts         ← Old grammar topics (kept for reference)
│   └── questions.ts      ← Old questions (kept for reference)
├── components/
│   ├── LevelSelector.tsx     ← Shows 5 levels
│   ├── UnitSelector.tsx      ← Shows units for a level
│   ├── QuizContainer.tsx     ← Main app flow (don't modify)
│   ├── QuestionCard.tsx      ← Question display (don't modify)
│   ├── ResultsScreen.tsx     ← Results display (don't modify)
│   ├── ProgressBar.tsx       ← Progress indicator (don't modify)
│   ├── HomeScreen.tsx        ← Welcome screen (don't modify)
│   └── TopicSelector.tsx     ← Old component (kept for reference)
└── utils/
    └── telegram.ts       ← Telegram integration (don't modify)
```

---

## Verification

Once you add questions:

1. **Check syntax** - make sure all brackets and commas are correct
2. **Run build** - `npm run build` should succeed
3. **Test locally** - `npm run dev` and try the unit
4. **Verify flow** - navigate through all screens

---

## Tips for Adding Questions Efficiently

### Copy-Paste Template
Use this template for new questions (copy and paste in your editor):

```typescript
{
  id: ,     // Number: 1, 2, 3, ...
  question: '?',
  options: {
    a: '',
    b: '',
    c: '',
    d: '',
  },
  correct: 'a',  // Change to 'b', 'c', or 'd' as needed
  explanation: '',
},
```

### Tips:
- Add questions one unit at a time
- Test in the app after each unit
- Save frequently
- Use meaningful descriptions
- Keep explanations concise but helpful

---

## Customizing Level Info

To change level titles, icons, or descriptions, edit near the top of `src/data/levels.ts`:

```typescript
export const levels: LevelInfo[] = [
  {
    id: 1,
    level: 'Beginner',
    slug: 'beginner',
    title: 'Beginner',                    // ← Change this
    description: 'Start here...',         // ← Change this
    icon: '🌱',                          // ← Change this
    color: 'from-green-800 to-green-950', // ← Change gradient colors
    unitCount: 14,                       // Don't change this
  },
  // ... other levels
];
```

---

## What NOT to Modify

- `QuizContainer.tsx` - Main app logic
- `LevelSelector.tsx` - Level UI
- `UnitSelector.tsx` - Unit UI
- `types.ts` - Type definitions
- `layout.tsx` - App layout

**Only edit:** `src/data/levels.ts` to add your questions

---

## Troubleshooting

### "Build fails after adding questions"
- Check for **missing commas** between questions
- Ensure **all brackets are closed** `{}`
- Verify **correct values** for the `correct` field ('a', 'b', 'c', or 'd')

### "Questions don't show up"
- Verify question `id` is sequential within the unit (1, 2, 3...)
- Make sure the unit has at least 1 question
- Check that `questions: []` array is not empty

### "App won't start"
- Run `npm run build` to see exact error
- Check for syntax errors in `levels.ts`
- Restart dev server: `npm run dev`

---

## Next Steps

1. ✅ You have 62 units ready for questions
2. 📝 Start adding your questions to `src/data/levels.ts`
3. 🧪 Test each unit as you go
4. 🚀 Deploy when ready

**Happy teaching!** 🎉
