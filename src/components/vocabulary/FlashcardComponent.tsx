'use client';

import { useState, useEffect } from 'react';
import type { VocabularyWord } from '@/data/vocabulary/types';

interface FlashcardComponentProps {
  word: VocabularyWord;
  onNext: () => void;
  onPrevious: () => void;
  currentIndex: number;
  totalWords: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  colorAccent: string;
  colorBg: string;
}

export default function FlashcardComponent({
  word,
  onNext,
  onPrevious,
  currentIndex,
  totalWords,
  canGoNext,
  canGoPrevious,
  colorAccent,
  colorBg,
}: FlashcardComponentProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Reset flip state when word changes
  useEffect(() => {
    setIsFlipped(false);
  }, [word.id]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-slate-700">
            Word {currentIndex + 1} of {totalWords}
          </span>
          <span className="text-xs text-slate-500">
            {Math.round(((currentIndex + 1) / totalWords) * 100)}% complete
          </span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / totalWords) * 100}%`,
              backgroundColor: colorAccent === 'text-emerald-600' 
                ? '#059669'
                : colorAccent === 'text-blue-600'
                ? '#2563eb'
                : colorAccent === 'text-purple-600'
                ? '#9333ea'
                : colorAccent === 'text-amber-600'
                ? '#d97706'
                : colorAccent === 'text-rose-600'
                ? '#e11d48'
                : '#6366f1',
            }}
          ></div>
        </div>
      </div>

      {/* Flashcard Container */}
      <div className="mb-8">
        <div
          className="perspective h-80 cursor-pointer"
          onClick={handleFlip}
          style={{
            perspective: '1000px',
          }}
        >
          <div
            className={`relative w-full h-full transition-transform duration-500 ${
              isFlipped ? '[transform:rotateY(180deg)]' : ''
            }`}
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front Side */}
            <div
              className={`absolute w-full h-full ${colorBg} border-2 ${colorAccent.replace('text-', 'border-')} rounded-xl p-8 flex flex-col items-center justify-center shadow-lg`}
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="text-center">
                <p className="text-sm text-slate-600 mb-4">Click to reveal meaning</p>
                <h2 className={`text-5xl font-bold ${colorAccent} mb-6`}>{word.word}</h2>

                {word.pronunciation && (
                  <p className="text-lg text-slate-600 font-mono mb-3">{word.pronunciation}</p>
                )}

                {word.partOfSpeech && (
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${colorBg} ${colorAccent}`}
                  >
                    {word.partOfSpeech}
                  </span>
                )}
              </div>
            </div>

            {/* Back Side */}
            <div
              className={`absolute w-full h-full ${colorBg} border-2 ${colorAccent.replace('text-', 'border-')} rounded-xl p-8 flex flex-col justify-start overflow-y-auto shadow-lg`}
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="space-y-5">
                {/* Definition */}
                <div>
                  <h3 className={`text-sm font-semibold ${colorAccent} uppercase tracking-wide mb-2`}>
                    Definition
                  </h3>
                  <p className="text-lg text-slate-800 leading-relaxed">{word.definition}</p>
                </div>

                {/* Synonyms */}
                {word.synonyms && word.synonyms.length > 0 && (
                  <div>
                    <h3 className={`text-sm font-semibold ${colorAccent} uppercase tracking-wide mb-2`}>
                      Synonyms
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {word.synonyms.map((synonym, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${colorBg} ${colorAccent} border ${colorAccent.replace('text-', 'border-')}`}
                        >
                          {synonym}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Example */}
                {word.example && (
                  <div>
                    <h3 className={`text-sm font-semibold ${colorAccent} uppercase tracking-wide mb-2`}>
                      Example
                    </h3>
                    <p className="text-slate-700 italic">"{word.example}"</p>
                  </div>
                )}

                {/* Uzbek Translation */}
                {word.uzbekTranslation && (
                  <div>
                    <h3 className={`text-sm font-semibold ${colorAccent} uppercase tracking-wide mb-2`}>
                      Uzbek
                    </h3>
                    <p className="text-slate-700 font-medium">{word.uzbekTranslation}</p>
                  </div>
                )}

                {/* Note */}
                {word.note && (
                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-xs text-slate-600 italic">{word.note}</p>
                  </div>
                )}

                <p className="text-xs text-slate-500 pt-2">Click to flip back</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
            canGoPrevious
              ? `${colorBg} ${colorAccent} hover:shadow-md cursor-pointer`
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          ← Previous
        </button>

        <div className={`px-4 py-2 rounded-lg ${colorBg} ${colorAccent} font-semibold text-sm`}>
          {currentIndex + 1} / {totalWords}
        </div>

        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
            canGoNext
              ? `${colorBg} ${colorAccent} hover:shadow-md cursor-pointer`
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          Next →
        </button>
      </div>

      {/* Keyboard Hint */}
      <p className="text-center text-xs text-slate-500 mt-6">
        💡 Tip: Click the card to flip, use arrow buttons to navigate
      </p>
    </div>
  );
}
