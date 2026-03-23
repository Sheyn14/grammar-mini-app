/**
 * Main Vocabulary Index
 * 
 * This is the central export point for the entire vocabulary system.
 * All vocabulary data flows through this file.
 */

import type { VocabularyUnit, VocabularyWord } from './types';
import { beginnerUnits } from './beginner';
import { elementaryUnits } from './elementary';
import { preIntermediateUnits } from './pre-intermediate';
import { intermediateUnits } from './intermediate';
import { upperIntermediateUnits } from './upper-intermediate';

/**
 * All vocabulary levels and their units
 */
export const allLevels = {
  beginner: {
    levelId: 'beginner',
    title: 'Beginner',
    units: beginnerUnits,
  },
  elementary: {
    levelId: 'elementary',
    title: 'Elementary',
    units: elementaryUnits,
  },
  'pre-intermediate': {
    levelId: 'pre-intermediate',
    title: 'Pre-Intermediate',
    units: preIntermediateUnits,
  },
  intermediate: {
    levelId: 'intermediate',
    title: 'Intermediate',
    units: intermediateUnits,
  },
  'upper-intermediate': {
    levelId: 'upper-intermediate',
    title: 'Upper-Intermediate',
    units: upperIntermediateUnits,
  },
};

/**
 * Get all vocabulary levels
 */
export const getVocabularyLevels = () => {
  return Object.values(allLevels).map(level => ({
    levelId: level.levelId,
    title: level.title,
    unitCount: level.units.length,
  }));
};

/**
 * Get all units for a specific level
 */
export const getVocabularyUnitsByLevel = (levelId: string): VocabularyUnit[] => {
  const levelData = allLevels[levelId as keyof typeof allLevels];
  return levelData ? levelData.units : [];
};

/**
 * Get a specific unit by level and unit ID
 */
export const getVocabularyUnit = (levelId: string, unitId: string): VocabularyUnit | null => {
  const units = getVocabularyUnitsByLevel(levelId);
  return units.find(unit => unit.unitId === unitId) || null;
};

/**
 * Get all words in a unit
 */
export const getVocabularyWords = (levelId: string, unitId: string): VocabularyWord[] => {
  const unit = getVocabularyUnit(levelId, unitId);
  return unit ? unit.words : [];
};

/**
 * Get a specific word by ID
 */
export const getWordById = (levelId: string, unitId: string, wordId: string): VocabularyWord | null => {
  const words = getVocabularyWords(levelId, unitId);
  return words.find(word => word.id === wordId) || null;
};

/**
 * Search for words across all levels
 * @param query - Search string
 * @returns Array of matching words
 */
export const searchVocabulary = (query: string): VocabularyWord[] => {
  const results: VocabularyWord[] = [];
  Object.values(allLevels).forEach(level => {
    level.units.forEach(unit => {
      unit.words.forEach(word => {
        if (
          word.word.toLowerCase().includes(query.toLowerCase()) ||
          word.uzbekTranslation.toLowerCase().includes(query.toLowerCase())
        ) {
          results.push(word);
        }
      });
    });
  });
  return results;
};

/**
 * BACKWARD COMPATIBILITY: Get topics (words) for a specific unit
 * Maps to the new system where words are stored directly in units
 */
export const getTopicsByUnit = (level: string, unitId: string): VocabularyWord[] => {
  return getVocabularyWords(level, unitId);
};

/**
 * BACKWARD COMPATIBILITY: Get a topic by slug from a specific level
 * This is no longer used in the new system but kept for compatibility
 */
export const getTopicBySlug = (level: string, slug: string): VocabularyWord | null => {
  // Find word by approximate match since we no longer have topic slugs
  const words = getVocabularyUnitsByLevel(level)
    .flatMap(unit => unit.words)
    .find(word => word.word.toLowerCase() === slug.toLowerCase() || word.id === slug);
  return words || null;
};

// Re-export types
export type { VocabularyUnit, VocabularyWord } from './types';
