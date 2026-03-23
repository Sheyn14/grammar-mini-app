'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { levels, getUnitsByLevel } from '@/data/levels';

export default function VocabularyPage() {
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading vocabulary...</p>
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl mb-4">
              <span className="text-4xl">📖</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-3 tracking-tight">
              Vocabulary Builder
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
              Expand your vocabulary through structured levels and thematic units
            </p>
          </div>
        </div>

        {/* Levels Organized by Level */}
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
                    <p className="text-sm font-semibold text-slate-600 mb-4">Units in this level:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {Array.from({ length: level.unitCount }, (_, i) => {
                        const unitNumber = i + 1;
                        const unitSlug = `unit-${unitNumber}`;
                        return (
                          <Link
                            key={unitNumber}
                            href={`/vocabulary/${level.slug}/unit/${unitSlug}`}
                            className="group"
                          >
                            <div
                              className={`
                                w-full
                                px-4 py-4
                                rounded-lg
                                border-2 border-slate-200
                                bg-white
                                text-center
                                transition-all duration-200
                                hover:shadow-md
                                hover:scale-105
                                active:scale-95
                                cursor-pointer
                              `}
                              style={{
                                borderColor: 'currentColor',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = `var(--color-accent)`;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'rgb(226, 232, 240)';
                              }}
                            >
                              <div className="flex flex-col items-center gap-2">
                                <span className={`text-sm font-bold ${colors.accent}`}>Unit</span>
                                <span className="text-2xl font-bold text-slate-900">{unitNumber}</span>
                                <div className={`mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${colors.accent}`}>
                                  <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <p className={`text-sm font-semibold ${colors.accent} mt-6`}></p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="text-center text-slate-500 text-sm border-t border-slate-200 pt-8">
          <p>Build your vocabulary at your own pace</p>
        </div>
      </div>
    </div>
  );
}
