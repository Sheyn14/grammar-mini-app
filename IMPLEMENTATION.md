# Implementation Guide - Telegram Grammar Quiz Application

## Overview

This document describes the complete implementation of the Telegram Grammar Quiz Application, including architecture, components, and integration points.

## Project Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────┐
│        Client-Side (Next.js React)      │
├─────────────────────────────────────────┤
│ Pages:                                  │
│ - / (Home - Router)                    │
│ - /login (Login Form)                  │
│ - /dashboard (Quiz Selection)           │
│ - /quiz/[id] (Quiz Interface)          │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│      Authentication & State              │
├─────────────────────────────────────────┤
│ AuthProvider (Context)                  │
│ - User state                           │
│ - Login/Logout functions               │
│ - Session persistence                  │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│        API Routes (Next.js Backend)      │
├─────────────────────────────────────────┤
│ POST /api/auth/login                   │
│ POST /api/auth/logout                  │
│ GET /api/auth/me                       │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│        Data Layer & Services            │
├─────────────────────────────────────────┤
│ - quizzes.ts (Static quiz data)        │
│ - Future: Database integration         │
└─────────────────────────────────────────┘
```

## Component Structure

### 1. AuthProvider (`src/providers/AuthProvider.tsx`)

**Purpose**: Centralized authentication state management using React Context

**Key Features**:
- User state management
- Login/logout functionality
- Session persistence via cookies
- Loading state tracking

**Usage**:
```typescript
const { user, isAuthenticated, login, logout, loading } = useAuth();
```

**Responsibilities**:
- Manages authentication state across the app
- Handles API calls to login/logout endpoints
- Stores auth token in HTTP-only cookies
- Provides hooks for components to access auth state

### 2. Login Component (`src/components/auth/Login.tsx`)

**Purpose**: User authentication interface

**Features**:
- Telegram ID input field
- Password input field
- Form validation
- Error handling
- Loading state during authentication

**User Flow**:
1. User enters Telegram ID and password
2. Component validates input
3. Calls login API endpoint
4. On success: updates auth context and redirects to dashboard
5. On error: displays error message

### 3. QuizInterface Component (`src/components/quiz/QuizInterface.tsx`)

**Purpose**: Interactive quiz taking interface

**Features**:
- Question display
- Multiple choice options with visual feedback
- Progress tracking
- Score calculation
- Answer validation with immediate feedback
- Results screen with score summary

**Quiz Flow**:
1. Display current question and options
2. User selects an answer
3. Disable further selection and show correct/incorrect feedback
4. Show "Next" button
5. Continue until last question
6. Display results screen
7. Option to retry or return to dashboard

**Key Properties**:
```typescript
interface QuizProps {
  quizId: string;
  questions: QuizQuestion[];
  title: string;
}
```

### 4. Main Pages

#### Home Page (`src/app/page.tsx`)
- Router that redirects based on authentication status
- Redirects authenticated users to dashboard
- Redirects unauthenticated users to login

#### Login Page (`src/app/login/page.tsx`)
- Displays login form
- Handles user authentication
- Redirects to dashboard on successful login

#### Dashboard Page (`src/app/dashboard/page.tsx`)
- Shows available quizzes
- Displays user statistics (placeholder)
- Quiz selection interface
- Logout button

#### Quiz Page (`src/app/quiz/[id]/page.tsx`)
- Dynamic route for specific quiz
- Loads quiz data based on ID
- Renders QuizInterface component
- Handles missing quiz error

## Authentication System

### Flow Diagram

```
User Login
    │
    ▼
[Login Page]
    │ (Enter Telegram ID & Password)
    ▼
[POST /api/auth/login]
    │
    ▼
[Validate Credentials]
    │
    ├─ Valid: Create session
    │         │
    │         ▼
    │      [Set Auth Cookie]
    │         │
    │         ▼
    │      [Return User Data]
    │         │
    │         ▼
    │      [Update AuthContext]
    │         │
    │         ▼
    │      [Redirect to Dashboard] ✓
    │
    └─ Invalid: Return Error
               │
               ▼
            [Show Error Message]
```

### API Endpoints

#### POST `/api/auth/login`
```typescript
Request:
{
  telegramId: string;
  password: string;
}

Response (200):
{
  id: string;
  telegramId: string;
  username: string;
}

Error (400):
{
  error: string;
}
```

**Implementation**:
- Validates incoming credentials
- TODO: Check against database
- Creates session cookie
- Returns user object

#### POST `/api/auth/logout`
```typescript
Response (200):
{
  success: true;
}

Side Effects:
- Deletes auth cookie
```

#### GET `/api/auth/me`
```typescript
Response (200):
{
  id: string;
  telegramId: string;
  username: string;
}

Error (401):
{
  error: "Not authenticated";
}
```

**Implementation**:
- Validates auth cookie
- TODO: Fetch user from database
- Returns user object

## Quiz System

### Quiz Data Structure

```typescript
interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;  // Index of correct answer
  explanation?: string;
}

interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}
```

### Quiz Topics

1. **Present Simple** - 3 questions
   - Basic usage and conjugation
   - Third person singular
   - Negation

2. **Present Continuous** - 3 questions
   - Current action description
   - Am/are/is usage
   - Negation in continuous

3. **Past Simple** - 2 questions
   - Completed past actions
   - Regular and irregular verbs

4. **Past Continuous** - 1 question
   - Actions in progress in the past

5. **Present Perfect** - 1 question
   - Recent actions with present relevance

6. **Modals** - 2 questions
   - Ability (can)
   - Advice (should)

### Quiz Taking Logic

```typescript
State Variables:
- currentQuestion: number (0 to length-1)
- score: number (correct answers)
- answered: boolean (allows single answer selection)
- selectedAnswer: number | null (user's choice)
- completed: boolean (all questions done)

Functions:
- handleAnswer(optionIndex)  // Register answer
- handleNext()               // Move to next question
- handleRetry()              // Reset quiz
- handleExit()               // Return to dashboard
```

### Scoring Algorithm

```
Score = (Correct Answers / Total Questions) × 100

Example: 8/12 = 66.67%
```

## File Organization

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/route.ts        (POST endpoint)
│   │       ├── logout/route.ts       (POST endpoint)
│   │       └── me/route.ts           (GET endpoint)
│   ├── dashboard/
│   │   └── page.tsx                  (Quiz selection page)
│   ├── login/
│   │   └── page.tsx                  (Login page)
│   ├── quiz/
│   │   └── [id]/
│   │       └── page.tsx              (Dynamic quiz page)
│   ├── layout.tsx                    (Root layout with AuthProvider)
│   ├── page.tsx                      (Home/router page)
│   └── globals.css                   (Global styles)
├── components/
│   ├── auth/
│   │   ├── Login.tsx                 (Login form)
│   │   └── SignUp.tsx                (Signup form - legacy)
│   ├── dashboard/
│   │   └── StudentDashboard.tsx      (Extended dashboard - legacy)
│   └── quiz/
│       └── QuizInterface.tsx          (Quiz taking interface)
├── providers/
│   └── AuthProvider.tsx              (Auth context & hooks)
├── data/
│   └── quizzes.ts                    (Quiz definitions)
├── hooks/
│   └── useTelegram.ts                (Telegram integration - future)
└── utils/
    └── supabase.ts                   (Supabase client - legacy)
```

## State Management

### Global State (AuthProvider Context)

```typescript
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (telegramId: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
```

### Local State (Component Level)

**QuizInterface**:
- `currentQuestion` - Current question index
- `score` - Number of correct answers
- `answered` - Whether current question has been answered
- `selectedAnswer` - Index of selected option
- `completed` - Quiz completion status

## Styling System

### Tailwind CSS Configuration

**Color Palette**:
- Primary: Blue (`blue-600`, `blue-700`)
- Success: Green (`green-600`, `green-50`)
- Error: Red (`red-600`, `red-50`)
- Background: Slate/Gray (`slate-50`, `gray-100`)

**Responsive Breakpoints**:
- Mobile: Default
- Tablet: `md:` (768px+)
- Desktop: `lg:` (1024px+)

### Component Styling Patterns

```typescript
// Card Components
className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"

// Buttons
className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"

// Form Inputs
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"

// Answer Options
className="w-full p-4 text-left rounded-lg border-2 transition"
```

## Integration Points

### Future Integrations

1. **Database Integration**
   - Replace mock data with real data
   - Store user progress and scores
   - Implement user statistics

2. **Telegram Integration**
   - Use Telegram Web App SDK
   - Send user data from Telegram
   - Store Telegram user info

3. **Backend Integration**
   - Connect to Express/Python backend
   - Implement proper authentication
   - Add database operations

## Error Handling

### Error Types

1. **Authentication Errors**
   - Invalid credentials
   - Session expired
   - Missing auth token

2. **Quiz Errors**
   - Quiz not found
   - Invalid question data
   - Data loading failure

### Error Handling Patterns

```typescript
try {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ telegramId, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const userData = await response.json();
  setUser(userData);
} catch (error) {
  setError(error.message);
  // Handle error in UI
}
```

## Performance Considerations

1. **Code Splitting**
   - Next.js automatically code-splits components
   - Dynamic routes loaded on demand

2. **Caching**
   - Quiz data can be cached
   - HTTP-only cookies reduce transfer

3. **Optimization**
   - Minimal re-renders with Context API
   - Avoid unnecessary state updates

## Security Measures

1. **HTTP-Only Cookies**
   - Auth token stored securely
   - Cannot be accessed by JavaScript
   - Protected against XSS

2. **HTTPS Required** (in production)
   - Secure communication
   - Prevents man-in-the-middle attacks

3. **TODO: Input Validation**
   - Validate all user inputs
   - Sanitize before database storage

4. **TODO: CSRF Protection**
   - Add CSRF tokens for state-changing operations

## Testing Strategy

### Components to Test

1. **Authentication**
   - Login with valid credentials
   - Login with invalid credentials
   - Session persistence
   - Logout functionality

2. **Quiz System**
   - Question display
   - Answer selection
   - Score calculation
   - Quiz navigation

3. **UI/UX**
   - Responsive design
   - Error displays
   - Loading states

## Deployment Guide

### Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

### Build and Deploy

```bash
# Development
npm run dev

# Production build
npm run build

# Production start
npm start
```

## Future Enhancements

1. **User Features**
   - User profiles and settings
   - Quiz history and statistics
   - Achievements and badges
   - Spaced repetition algorithm

2. **Content Features**
   - More grammar topics
   - Video explanations
   - Practice exercises
   - Real-time feedback

3. **Technical Features**
   - Real database integration
   - Advanced search/filtering
   - Admin dashboard
   - Analytics and reporting

4. **Telegram Integration**
   - Full Telegram Mini App integration
   - Share results with bots
   - Push notifications
   - Leaderboard system

## Troubleshooting

### Common Issues

1. **Login not working**
   - Clear browser cookies
   - Check network tab for API errors
   - Verify credentials

2. **Quiz not loading**
   - Check quiz ID in URL
   - Verify quiz exists in quizzes.ts
   - Check console for errors

3. **Styling issues**
   - Rebuild: `npm run build`
   - Clear `.next` directory
   - Hard refresh browser

## Support & Maintenance

- Monitor error logs
- Update dependencies regularly
- Performance profiling
- User feedback collection
