# How to Add Unit Lessons

## Quick Start

Your lesson system is now fully integrated! Here's how to add and manage lessons for each unit.

## File Location
**Main file:** `/src/data/lessons.ts`

## Current Structure

```typescript
// Lessons are organized by unit:
beginnerLessons = {
  1: [ /* Unit 1 lessons */ ],
  2: [ /* Unit 2 lessons */ ],
  3: [ /* Unit 3 lessons */ ],
  // ... add more units
}
```

## How to Add a New Lesson

### Step 1: Open `/src/data/lessons.ts`

### Step 2: Find your unit section (e.g., Unit 2)

```typescript
// Unit 2 Lessons
2: [
  {
    id: 4,
    unitId: 2,
    title: 'Lesson Title Here',
    description: 'Brief description',
    icon: '📖', // emoji icon
    slug: 'lesson-url-name',
    content: `## Your markdown content here`,
    difficulty: 'easy', // 'easy', 'medium', 'hard'
    estimatedTime: 10, // minutes
  },
  // Add more lessons here...
],
```

### Step 3: Copy this template and fill in

```typescript
{
  id: 7, // Must be unique across ALL lessons
  unitId: 3, // Which unit this lesson belongs to
  title: 'Your Lesson Title',
  description: 'One-line description of what students will learn',
  icon: '📖', // Choose any emoji: 📖 📚 ✍️ 🎯 📝 💡 👥 ⚡ 🔤 etc
  slug: 'your-lesson-slug', // Used in URL, must be unique, use hyphens
  content: `
# Lesson Title
Your lesson content in markdown format...
  `,
  difficulty: 'easy',
  estimatedTime: 12,
}
```

## Content Format

Your `content` field supports markdown:

```typescript
content: `
# Main Heading
## Subheading

Regular paragraph text here.

- Bullet point 1
- Bullet point 2

❌ Wrong way to do something
✅ Right way to do something

### More Info
More paragraph text...
`
```

## Important Rules

### ID Rules
- Each lesson must have a **unique ID number** across the entire file
- Don't reuse IDs
- New lessons: just pick the next available ID

### Slug Rules
- Use lowercase
- Use hyphens instead of spaces
- No special characters
- Must be unique within the file
- Example: `present-simple-intro`, `subject-pronouns`

### Icon Choices
Use appropriate emojis:
- 📖 Book
- 📚 Books
- ✍️ Writing
- 🎯 Target/Goal
- 📝 Paper
- 💡 Idea/Tip
- 👥 People
- ⏰ Time
- 🔤 Grammar
- ⚡ Energy
- 🌅 Morning
- 🚀 Rocket

### Difficulty Levels
- `easy` - For basics, fundamentals
- `medium` - For intermediate concepts
- `hard` - For advanced topics

### Estimated Time
- Realistic time to read and process the lesson
- Include examples, reading time
- Don't underestimate - students will use this for planning

## Complete Example

```typescript
// Unit 5 Lessons
5: [
  {
    id: 25,
    unitId: 5,
    title: 'Perfect Tenses Overview',
    description: 'Introduction to present, past, and future perfect tenses',
    icon: '⏰',
    slug: 'perfect-tenses-overview',
    content: `
# Perfect Tenses Overview

## What Are Perfect Tenses?
Perfect tenses connect past events to present/future moments.

## Three Perfect Tenses
### Present Perfect
- Used for something that started in the past and continues to now
- Example: I have lived here for 5 years

### Past Perfect  
- Used for an action that happened before another past action
- Example: I had eaten before he arrived

### Future Perfect
- Actions that will be completed by a specific future time
- Example: I will have finished by tomorrow

## Key Differences
- Present Perfect: past → now
- Past Perfect: past → past
- Future Perfect: now → future

## Common Mistakes
❌ I have gone to school yesterday
✅ I went to school yesterday (use simple past with specific past time)

❌ He have lived here 10 years
✅ He has lived here for 10 years (use 'for' with duration)
    `,
    difficulty: 'medium',
    estimatedTime: 15,
  },
  {
    id: 26,
    unitId: 5,
    title: 'Present Perfect Practice',
    description: 'Common usage patterns and examples',
    icon: '✍️',
    slug: 'present-perfect-practice',
    content: `
# Present Perfect - Practice

## Form: Have/Has + Past Participle
- I have worked
- You have lived
- She has played
- They have learned

## Key Words & Phrases
- Just: I have just arrived
- Already: She has already left
- Yet: Have you finished yet?
- Ever: Have you ever been?
- Never: I have never seen

## Practice Exercises
1. She ___ (live) in Paris for 3 years
2. They ___ (finish) their homework
3. I ___ (visit) 10 countries
4. We ___ (know) each other since 2015

### Answers
1. lived → has lived
2. finish → have finished
3. visit → have visited
4. know → have known
    `,
    difficulty: 'medium',
    estimatedTime: 12,
  },
],
```

## How to View Your Lessons

After adding lessons:

1. **Navigate:** Learning → Expand Level → Unit → Click Unit Card
2. **View:** All lessons appear as clickable cards with:
   - Title
   - Description
   - Icon (emoji)
   - Difficulty badge (Easy/Medium/Hard)
   - Estimated time (⏱️ X min)
3. **Click:** Any lesson card opens the full lesson page

## Helper Functions

The system automatically provides:

```typescript
// Get all lessons for a unit
getLessonsByUnit(unitNumber)

// Get a single lesson by ID
getLessonById(unitNumber, lessonId)

// Get a lesson by slug
getLessonBySlug(slug)

// Get total lesson count
getLessonCount(unitNumber)
```

## Adding Lessons for Other Levels

Currently, lessons are set up for **Beginner level** only.

To add lessons for **Elementary, Pre-Intermediate, Intermediate, Upper-Intermediate**:

### Option 1: Extend Current File
```typescript
export const elementaryLessons: LessonsByUnit = {
  1: [ /* Elementary Unit 1 lessons */ ],
  2: [ /* Elementary Unit 2 lessons */ ],
  // ...
};
```

### Option 2: Create Separate Files
- `/src/data/lessons-elementary.ts`
- `/src/data/lessons-pre-intermediate.ts`
- Then import and merge in the unit page

### Option 3: Create a Combined Function
Update to use a switch statement based on level:

```typescript
export const getLessonsByLevel = (level: string, unitId: number) => {
  switch(level) {
    case 'beginner':
      return beginnerLessons[unitId];
    case 'elementary':
      return elementaryLessons[unitId];
    // ...
  }
};
```

## Next Steps

1. ✅ System is ready - lessons display on unit pages
2. 📝 Add lessons to Unit 1 by editing `/src/data/lessons.ts`
3. 🎯 Students can click each lesson to read it
4. 🚀 Add more lessons to other units
5. 📚 Later, you can add practice exercises, quizzes, or downloads

## Questions?

- Lessons appear here: `/learning/[level]/unit/unit-X`
- Each lesson has its own page at: `/learning/[level]/unit/unit-X/lesson/[slug]`
- All data flows from `/src/data/lessons.ts`
