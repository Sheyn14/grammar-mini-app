# Lesson System - File & Code Reference

## 📁 File Structure

```
Your Project
├── src/
│   ├── app/
│   │   ├── home/
│   │   │   └── learning/
│   │   │       └── page.tsx                    ← Shows levels
│   │   │
│   │   └── learning/
│   │       ├── [level]/
│   │       │   ├── page.tsx                    ← Shows all units for a level
│   │       │   └── unit/
│   │       │       └── [unitId]/
│   │       │           ├── page.tsx            ← Shows all lessons for a unit ⭐
│   │       │           └── lesson/
│   │       │               └── [lessonSlug]/
│   │       │                   └── page.tsx    ← Show individual lesson ⭐
│   │       │
│   │       └── [slug]/                        ← (OLD - removed)
│   │
│   └── data/
│       ├── lessons.ts                         ← Lesson data + helpers ⭐
│       ├── levels.ts
│       ├── types.ts
│       └── ...
```

---

## 🔗 Key Integration Points

### 1️⃣ Data Source: `/src/data/lessons.ts`

**What it contains:**
- Lesson interface definitions
- `beginnerLessons` object with all Unit 1-3 lessons
- Helper functions for data retrieval

**Key exports:**
```typescript
export const beginnerLessons: LessonsByUnit = {
  1: [ /* 3 Beginner Unit 1 lessons */ ],
  2: [ /* 2 Beginner Unit 2 lessons */ ],
  3: [ /* 1 Beginner Unit 3 lesson */ ],
};

export getLessonsByUnit(unitId)        // Get all lessons for a unit
export getLessonById(unitId, lessonId) // Get specific lesson
export getLessonBySlug(slug)           // Find lesson by slug
export getLessonCount(unitId)          // Count lessons
```

---

### 2️⃣ Unit Page: `/src/app/learning/[level]/unit/[unitId]/page.tsx`

**Flow:**
1. Gets URL parameters: `levelSlug`, `unitId`
2. Extracts `unitNumber` from unitId (e.g., "unit-1" → 1)
3. **Calls:** `const lessons = getLessonsByUnit(unitNumber)`
4. **Displays:** Lesson cards in a grid/list
5. **Links to:** `/learning/[level]/unit/unit-[N]/lesson/[slug]`

**Key code section:**
```typescript
import { getLessonsByUnit } from '@/data/lessons';

export default function UnitPage() {
  // ... setup ...
  
  const lessons = getLessonsByUnit(unitNumber);
  
  return (
    <>
      {lessons.length > 0 ? (
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <Link href={`/learning/${level.slug}/unit/unit-${unitNumber}/lesson/${lesson.slug}`}>
              <button className="...">
                <span>{lesson.icon}</span>
                <h3>{lesson.title}</h3>
                <p>{lesson.description}</p>
                <span className="...">
                  {lesson.difficulty} • ⏱️ {lesson.estimatedTime} min
                </span>
              </button>
            </Link>
          ))}
        </div>
      ) : (
        <p>No lessons yet...</p>
      )}
    </>
  );
}
```

**Lesson Card Display:**
- ✅ Icon (emoji)
- ✅ Title
- ✅ Description
- ✅ Difficulty badge (Easy/Medium/Hard)
- ✅ Estimated time
- ✅ Hover animation with arrow icon
- ✅ Clickable to open lesson

---

### 3️⃣ Lesson Detail Page: `/src/app/learning/[level]/unit/[unitId]/lesson/[lessonSlug]/page.tsx`

**Flow:**
1. Gets URL parameters: `levelSlug`, `unitId`, `lessonSlug`
2. Extracts `unitNumber` from unitId
3. **Calls:** `const lesson = getLessonById(unitNumber, urlExtractedId)`
4. **Renders:** Full lesson with markdown support

**Key code section:**
```typescript
import { getLessonById } from '@/data/lessons';

export default function LessonPage() {
  // ... setup ...
  
  const lesson = getLessonById(unitNumber, lessonId);
  
  const renderContent = (content: string) => {
    // Markdown parser: converts # ## ### to headers, etc.
  };
  
  return (
    <>
      <div>
        <span>{lesson.icon}</span>
        <h1>{lesson.title}</h1>
        <p>{lesson.description}</p>
        
        <div className="badge-easy|medium|hard">
          {lesson.difficulty} • ⏱️ {lesson.estimatedTime} min
        </div>
      </div>
      
      <div className="prose">
        {renderContent(lesson.content)}
      </div>
      
      <div className="sidebar">
        <h3>Lesson Info</h3>
        <p>Difficulty: {lesson.difficulty}</p>
        <p>Time: {lesson.estimatedTime} min</p>
        <p>Unit: {unitNumber}</p>
      </div>
    </>
  );
}
```

**Lesson Detail Display:**
- ✅ Breadcrumb navigation
- ✅ Back button
- ✅ Lesson header with icon, title, description
- ✅ Difficulty & time badges
- ✅ Full markdown-formatted content
- ✅ Sidebar with lesson info
- ✅ Progress tracker (placeholder)
- ✅ Next steps guide

---

## 📊 Data Flow Diagram

```
User navigates to: /learning/beginner/unit/unit-1

    ↓

Unit Page loads
    ├→ Extract: levelSlug = "beginner", unitId = "unit-1", unitNumber = 1
    ├→ Call: getLessonsByUnit(1)
    ├→ Data returned: [Lesson], [Lesson], [Lesson] ← 3 lessons for Unit 1
    ├→ Display: 3 clickable lesson cards
    └→ User clicks: "Present Simple - Introduction"
    
    ↓

Navigate to: /learning/beginner/unit/unit-1/lesson/present-simple-intro

    ↓

Lesson Detail Page loads
    ├→ Extract: levelSlug="beginner", unitNumber=1, lessonSlug="present-simple-intro"
    ├→ Call: getLessonById(1, 1) ← Unit 1, Lesson ID 1
    ├→ Data returned: {
    │    id: 1,
    │    title: "Present Simple - Introduction",
    │    icon: "📖",
    │    content: "# Present Simple\n\n## Explanation\n...",
    │    difficulty: "easy",
    │    estimatedTime: 10
    │  }
    ├→ Render: Full lesson with markdown parser
    ├→ Sidebar: Shows difficulty, time, unit info
    └→ Display: Beautiful formatted lesson content
```

---

## 🎯 Integration Checklist

### ✅ Completed
- [x] Data structure in `lessons.ts`
- [x] Helper functions exported
- [x] Unit page fetches lessons
- [x] Lesson cards display correctly
- [x] Lesson cards link to detail pages
- [x] Lesson detail page renders content
- [x] Markdown rendering implemented
- [x] Beautiful UI applied
- [x] Mobile responsive
- [x] Color-coded by level
- [x] Empty state handled
- [x] Breadcrumbs working
- [x] Back buttons working

### 🚀 Ready to Use
- Lesson system is production-ready
- All routes compiled successfully
- No TypeScript errors
- Fully responsive design

---

## 💡 Code Examples

### Example 1: How lessons are stored
```typescript
export const beginnerLessons: LessonsByUnit = {
  1: [
    {
      id: 1,
      unitId: 1,
      title: 'Present Simple - Introduction',
      description: 'Learn the basics of present simple tense',
      icon: '📖',
      slug: 'present-simple-intro',      // ← Used in URL
      content: `
# Present Simple - Introduction

## What is Present Simple?
Present Simple is used to talk about:
- Daily habits and routines
- General facts
- Things that are always true

## Examples
- I go to school every day
- She works in a hospital

## Structure
**Positive:** Subject + Base Verb
      `,
      difficulty: 'easy',
      estimatedTime: 10,
    },
    // ... more lessons
  ],
};
```

### Example 2: How lessons are retrieved (Unit Page)
```typescript
// In Unit Page component
const unitNumber = 1;  // From URL params
const lessons = getLessonsByUnit(unitNumber);  // Returns array of 3 lessons

// Display each lesson
lessons.map(lesson => (
  <Link href={`/learning/beginner/unit/unit-1/lesson/${lesson.slug}`}>
    {lesson.icon} {lesson.title} - {lesson.estimatedTime} min
  </Link>
))
```

### Example 3: How lessons are displayed (Lesson Detail Page)
```typescript
// In Lesson Detail Page component
const lesson = getLessonById(1, 1);  // Get Unit 1, Lesson ID 1

// Render full content
return (
  <>
    <h1>{lesson.title}</h1>
    <p>Difficulty: {lesson.difficulty}</p>
    <p>Time: {lesson.estimatedTime} minutes</p>
    
    <div className="content">
      {renderMarkdown(lesson.content)}
    </div>
  </>
);
```

---

## 🔧 How to Maintain It

### Add New Lesson
1. Open `/src/data/lessons.ts`
2. Find your unit (e.g., `1: [...]`)
3. Add lesson object with new ID
4. Save - dev server hot-reloads
5. Test at `/learning/beginner/unit/unit-1`

### Add New Unit for a Level
1. Add new unit to `beginnerLessons` object
2. Example: `5: [ /* Unit 5 lessons */ ]`
3. Add lessons inside array
4. System automatically supports it

### Extend to Other Levels
1. Create `elementaryLessons` object
2. Follow same structure as `beginnerLessons`
3. Update unit page routing logic
4. System works seamlessly

---

## 📌 Summary

| Component | File | Purpose |
|-----------|------|---------|
| Data | `/src/data/lessons.ts` | Stores all lessons organized by unit |
| Unit Page | `/src/app/learning/[level]/unit/[unitId]/page.tsx` | Displays clickable lesson cards |
| Lesson Page | `/src/app/learning/[level]/unit/[unitId]/lesson/[lessonSlug]/page.tsx` | Displays full lesson content |
| Helpers | `getLessonsByUnit()`, `getLessonById()` | Access lesson data |

**Total: 3 key files working together in harmony** ✨

