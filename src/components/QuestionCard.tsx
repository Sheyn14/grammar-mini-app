'use client';

import React from 'react';
import { Question } from '@/data/types';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: 'a' | 'b' | 'c' | 'd' | null;
  onSelectAnswer: (answer: 'a' | 'b' | 'c' | 'd') => void;
  isAnswered: boolean;
}

const optionLabels = {
  a: 'A',
  b: 'B',
  c: 'C',
  d: 'D',
};

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  isAnswered,
}) => {
  const getButtonStyle = (option: 'a' | 'b' | 'c' | 'd') => {
    const isSelected = selectedAnswer === option;
    const isCorrect = isAnswered && option === question.correct;
    const isWrong = isAnswered && isSelected && option !== question.correct;

    if (isCorrect) {
      return 'border-2 border-green-500 bg-green-50 ring-2 ring-green-200';
    }
    if (isWrong) {
      return 'border-2 border-red-500 bg-red-50 ring-2 ring-red-200';
    }
    if (isSelected && !isAnswered) {
      return 'border-2 border-blue-500 bg-blue-50 ring-2 ring-blue-200';
    }
    return 'border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50';
  };

  return (
    <div className="w-full animate-slideIn">
      {/* Question Text */}
      <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
        <p className="text-xl font-semibold text-gray-900 leading-relaxed">
          {question.question}
        </p>
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {(['a', 'b', 'c', 'd'] as const).map((option) => (
          <button
            key={option}
            onClick={() => !isAnswered && onSelectAnswer(option)}
            disabled={isAnswered}
            className={`w-full p-4 rounded-xl font-semibold text-base text-left transition-all duration-200 flex items-center gap-4 ${getButtonStyle(
              option
            )} ${isAnswered ? 'cursor-not-allowed' : 'cursor-pointer active:scale-95'}`}
          >
            {/* Option Label */}
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-700">
              {optionLabels[option]}
            </div>

            {/* Option Text */}
            <span className="flex-1 text-gray-800">{question.options[option]}</span>

            {/* Result Indicator */}
            {isAnswered && option === question.correct && (
              <span className="text-2xl">✓</span>
            )}
            {isAnswered && selectedAnswer === option && option !== question.correct && (
              <span className="text-2xl">✗</span>
            )}
          </button>
        ))}
      </div>

      {/* Explanation */}
      {isAnswered && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl animate-slideIn">
          <p className="text-sm font-semibold text-blue-900 mb-2">💡 Explanation</p>
          <p className="text-sm text-blue-800 leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
};
