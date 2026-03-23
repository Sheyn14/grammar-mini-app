/**
 * Main lesson aggregator and helper functions
 * 
 * This file:
 * 1. Imports lessons from all level folders
 * 2. Aggregates them into a single data structure
 * 3. Exports helper functions to query lessons
 * 4. Maintains backward compatibility with existing imports
 */

import { Lesson, LessonsByUnit } from './types';
import { beginnerLessons } from './beginner';
import { elementaryLessons } from './elementary';
import { preIntermediateLessons } from './pre-intermediate';
import { intermediateLessons } from './intermediate';
import { upperIntermediateLessons } from './upper-intermediate';
import { advancedLessons } from './advanced';

/**
 * All lessons organized by level and unit
 * Map: levelSlug -> LessonsByUnit
 */
const allLessonsByLevel: Record<string, LessonsByUnit> = {
  beginner: beginnerLessons,
  elementary: elementaryLessons,
  'pre-intermediate': preIntermediateLessons,
  intermediate: intermediateLessons,
  'upper-intermediate': upperIntermediateLessons,
  advanced: advancedLessons,
};

/**
 * Get all lessons for a specific unit
 * For backward compatibility with existing code
 * 
 * Note: Currently only searches in beginner level
 * Pass level parameter if you need lessons from other levels
 */
export const getLessonsByUnit = (unitId: number, level: string = 'beginner'): Lesson[] => {
  const levelLessons = allLessonsByLevel[level];
  return levelLessons?.[unitId] || [];
};

/**
 * Get a single lesson by slug and optional level
 * If no level is provided, searches all levels
 */
export const getLessonBySlug = (slug: string, level?: string): Lesson | undefined => {
  // If level is provided, search only that level
  if (level) {
    const levelLessons = allLessonsByLevel[level];
    if (!levelLessons) return undefined;
    
    for (const unit of Object.values(levelLessons)) {
      const lesson = (unit as Lesson[]).find((l: Lesson) => l.slug === slug);
      if (lesson) return lesson;
    }
    return undefined;
  }

  // Search all levels if no specific level provided
  for (const levelLessons of Object.values(allLessonsByLevel)) {
    for (const unit of Object.values(levelLessons)) {
      const lesson = (unit as Lesson[]).find((l: Lesson) => l.slug === slug);
      if (lesson) return lesson;
    }
  }
  
  return undefined;
};

/**
 * Get a single lesson by unit and lesson ID
 */
export const getLessonById = (
  unitId: number,
  lessonId: number,
  level: string = 'beginner'
): Lesson | undefined => {
  const lessons = getLessonsByUnit(unitId, level);
  return lessons.find((lesson) => lesson.id === lessonId);
};

/**
 * Get total lesson count for a unit
 */
export const getLessonCount = (unitId: number, level: string = 'beginner'): number => {
  return getLessonsByUnit(unitId, level).length;
};

/**
 * Get all lessons for a specific level
 * Returns a flat array of all lessons in that level
 */
export const getLessonsByLevel = (level: string): Lesson[] => {
  const levelLessons = allLessonsByLevel[level];
  if (!levelLessons) return [];
  
  const allLessons: Lesson[] = [];
  for (const unit of Object.values(levelLessons)) {
    allLessons.push(...(unit as Lesson[]));
  }
  return allLessons;
};

/**
 * Get all available levels with at least one lesson
 */
export const getAvailableLevels = (): string[] => {
  return Object.keys(allLessonsByLevel).filter(
    (level) => getLessonsByLevel(level).length > 0
  );
};

/**
 * Re-export types for convenience
 */
export type { Lesson, LessonsByUnit } from './types';
