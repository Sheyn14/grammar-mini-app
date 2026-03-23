/**
 * Shared TypeScript types for lesson data
 * Used across all levels
 */

export interface Lesson {
  id: number;
  unitId: number;
  title: string;
  description: string;
  icon: string;
  slug: string;
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // in minutes
}

export interface LessonsByUnit {
  [unitId: number]: Lesson[];
}

export interface LevelLessons {
  level: string;
  lessons: LessonsByUnit;
}
