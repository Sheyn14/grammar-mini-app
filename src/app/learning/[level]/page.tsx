'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { levels } from '@/data/levels';

export default function LevelPage() {
  const router = useRouter();
  const params = useParams();
  const levelSlug = params.level as string;
  const { loading: authLoading, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  // Find level from slug
  const level = levels.find((l) => l.slug === levelSlug);

  // Color mapping for levels
  const colorMap: Record<string, { border: string; bg: string; icon: string; accent: string; lightBg: string; buttonbg: string }> = {
    'beginner': { border: 'border-l-emerald-500', bg: 'bg-emerald-50', icon: 'bg-emerald-100', accent: 'text-emerald-600', lightBg: 'bg-emerald-100', buttonbg: 'hover:border-emerald-500' },
    'elementary': { border: 'border-l-blue-500', bg: 'bg-blue-50', icon: 'bg-blue-100', accent: 'text-blue-600', lightBg: 'bg-blue-100', buttonbg: 'hover:border-blue-500' },
    'pre-intermediate': { border: 'border-l-purple-500', bg: 'bg-purple-50', icon: 'bg-purple-100', accent: 'text-purple-600', lightBg: 'bg-purple-100', buttonbg: 'hover:border-purple-500' },
    'intermediate': { border: 'border-l-amber-500', bg: 'bg-amber-50', icon: 'bg-amber-100', accent: 'text-amber-600', lightBg: 'bg-amber-100', buttonbg: 'hover:border-amber-500' },
    'upper-intermediate': { border: 'border-l-rose-500', bg: 'bg-rose-50', icon: 'bg-rose-100', accent: 'text-rose-600', lightBg: 'bg-rose-100', buttonbg: 'hover:border-rose-500' },
  };

  const colors = level ? colorMap[level.slug] || colorMap['beginner'] : colorMap['beginner'];

  // Check authentication
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  // Load page
  useEffect(() => {
    setLoading(false);
  }, []);

  // Redirect if level not found
  useEffect(() => {
    if (!authLoading && !level) {
      router.push('/home/learning');
    }
  }, [authLoading, level, router]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading level...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !level) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <div className="mb-8 mt-4 sm:mt-0">
          <button
            onClick={() => router.push('/home/learning')}
            className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6 font-semibold transition-colors"
          >
            <span className="mr-2">←</span>
            <span>Back to Learning</span>
          </button>

          {/* Level Header */}
          <div className={`${colors.border} border-l-4 bg-white rounded-xl shadow-sm p-6 sm:p-8`}>
            <div className="flex items-start gap-4 sm:gap-6 mb-4">
              <div className={`${colors.icon} w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0`}>
                <span className="text-4xl">{level.icon}</span>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{level.title}</h1>
                <p className="text-slate-600 mt-2">{level.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Units Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Units in {level.title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: level.unitCount }, (_, i) => {
              const unitNumber = i + 1;
              const unitSlug = `unit-${unitNumber}`;
              return (
                <Link
                  key={unitNumber}
                  href={`/learning/${level.slug}/unit/${unitSlug}`}
                  className="group"
                >
                  <button
                    className={`
                      w-full
                      p-6
                      rounded-lg
                      border-2 border-slate-200
                      bg-white
                      text-center
                      transition-all duration-200
                      ${colors.buttonbg}
                      hover:shadow-lg
                      hover:scale-105
                      active:scale-95
                      cursor-pointer
                    `}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="text-4xl font-bold text-slate-900">{unitNumber}</div>
                      <div className="text-sm font-semibold text-slate-600">Unit {unitNumber}</div>
                      <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${colors.accent}`}>
                        <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Info Card */}
        <div className={`${colors.bg} rounded-xl p-6 sm:p-8 border-2 ${colors.border} text-center`}>
          <p className={`text-slate-700 font-medium`}>
            Click on any unit to view topics, lessons, and take tests
          </p>
        </div>
      </div>
    </div>
  );
}
