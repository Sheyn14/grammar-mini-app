'use client';

import React from 'react';

interface HomeScreenProps {
  onStart: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fadeIn">
        {/* Header Card */}
        <div className="text-center mb-12">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <span className="text-4xl">📚</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Grammar Mastery
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-2">
            Test your English grammar skills
          </p>

          {/* Description */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <p className="text-gray-700 mb-3">
              ✓ 5 proficiency levels
            </p>
            <p className="text-gray-700 mb-3">
              ✓ 62 total units
            </p>
            <p className="text-gray-700">
              ✓ Detailed explanations for every answer
            </p>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 text-lg"
        >
          Start Quiz
        </button>

        {/* Footer Info */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Takes about 5-10 minutes to complete
        </p>
      </div>
    </div>
  );
};
