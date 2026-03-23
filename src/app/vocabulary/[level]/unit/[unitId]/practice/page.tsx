'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getTopicsByUnit, getTopicBySlug } from '@/data/vocabulary';
import { getLevelBySlug } from '@/data/levels';
import FlashcardComponent from '@/components/vocabulary/FlashcardComponent';
import type { VocabularyWord } from '@/data/vocabulary/types';

const colorMap: Record<
  string,
  {
    border: string;
    bg: string;
    icon: string;
    accent: string;
    lightBg: string;
    accentText: string;
  }
> = {
  beginner: {
    border: 'border-l-emerald-500',
    bg: 'bg-emerald-50',
    icon: 'bg-emerald-100',
    accent: 'text-emerald-600',
    lightBg: 'bg-emerald-100',
    accentText: 'text-emerald-600',
  },
  elementary: {
    border: 'border-l-blue-500',
    bg: 'bg-blue-50',
    icon: 'bg-blue-100',
    accent: 'text-blue-600',
    lightBg: 'bg-blue-100',
    accentText: 'text-blue-600',
  },
  'pre-intermediate': {
    border: 'border-l-purple-500',
    bg: 'bg-purple-50',
    icon: 'bg-purple-100',
    accent: 'text-purple-600',
    lightBg: 'bg-purple-100',
    accentText: 'text-purple-600',
  },
  intermediate: {
    border: 'border-l-amber-500',
    bg: 'bg-amber-50',
    icon: 'bg-amber-100',
    accent: 'text-amber-600',
    lightBg: 'bg-amber-100',
    accentText: 'text-amber-600',
  },
  'upper-intermediate': {
    border: 'border-l-rose-500',
    bg: 'bg-rose-50',
    icon: 'bg-rose-100',
    accent: 'text-rose-600',
    lightBg: 'bg-rose-100',
    accentText: 'text-rose-600',
  },
};

export default function VocabularyPracticePage() {
  const params = useParams() as unknown as { level: string; unitId: string };
  const { level, unitId } = params;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [levelData, setLevelData] = useState<any | null>(null);
  const [unitNumber, setUnitNumber] = useState(1);

  useEffect(() => {
    try {
      // Get level data
      const lData = getLevelBySlug(level);
      setLevelData(lData);

      // Get words for this unit (getTopicsByUnit now returns words directly)
      const words = getTopicsByUnit(level, unitId);
      setWords(words);
      setCurrentIndex(0); // Reset to first word

      // Parse unit number
      const unitNum = parseInt(unitId.replace('unit-', '')) || 1;
      setUnitNumber(unitNum);
    } catch (error) {
      console.error('Error loading vocabulary practice data:', error);
    } finally {
      setLoading(false);
    }
  }, [level, unitId]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex < words.length - 1) {
        return prevIndex + 1;
      }
      return prevIndex;
    });
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-slate-200 rounded w-1/3"></div>
            <div className="h-80 bg-slate-200 rounded-xl"></div>
            <div className="h-12 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/home/vocabulary`}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium mb-6 transition-colors"
          >
            ← Back to Vocabulary
          </Link>
          <div className="bg-white rounded-lg p-12 text-center border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">No words available</h2>
            <p className="text-slate-600">
              This unit doesn't have any vocabulary words yet. Please come back soon!
            </p>
          </div>
        </div>
      </div>
    );
  }

  const colors = colorMap[level as keyof typeof colorMap] || colorMap.beginner;
  const currentWord = words[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href={`/home/vocabulary`}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium mb-8 transition-colors"
        >
          ← Back to Vocabulary
        </Link>

        {/* Header */}
        <div className={`${colors.bg} border-l-4 ${colors.border} rounded-lg p-6 mb-12`}>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">
            Vocabulary Practice - Unit {unitNumber}
          </h1>
          <p className="text-slate-600">
            {levelData?.title || levelData?.level} Level • Flashcard Mode
          </p>
          <p className="text-slate-700 mt-2">
            Click the card to flip and reveal the meaning. {words.length} word
            {words.length !== 1 ? 's' : ''} to learn.
          </p>
        </div>

        {/* Flashcard Component */}
        <FlashcardComponent
          key={currentWord.id}
          word={currentWord}
          onNext={handleNext}
          onPrevious={handlePrevious}
          currentIndex={currentIndex}
          totalWords={words.length}
          canGoNext={currentIndex < words.length - 1}
          canGoPrevious={currentIndex > 0}
          colorAccent={colors.accentText}
          colorBg={colors.lightBg}
        />

        {/* Completion Message */}
        {currentIndex === words.length - 1 && (
          <div className={`mt-12 p-6 rounded-lg ${colors.bg} border-l-4 ${colors.border}`}>
            <p className="text-center text-slate-700 font-semibold">
              🎉 You've reached the end of this unit's vocabulary! Great job!
            </p>
            <div className="flex gap-4 mt-4">
              <Link
                href={`/home/vocabulary`}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold text-center transition-all duration-200 ${colors.bg} ${colors.accentText} hover:shadow-md`}
              >
                Back to Vocabulary
              </Link>
              <Link
                href={`/home`}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold text-center transition-all duration-200 bg-slate-200 text-slate-900 hover:bg-slate-300`}
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
