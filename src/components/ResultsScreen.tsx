'use client';

import React from 'react';
import { Question } from '@/data/types';

interface ResultsScreenProps {
  score: number;
  total: number;
  questions: Question[];
  answers: Record<number, 'a' | 'b' | 'c' | 'd' | null>;
  onRestart: () => void;
  topicTitle?: string;
  topicIcon?: string;
  testContext?: {
    level: string;
    unit: string;
  };
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  score,
  total,
  questions,
  answers,
  onRestart,
  topicTitle,
  topicIcon,
  testContext,
}) => {
  const percentage = Math.round((score / total) * 100);

  const getScoreColor = (percentage: number): string => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeColor = (percentage: number): string => {
    if (percentage >= 80) return 'bg-green-50 border-green-200';
    if (percentage >= 60) return 'bg-blue-50 border-blue-200';
    if (percentage >= 40) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 pb-8">
      <div className="max-w-2xl mx-auto">
        {/* Topic Header */}
        {topicIcon && topicTitle && (
          <div className="mb-6 p-4 bg-white rounded-lg border border-slate-200">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{topicIcon}</span>
              <div>
                <p className="text-sm text-slate-600">Quiz completed:</p>
                <h3 className="text-lg font-bold text-slate-900">{topicTitle}</h3>
                {testContext && (
                  <p className="text-xs text-slate-500 mt-1">
                    {testContext.level} • {testContext.unit}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Score Header */}
        <div className="text-center mb-8 animate-fadeIn">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Complete! 🎉</h2>

          <div className={`inline-block p-8 rounded-3xl border-2 ${getScoreBadgeColor(percentage)} shadow-lg`}>
            <p className="text-base font-semibold text-gray-600 mb-2">Your Score</p>
            <p className={`text-6xl font-bold ${getScoreColor(percentage)}`}>
              {score}/{total}
            </p>
            <p className={`text-2xl font-semibold ${getScoreColor(percentage)} mt-2`}>
              {percentage}%
            </p>
          </div>

          {/* Performance Message */}
          <div className="mt-6">
            {percentage >= 80 && (
              <p className="text-xl font-semibold text-green-700">
                Excellent work! You've mastered Present Simple! 🌟
              </p>
            )}
            {percentage >= 60 && percentage < 80 && (
              <p className="text-xl font-semibold text-blue-700">
                Great job! Keep practicing to improve further. 📚
              </p>
            )}
            {percentage >= 40 && percentage < 60 && (
              <p className="text-xl font-semibold text-yellow-700">
                Good effort! Review the explanations and try again. 💪
              </p>
            )}
            {percentage < 40 && (
              <p className="text-xl font-semibold text-red-700">
                Keep learning! Take the quiz again to improve. 🔄
              </p>
            )}
          </div>
        </div>

        {/* Answer Review */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Answer Review</h3>

          <div className="space-y-3">
            {questions.map((question) => {
              const userAnswer = answers[question.id];
              const isCorrect = userAnswer === question.correct;

              return (
                <div
                  key={question.id}
                  className={`p-4 rounded-xl border-2 ${
                    isCorrect
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  {/* Question Number */}
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        isCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      {isCorrect ? '✓' : '✗'}
                    </div>

                    <div className="flex-1">
                      {/* Question Text */}
                      <p className="font-semibold text-gray-900 mb-2">
                        Q{question.id}: {question.question}
                      </p>

                      {/* User Answer */}
                      <p className="text-sm text-gray-700 mb-1">
                        <span className="font-semibold">Your answer:</span>{' '}
                        {userAnswer
                          ? `${userAnswer.toUpperCase()}. ${question.options[userAnswer]}`
                          : 'Not answered'}
                      </p>

                      {/* Correct Answer (if wrong) */}
                      {!isCorrect && (
                        <p className="text-sm text-green-700 mb-2">
                          <span className="font-semibold">Correct answer:</span> {question.correct.toUpperCase()}.{' '}
                          {question.options[question.correct]}
                        </p>
                      )}

                      {/* Explanation */}
                      <p className="text-sm text-gray-600 italic mt-2">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Restart Button */}
        <button
          onClick={onRestart}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 text-lg"
        >
          Try Again
        </button>

        {/* Share Stats (for future integration) */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Share your score with friends to challenge them! 🚀
        </p>
      </div>
    </div>
  );
};
