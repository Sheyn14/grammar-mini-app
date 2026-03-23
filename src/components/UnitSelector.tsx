'use client';

import React, { useEffect, useState } from 'react';
import { LevelInfo, UnitInfo } from '@/data/types';
import { getUserProgress, ProgressRecord } from '@/lib/progress';

interface UnitSelectorProps {
  level: LevelInfo;
  units: UnitInfo[];
  onSelectUnit: (unit: UnitInfo) => void;
  onBack?: () => void;
}

export const UnitSelector: React.FC<UnitSelectorProps> = ({
  level,
  units,
  onSelectUnit,
  onBack,
}) => {
  const [progress, setProgress] = useState<ProgressRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const userProgress = await getUserProgress();
        const levelProgress = userProgress.filter(p => p.level === level.level);
        setProgress(levelProgress);
      } catch (error) {
        console.error('Error loading progress:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [level.level]);

  const isUnitCompleted = (unit: number): ProgressRecord | undefined => {
    return progress.find(p => p.unit === unit);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 pt-8 animate-fadeIn">
          {onBack && (
            <button
              onClick={onBack}
              className="mb-6 inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <span className="text-xl">←</span>
              <span className="text-sm font-medium">Back to Levels</span>
            </button>
          )}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{level.icon}</span>
            <h1 className="text-4xl font-bold text-slate-900">{level.title}</h1>
          </div>
          <p className="text-lg text-slate-600">{level.description}</p>
          <p className="text-sm text-gray-600 mt-2">
            Completed: <span className="font-bold">{progress.length}</span> / {units.length} units
          </p>
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {units.map((unit, index) => {
            const completed = isUnitCompleted(unit.unit);

            return (
              <div
                key={unit.id}
                className="animate-slideIn"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <button
                  onClick={() => onSelectUnit(unit)}
                  className={`w-full h-full p-6 rounded-2xl border shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 text-left group relative overflow-hidden ${
                    completed
                      ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-300'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {/* Gradient accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${level.color}`}></div>

                  {/* Completion Badge */}
                  {completed && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <span>✓</span>
                      <span>{completed.percentage}%</span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {unit.icon}
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold mb-2 text-gray-900">{unit.title}</h2>

                  {/* Description */}
                  <p className="text-sm mb-4 text-gray-600">{unit.description}</p>

                  {/* Test Count & Score */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-semibold text-gray-700">
                        {unit.testCount} test
                      </span>
                      {completed && (
                        <p className="text-xs text-green-700 font-semibold mt-1">
                          Score: {completed.score}/{completed.total_questions}
                        </p>
                      )}
                    </div>
                    <span className="text-lg text-gray-600 group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Stats Footer */}
        <div className="text-center py-8 border-t border-slate-200">
          <p className="text-slate-600 text-sm">
            {units.length} units in {level.title}
          </p>
        </div>
      </div>
    </div>
  );
};
