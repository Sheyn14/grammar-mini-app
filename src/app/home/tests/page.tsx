'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { levels } from '@/data/levels';
import Link from 'next/link';

export default function TestsPage() {
  const { loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [expandedLevel, setExpandedLevel] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading tests...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Color mapping for levels
  const colorMap: Record<string, { border: string; bg: string; icon: string; accent: string; lightBg: string }> = {
    'beginner': { border: 'border-l-emerald-500', bg: 'bg-emerald-50', icon: 'bg-emerald-100', accent: 'text-emerald-600', lightBg: 'bg-emerald-100' },
    'elementary': { border: 'border-l-blue-500', bg: 'bg-blue-50', icon: 'bg-blue-100', accent: 'text-blue-600', lightBg: 'bg-blue-100' },
    'pre-intermediate': { border: 'border-l-purple-500', bg: 'bg-purple-50', icon: 'bg-purple-100', accent: 'text-purple-600', lightBg: 'bg-purple-100' },
    'intermediate': { border: 'border-l-amber-500', bg: 'bg-amber-50', icon: 'bg-amber-100', accent: 'text-amber-600', lightBg: 'bg-amber-100' },
    'upper-intermediate': { border: 'border-l-rose-500', bg: 'bg-rose-50', icon: 'bg-rose-100', accent: 'text-rose-600', lightBg: 'bg-rose-100' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-16 mt-4 sm:mt-8">
          {/* Back Button */}
          <button
            onClick={() => router.push('/home')}
            className="mb-8 inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors"
          >
            <span className="mr-2">←</span>
            <span className="font-semibold">Back to Home</span>
          </button>

          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl mb-4">
              <span className="text-4xl">✍️</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-3 tracking-tight">
              Unit Tests
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
              Take tests for each unit organized by your proficiency level
            </p>
          </div>
        </div>

        {/* Tests Organized by Level */}
        <div className="space-y-6 mb-16">
          {levels.map((level) => {
            const colors = colorMap[level.slug] || colorMap['beginner'];
            const isExpanded = expandedLevel === level.slug;

            return (
              <div key={level.id} className={`${colors.border} border-l-4 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all`}>
                {/* Level Header - Clickable */}
                <button
                  onClick={() => setExpandedLevel(isExpanded ? null : level.slug)}
                  className="w-full p-6 sm:p-8 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`${colors.icon} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <span className="text-2xl">{level.icon}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">{level.title}</h2>
                      <p className="text-sm text-slate-600 mt-1">{level.description}</p>
                    </div>
                  </div>
                  <div className={`flex-shrink-0 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                    <span className={`text-2xl ${colors.accent}`}>▼</span>
                  </div>
                </button>

                {/* Units List - Expandable */}
                {isExpanded && (
                  <div className="border-t border-slate-200 p-6 sm:p-8 bg-slate-50">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Array.from({ length: level.unitCount }, (_, i) => {
                        const unitNumber = i + 1;
                        const unitId = `${level.level.toLowerCase().replace(/ /g, '-')}-${unitNumber}`;
                        return (
                          <Link
                            key={unitNumber}
                            href={`/quiz/${unitId}`}
                            className="group"
                          >
                            <div className={`
                              h-full bg-white rounded-lg p-4
                              border-2 border-slate-200
                              hover:border-slate-300 hover:shadow-md
                              transition-all duration-300
                              hover:-translate-y-1
                              cursor-pointer
                            `}>
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-bold text-slate-900">Unit {unitNumber}</h3>
                                  <p className="text-xs text-slate-600 mt-1">{level.title}</p>
                                </div>
                                <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                              </div>
                              <div className={`mt-3 inline-block px-2 py-1 rounded text-xs font-semibold ${colors.accent} ${colors.lightBg} bg-opacity-20`}>
                                Take Test
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="text-center text-slate-500 text-sm sm:text-base">
          <p>Select a level above to see and take unit tests</p>
        </div>
      </div>
    </div>
  );
}
