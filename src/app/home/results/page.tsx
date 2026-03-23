'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';

export default function ResultsPage() {
  const { loading, isAuthenticated } = useAuth();
  const router = useRouter();

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
          <p className="text-slate-600">Loading results...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl mb-4">
              <span className="text-4xl">📊</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-3 tracking-tight">
              Your Results
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
              Track your performance and learning progress
            </p>
          </div>
        </div>

        {/* Placeholder Content */}
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Card 1: Quizzes Completed */}
            <div className="bg-white rounded-xl p-8 border-2 border-slate-200 border-l-blue-500 shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <p className="text-slate-600 text-sm mb-2">Quizzes Completed</p>
              <p className="text-4xl font-bold text-slate-900">0</p>
              <p className="text-xs text-slate-500 mt-2">Complete quizzes to see stats</p>
            </div>

            {/* Card 2: Average Score */}
            <div className="bg-white rounded-xl p-8 border-2 border-slate-200 border-l-purple-500 shadow-sm">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <p className="text-slate-600 text-sm mb-2">Average Score</p>
              <p className="text-4xl font-bold text-slate-900">—</p>
              <p className="text-xs text-slate-500 mt-2">Your performance will appear here</p>
            </div>

            {/* Card 3: Streaks */}
            <div className="bg-white rounded-xl p-8 border-2 border-slate-200 border-l-emerald-500 shadow-sm">
              <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔥</span>
              </div>
              <p className="text-slate-600 text-sm mb-2">Current Streak</p>
              <p className="text-4xl font-bold text-slate-900">0 days</p>
              <p className="text-xs text-slate-500 mt-2">Practice daily to start a streak</p>
            </div>
          </div>

          {/* Main Placeholder */}
          <div className="bg-white rounded-xl p-12 sm:p-16 border-2 border-slate-200 shadow-sm text-center">
            <div className="text-6xl mb-6">📋</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">No Results Yet</h2>
            <p className="text-slate-600 max-w-md mx-auto mb-8">
              Start taking quizzes and completing learning units to see your performance history and detailed results here.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => router.push('/home/learning')}
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Learning
              </button>
              <p className="text-sm text-slate-500 mt-4">or</p>
              <button
                onClick={() => router.push('/home/tests')}
                className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Take a Test
              </button>
            </div>
          </div>

          {/* Future Features Note */}
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6 text-center">
            <p className="text-emerald-900 text-sm">
              <span className="font-semibold">📊 Coming Soon:</span> Detailed performance analytics, learning trends, and achievement badges
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
