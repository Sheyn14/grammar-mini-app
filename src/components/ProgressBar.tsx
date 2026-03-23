'use client';

import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold text-gray-700">
          Question {current} of {total}
        </span>
        <span className="text-sm font-medium text-blue-600">
          {percentage.toFixed(0)}%
        </span>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden shadow-sm">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
