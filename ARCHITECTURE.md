# Project Architecture

## 🏗️ Overview

This is a Next.js 15 application designed as a Telegram Mini App with modular React components, TypeScript type safety, and Tailwind CSS styling.

```
┌─────────────────────────────────────────────────────────┐
│                    Telegram Mini App                     │
│              (runs inside Telegram client)               │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    Next.js 15 Frontend                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  HomeScreen  │  │ QuestionCard │  │ResultsScreen │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │           QuizContainer (State Manager)          │  │
│  │  - Manages quiz flow (home → quiz → results)    │  │
│  │  - Tracks current question, answers, score      │  │
│  │  - Handles screen transitions                   │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐                    │
│  │  useTelegram │  │ telegram.ts  │                    │
│  │   (hooks)    │  │  (utilities)  │                    │
│  └──────────────┘  └──────────────┘                    │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                Local Question Data                      │
│    (12 Present Simple questions hardcoded in types)    │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 File Structure Details

### Configuration Files

```
next.config.js           # Next.js configuration (build settings)
tsconfig.json            # TypeScript compiler options, path aliases
tailwind.config.ts       # Tailwind CSS theme, colors, animations
postcss.config.js        # PostCSS plugins (Tailwind, autoprefixer)
package.json             # Dependencies and npm scripts
.gitignore              # Git ignore patterns
```

### Source Code: `/src`

#### `/src/app` - Next.js App Router Pages

```typescript
layout.tsx
├── Purpose: Root layout for entire app
├── Exports:
│   ├── metadata: page title, description
│   ├── viewport: mobile viewport settings
├── Includes:
│   ├── Telegram WebApp SDK script
│   ├── Global CSS
│   └── HTML structure
└── Used by: All pages

page.tsx
├── Purpose: Home page component (/)
├── Imports: useTelegram hook
├── Renders: QuizContainer component
└── User sees: Quiz app

globals.css
├── @tailwind directives (base, components, utilities)
├── Custom utilities
└── Telegram WebApp theme support
```

#### `/src/components` - React Components

All components are written in TypeScript with full type safety.

```typescript
QuizContainer.tsx (446 lines)
├── Role: Central state manager and orchestrator
├── State Management:
│   ├── useState<Screen>('home'): 'home' | 'quiz' | 'results'
│   ├── useState<number>(0): currentQuestion index
│   ├── useState<Record<number, string>>({}): user answers
│   └── useState<number>(0): calculated score
├── Functions:
│   ├── handleStart(): Reset state, navigate to quiz
│   ├── handleSelectAnswer(questionId, answer): Store answer
│   ├── handleNextQuestion(): Move to next or show results
│   └── calculateScore(): Count correct answers
├── Renders: HomeScreen | QuestionCard + ProgressBar | ResultsScreen
├── Handles: All user interactions and quiz logic
└── Passes to children: Callbacks and data via props

HomeScreen.tsx
├── Role: Start screen of the quiz
├── Props:
│   └── onStart: () => void (callback when button clicked)
├── Renders:
│   ├── "Let's Master Present Simple!" headline
│   ├── Description and time estimate
│   ├── Stats (Questions count, average time)
│   └── "Start Quiz" button
└── Styling: TailwindCSS, centered card layout

QuestionCard.tsx (155 lines)
├── Role: Display question with answer options
├── Props:
│   ├── question: Question (id, text, options, correct, explanation)
│   ├── userAnswer: string | undefined
│   ├── isAnswered: boolean
│   └── onSelectAnswer: (answer: string) => void
├── Features:
│   ├── Dynamic button styling based on state:
│   │   ├── Not answered: gray border, cursor pointer
│   │   ├── Selected but not submitted: blue ring
│   │   ├── After submit (if correct): green background
│   │   └── After submit (if wrong): red background + shows correct
│   ├── Shows explanation when answered
│   └── Disables interaction after answer
├── Styling:
│   ├── Responsive grid for options
│   ├── Smooth transitions
│   └── Touch-friendly buttons
└── Animations: slideIn on mount, scale on active

ProgressBar.tsx
├── Role: Show quiz progress visually
├── Props:
│   ├── current: number (current question index)
│   └── total: number (total questions)
├── Renders:
│   ├── "Question X of Y" text
│   ├── Percentage badge
│   └── Animated progress bar
├── Features:
│   ├── Calculates percentage: (current / total) * 100
│   ├── Bar animates smoothly (500ms transition)
│   └── Updates in real-time
└── Styling: Tailwind gradient bar, smooth width transition

ResultsScreen.tsx (165 lines)
├── Role: Display quiz results and review answers
├── Props:
│   ├── score: number
│   ├── total: number
│   ├── questions: Question[]
│   ├── answers: Record<number, string>
│   ├── onRestart: () => void
│   └── onSendResults: () => void
├── Features:
│   ├── Score calculation: ((score / total) * 100).toFixed(1)
│   ├── Color-coded performance:
│   │   ├── ≥ 80%: Excellent (green)
│   │   ├── ≥ 60%: Good (blue)
│   │   ├── ≥ 40%: Fair (yellow)
│   │   └── < 40%: Keep Trying (red)
│   ├── Performance medal: ⭐ (excellent) or 🎯 (others)
│   ├── Personalized message based on score
│   └── Full answer review:
│       ├── Shows all questions
│       ├── User's answer vs correct answer
│       └── Explanation for each
├── Buttons:
│   ├── "Review Answers" (scrolls to review section)
│   └── "Take Quiz Again" (calls onRestart)
└── Styling: Card-based layout, scrollable review, responsive

ProgressBar.tsx (Simple)
├── Role: Visual progress indicator
├── Props: current (index), total (count)
└── Shows: "Question X of Y" + percentage bar with animation
```

#### `/src/data` - Data & Types

```typescript
types.ts (30 lines)
├── Question interface:
│   ├── id: number (unique identifier)
│   ├── question: string (the grammar question)
│   ├── options: { a: string; b: string; c: string; d: string }
│   ├── correct: 'a' | 'b' | 'c' | 'd'
│   └── explanation: string (why correct)
└── QuizState interface:
    ├── currentQuestion: number (index)
    ├── answers: Record<number, string> (q_id → answer)
    └── completed: boolean

questions.ts (115 lines)
├── 12 Present Simple grammar questions
├── Each question:
│   ├── Tests verb conjugation (I/you/we/they go, he/she/it goes)
│   ├── Includes 4 plausible options
│   ├── Has detailed explanation
│   └── Relevant to everyday English use
├── Export: presentSimpleQuestions: Question[]
└── Designed to be extensible (add new arrays for other topics)
```

#### `/src/hooks` - React Hooks

```typescript
useTelegram.ts
├── Purpose: Initialize Telegram WebApp SDK as a React hook
├── Lifecycle:
│   ├── On mount: Create Telegram SDK script element
│   ├── On script load: Call initTelegramApp()
│   ├── Extract user from tg.initDataUnsafe
│   └── Store in state
├── Return:
│   ├── app: Initialized Telegram WebApp object
│   ├── user: User data from Telegram
│   └── loading: boolean (SDK loading state)
├── Usage: const { app, user } = useTelegram()
└── Safe: All access guarded with typeof window checks
```

#### `/src/utils` - Utility Functions

```typescript
telegram.ts
├── Purpose: Telegram integration utilities
├── Functions:
│   ├── initTelegramApp()
│   │   ├── Calls tg.ready()
│   │   ├── Calls tg.expand() (fullscreen)
│   │   ├── Sets header color to primary blue
│   │   └── Returns tg object
│   │
│   ├── getTelegramUser()
│   │   ├── Extracts user from tg.initDataUnsafe?.user
│   │   ├── Returns user object with id, first_name, username
│   │   └── Safe null checks
│   │
│   └── sendResultsToBot(data)
│       ├── Prepares payload with quiz results
│       ├── Includes: user_id, username, score, total, percentage
│       ├── Currently logs to console
│       └── API endpoint commented (ready for backend integration)
└── Safety: All functions include typeof window checks
```

---

## 🔄 Data Flow

### 1. App Initialization

```
User visits app
    ↓
Next.js loads page.tsx
    ↓
useTelegram hook initializes
    ↓
Telegram WebApp SDK loads
    ↓
QuizContainer mounts in 'home' state
    ↓
HomeScreen displays with "Start Quiz" button
```

### 2. Quiz Flow

```
User clicks "Start Quiz"
    ↓
QuizContainer: handleStart() → state changes to 'quiz'
    ↓
QuestionCard displays question[0]
ProgressBar shows "Question 1 of 12" (1/12 = 8%)
    ↓
User selects an answer
    ↓
QuizContainer: handleSelectAnswer() → stores answer
Answer button shows if correct (green) or incorrect (red)
    ↓
User clicks "Next"
    ↓
QuizContainer: handleNextQuestion()
    ├── If more questions: increment index, render next question
    └── If last question: calculate score, switch to 'results'
```

### 3. Results Display

```
Quiz completed
    ↓
QuizContainer: calculateScore()
    ├── Counts correct answers
    ├── Calculates percentage
    └── Returns score object
    ↓
ResultsScreen mounts with:
    ├── Score badge (colored based on percentage)
    ├── Performance message
    └── Answer review cards
    ↓
sendResultsToBot() called (logs to console)
    ↓
User can:
    ├── Scroll through review
    └── Click "Take Quiz Again" → reset to home
```

---

## 🎨 Component Composition Tree

```
RootLayout (layout.tsx)
    └── page.tsx
        └── QuizContainer
            ├── Screen: 'home' → HomeScreen
            │   └── Button → onStart()
            │
            ├── Screen: 'quiz' → Fragment
            │   ├── ProgressBar
            │   │   └── Shows (current + 1) / total
            │   └── QuestionCard
            │       ├── Question display
            │       └── 4 option buttons
            │
            └── Screen: 'results' → ResultsScreen
                ├── Score badge
                ├── Performance message
                ├── Review cards (scrollable)
                └── Restart button
```

---

## 🎯 State Management Strategy

### Global Quiz State (in QuizContainer)

```typescript
const [screen, setScreen] = useState<Screen>('home');
const [currentQuestion, setCurrentQuestion] = useState(0);
const [answers, setAnswers] = useState<Record<number, string>>({});
const [score, setScore] = useState(0);
```

**State Flow:**
- ✅ Centralized in QuizContainer (no prop drilling)
- ✅ Screen state controls which component renders
- ✅ Answers stored as { questionId: selectedOption }
- ✅ Score calculated from answers + correctAnswers

**Why This Approach:**
- Simple and predictable
- Easy to debug in React DevTools
- No need for Context API for small app
- Can scale up later with Context/Redux if needed

---

## 🎨 Styling Architecture

### Color System

```typescript
// tailwind.config.ts
colors: {
  primary: '#0098ea',    // Main blue (Telegram theme)
  success: '#31a24c',    // Green (correct answers)
  error: '#dd2c20',      // Red (incorrect answers)
  warning: '#f39c12',    // Yellow (needs improvement)
  neutral: '#f5f5f5',    // Light gray (backgrounds)
}
```

### Responsive Breakpoints

```
Mobile First (default styles apply to mobile)
├── sm: 640px
├── md: 768px
├── lg: 1024px
└── xl: 1280px

Max width container: 500px (optimized for mobile/tablet)
```

### Animations

```typescript
// globals.css & tailwind.config.ts
@keyframes slideIn {
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

// Applied in components:
// className="animate-slideIn"
// className="animate-fadeIn"
```

---

## 🔐 Type Safety

### All Components Use TypeScript Interfaces

```typescript
// Define once, use everywhere
interface Question {
  id: number;
  question: string;
  options: { a: string; b: string; c: string; d: string };
  correct: 'a' | 'b' | 'c' | 'd';
  explanation: string;
}

// Components receive typed props
interface QuestionCardProps {
  question: Question;
  userAnswer?: string;
  isAnswered: boolean;
  onSelectAnswer: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ ... }) => { ... }
```

**Benefits:**
- ✅ IDE autocomplete
- ✅ Build-time error checking
- ✅ Self-documenting code
- ✅ Prevents runtime bugs

---

## 🚀 Performance Optimizations

### Code Splitting
```
Next.js automatically code-splits by route
- Smaller initial bundle
- Lazy load what you need
```

### Image Optimization
```
Not currently used, but Next.js Image component ready if needed
```

### CSS-in-JS
```
Tailwind CSS generates only used classes
- Minimal CSS file size
- No unused styles shipped
```

### Memoization
```typescript
const handleStart = useCallback(() => {
  setScreen('quiz');
  setCurrentQuestion(0);
  setAnswers({});
}, []);

// useCallback prevents unnecessary re-renders of child components
```

---

## 📱 Mobile-First Design

### Viewport Settings

```typescript
// layout.tsx
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
```

### Touch-Friendly UI

```typescript
// Button minimum size: 44×44px (Apple standard)
// Tap areas have adequate spacing
// No hover-only interactions (works on touch)
```

### Responsive Layout

```
Mobile (< 640px): Full width, 16px padding
Tablet (≥ 768px): Container max-width 500px, centered
Desktop (≥ 1024px): Still max-width 500px (not stretched)
```

---

## 🔗 Telegram Integration Points

### 1. SDK Script Injection

```typescript
// layout.tsx - Added to <head>
<script src="https://telegram.org/js/telegram-web-app.js" />
```

### 2. Initialization

```typescript
// useTelegram.ts
// After script loads:
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();
tg.setHeaderColor('#0098ea');
```

### 3. User Access

```typescript
// telegram.ts - getTelegramUser()
const user = tg.initDataUnsafe?.user;
// {
//   id: number,
//   first_name: string,
//   username: string,
//   ...
// }
```

### 4. Results Sending

```typescript
// telegram.ts - sendResultsToBot()
// Currently logs to console
// Ready for API call to backend
await fetch('/api/quiz-results', {
  method: 'POST',
  body: JSON.stringify({
    user_id: user.id,
    username: user.username,
    score, total, percentage,
    timestamp: new Date().toISOString(),
  })
});
```

---

## 🔄 Extending the App

### Adding Questions

1. Edit `src/data/questions.ts`
2. Add new Question objects to array
3. No other changes needed

### Adding Topics

1. Create `src/data/advanced-grammar-questions.ts`
2. Define new Question array
3. Add topic selector in QuizContainer
4. Export and import

### Adding Features

```
New feature → Create component → Add to QuizContainer → Connect data
```

Example: Add timer
```
1. Create useTimer.ts hook
2. Add to QuizContainer
3. Display in ProgressBar
4. Pass callbacks to QuestionCard
```

---

## ✅ Quality Checks

**TypeScript Compilation:**
```bash
npx tsc --noEmit
```

**Linting:**
```bash
npm run lint
```

**Build Verification:**
```bash
npm run build
```

---

This architecture is designed to be:
- ✅ **Simple**: Easy to understand for new developers
- ✅ **Scalable**: Can add topics, questions, features
- ✅ **Type-Safe**: Full TypeScript coverage
- ✅ **Mobile-First**: Optimized for Telegram clients
- ✅ **Maintainable**: Clear separation of concerns
