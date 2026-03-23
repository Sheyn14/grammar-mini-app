import { LevelInfo, UnitInfo, TestData } from './types';

/**
 * LEVEL DEFINITIONS
 * Contains all 5 proficiency levels with their unit counts
 */
export const levels: LevelInfo[] = [
  {
    id: 1,
    level: 'Beginner',
    slug: 'beginner',
    title: 'Beginner',
    description: 'Start your English journey with basics',
    icon: '🌱',
    color: 'from-green-800 to-green-950',
    unitCount: 14,
  },
  {
    id: 2,
    level: 'Elementary',
    slug: 'elementary',
    title: 'Elementary',
    description: 'Build fundamental English skills',
    icon: '📚',
    color: 'from-blue-800 to-blue-950',
    unitCount: 12,
  },
  {
    id: 3,
    level: 'Pre-Intermediate',
    slug: 'pre-intermediate',
    title: 'Pre-Intermediate',
    description: 'Develop intermediate language abilities',
    icon: '🎯',
    color: 'from-purple-800 to-purple-950',
    unitCount: 12,
  },
  {
    id: 4,
    level: 'Intermediate',
    slug: 'intermediate',
    title: 'Intermediate',
    description: 'Master intermediate English grammar',
    icon: '⭐',
    color: 'from-amber-800 to-amber-950',
    unitCount: 12,
  },
  {
    id: 5,
    level: 'Upper-Intermediate',
    slug: 'upper-intermediate',
    title: 'Upper-Intermediate',
    description: 'Approach advanced English proficiency',
    icon: '🚀',
    color: 'from-red-800 to-red-950',
    unitCount: 12,
  },
];

/**
 * UNIT DEFINITIONS BY LEVEL
 * Helper function to get units for a specific level
 */
const getUnitsForLevel = (level: string, unitCount: number): UnitInfo[] => {
  const units: UnitInfo[] = [];
  for (let i = 1; i <= unitCount; i++) {
    units.push({
      id: i,
      unit: i,
      title: `Unit ${i}`,
      description: `${level} - Unit ${i}`,
      icon: '📖',
      testCount: 1,
    });
  }
  return units;
};

/**
 * Get all units for a specific level
 */
export const getUnitsByLevel = (levelSlug: string): UnitInfo[] => {
  const level = levels.find(l => l.slug === levelSlug);
  if (!level) return [];
  return getUnitsForLevel(level.level, level.unitCount);
};

/**
 * TEST DATA STRUCTURE
 * 
 * IMPORTANT - INSTRUCTIONS FOR ADDING QUESTIONS:
 * ================================================
 * 
 * To add a real test for a unit, find the appropriate section below and replace
 * the placeholder test data with your questions. Follow this pattern:
 * 
 * Example - to add test data for Beginner Unit 1:
 * 
 * {
 *   id: 1,
 *   level: 'Beginner',
 *   unit: 1,
 *   title: 'Unit 1: Present Simple',
 *   description: 'Learn how to use present simple tense',
 *   icon: '🌅',
 *   questions: [
 *     {
 *       id: 1,
 *       question: 'I .... to school every day.',
 *       options: { a: 'go', b: 'went', c: 'gone', d: 'am going' },
 *       correct: 'a',
 *       explanation: 'Use simple present for daily habits.'
 *     },
 *     // Add more questions here...
 *   ]
 * }
 * 
 * Each test should have 5-12 questions.
 * Copy the placeholder structure and fill in your questions.
 */

// === BEGINNER LEVEL (14 UNITS) ===
const beginnerTests: TestData[] = [
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
  {
    id: 2,
    level: 'Beginner',
    unit: 2,
    title: 'Unit 2: Personal Information',
    description: 'Talk about yourself and others',
    icon: '👤',
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
  {
    id: 3,
    level: 'Beginner',
    unit: 3,
    title: 'Unit 3: Numbers & Counting',
    description: 'Numbers from 1 to 100',
    icon: '#️⃣',
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
  {
    id: 4,
    level: 'Beginner',
    unit: 4,
    title: 'Unit 4: Days & Time',
    description: 'Days of the week and telling time',
    icon: '⏰',
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
  {
    id: 5,
    level: 'Beginner',
    unit: 5,
    title: 'Unit 5: Colors & Shapes',
    description: 'Colors and basic shapes vocabulary',
    icon: '🎨',
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
  {
    id: 6,
    level: 'Beginner',
    unit: 6,
    title: 'Unit 6: Family Members',
    description: 'Family relationships and vocabulary',
    icon: '👨‍👩‍👧‍👦',
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
  {
    id: 7,
    level: 'Beginner',
    unit: 7,
    title: 'Unit 7: Food & Drinks',
    description: 'Common foods and beverages',
    icon: '🍎',
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
  {
    id: 8,
    level: 'Beginner',
    unit: 8,
    title: 'Unit 8: Animals',
    description: 'Animal names and characteristics',
    icon: '🐶',
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
  {
    id: 9,
    level: 'Beginner',
    unit: 9,
    title: 'Unit 9: Clothes',
    description: 'Clothing and accessories',
    icon: '👕',
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
  {
    id: 10,
    level: 'Beginner',
    unit: 10,
    title: 'Unit 10: House & Rooms',
    description: 'Parts of a house and furniture',
    icon: '🏠',
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
  {
    id: 11,
    level: 'Beginner',
    unit: 11,
    title: 'Unit 11: Transportation',
    description: 'Vehicles and ways to travel',
    icon: '🚗',
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
  {
    id: 12,
    level: 'Beginner',
    unit: 12,
    title: 'Unit 12: Weather',
    description: 'Weather conditions and seasons',
    icon: '⛅',
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
  {
    id: 13,
    level: 'Beginner',
    unit: 13,
    title: 'Unit 13: School Subjects',
    description: 'Academic subjects and learning',
    icon: '📝',
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
  {
    id: 14,
    level: 'Beginner',
    unit: 14,
    title: 'Unit 14: Sports & Hobbies',
    description: 'Activities and pastimes',
    icon: '⚽',
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
];

// === ELEMENTARY LEVEL (12 UNITS) ===
const elementaryTests: TestData[] = [
  {
    id: 101,
    level: 'Elementary',
    unit: 1,
    title: 'Unit 1: Present Simple Tense',
    description: 'Daily habits and routines',
    icon: '🌅',
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
  {
    id: 102,
    level: 'Elementary',
    unit: 2,
    title: 'Unit 2: Present Continuous',
    description: 'Actions happening now',
    icon: '⏳',
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
  {
    id: 103,
    level: 'Elementary',
    unit: 3,
    title: 'Unit 3: Past Simple Tense',
    description: 'Completed actions in the past',
    icon: '📅',
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
  {
    id: 104,
    level: 'Elementary',
    unit: 4,
    title: 'Unit 4: Questions & Answers',
    description: 'Forming questions correctly',
    icon: '❓',
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
  {
    id: 105,
    level: 'Elementary',
    unit: 5,
    title: 'Unit 5: Adjectives & Adverbs',
    description: 'Describing words and how things are done',
    icon: '✨',
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
  {
    id: 106,
    level: 'Elementary',
    unit: 6,
    title: 'Unit 6: Countable & Uncountable',
    description: 'Understanding noun types',
    icon: '🎯',
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
  {
    id: 107,
    level: 'Elementary',
    unit: 7,
    title: 'Unit 7: Articles (A, An, The)',
    description: 'Using articles correctly',
    icon: '📰',
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
  {
    id: 108,
    level: 'Elementary',
    unit: 8,
    title: 'Unit 8: Prepositions',
    description: 'Understanding location and time prepositions',
    icon: '📍',
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
  {
    id: 109,
    level: 'Elementary',
    unit: 9,
    title: 'Unit 9: There is / There are',
    description: 'Existence and quantity',
    icon: '🎪',
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
  {
    id: 110,
    level: 'Elementary',
    unit: 10,
    title: 'Unit 10: Possessives',
    description: 'Showing ownership and relationships',
    icon: '🔑',
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
  {
    id: 111,
    level: 'Elementary',
    unit: 11,
    title: 'Unit 11: Comparatives',
    description: 'Comparing two things',
    icon: '⚖️',
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
  {
    id: 112,
    level: 'Elementary',
    unit: 12,
    title: 'Unit 12: Superlatives',
    description: 'Describing extremes',
    icon: '👑',
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
];

// === PRE-INTERMEDIATE LEVEL (12 UNITS) ===
const preIntermediateTests: TestData[] = Array.from({ length: 12 }, (_, i) => ({
  id: 201 + i,
  level: 'Pre-Intermediate',
  unit: i + 1,
  title: `Unit ${i + 1}: Grammar Topic`,
  description: `Pre-Intermediate level - Unit ${i + 1}`,
  icon: '🎯',
  questions: [
    {
      id: 1,
      question: 'PLACEHOLDER: Replace with your question',
      options: { a: 'option a', b: 'option b', c: 'option c', d: 'option d' },
      correct: 'a',
      explanation: 'This is a placeholder. Replace with your explanation.',
    },
  ],
}));

// === INTERMEDIATE LEVEL (12 UNITS) ===
const intermediateTests: TestData[] = Array.from({ length: 12 }, (_, i) => ({
  id: 301 + i,
  level: 'Intermediate',
  unit: i + 1,
  title: `Unit ${i + 1}: Grammar Topic`,
  description: `Intermediate level - Unit ${i + 1}`,
  icon: '⭐',
  questions: [
    {
      id: 1,
      question: 'PLACEHOLDER: Replace with your question',
      options: { a: 'option a', b: 'option b', c: 'option c', d: 'option d' },
      correct: 'a',
      explanation: 'This is a placeholder. Replace with your explanation.',
    },
  ],
}));

// === UPPER-INTERMEDIATE LEVEL (12 UNITS) ===
const upperIntermediateTests: TestData[] = Array.from({ length: 12 }, (_, i) => ({
  id: 401 + i,
  level: 'Upper-Intermediate',
  unit: i + 1,
  title: `Unit ${i + 1}: Grammar Topic`,
  description: `Upper-Intermediate level - Unit ${i + 1}`,
  icon: '🚀',
  questions: [
    {
      id: 1,
      question: 'PLACEHOLDER: Replace with your question',
      options: { a: 'option a', b: 'option b', c: 'option c', d: 'option d' },
      correct: 'a',
      explanation: 'This is a placeholder. Replace with your explanation.',
    },
  ],
}));

/**
 * ALL TEST DATA COMBINED
 */
const allTests = [
  ...beginnerTests,
  ...elementaryTests,
  ...preIntermediateTests,
  ...intermediateTests,
  ...upperIntermediateTests,
];

/**
 * Get a specific test for a level and unit
 */
export const getTestByLevelAndUnit = (levelSlug: string, unit: number): TestData | undefined => {
  return allTests.find(test => {
    const testLevel = levels.find(l => l.slug === levelSlug);
    return testLevel && test.level === testLevel.level && test.unit === unit;
  });
};

/**
 * Get all tests for a specific level
 */
export const getTestsByLevel = (levelSlug: string): TestData[] => {
  const level = levels.find(l => l.slug === levelSlug);
  if (!level) return [];
  return allTests.filter(test => test.level === level.level);
};

/**
 * Get all levels
 */
export const getAllLevels = (): LevelInfo[] => {
  return levels;
};

/**
 * Get a specific level by slug
 */
export const getLevelBySlug = (slug: string): LevelInfo | undefined => {
  return levels.find(l => l.slug === slug);
};
