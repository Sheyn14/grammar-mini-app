'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';

export default function HomePage() {
  const { loading, isAuthenticated, user, logout } = useAuth();
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
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-12 mt-4 sm:mt-8">
          <div className="flex-1">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                <span className="text-4xl">📚</span>
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-2 tracking-tight">
              Grammar Mastery
            </h1>
            <p className="text-lg text-slate-500 max-w-md">
              Welcome back, {user?.email ? user.email.split('@')[0] : 'Student'}!
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="mb-16">
          <p className="text-slate-500 text-sm sm:text-base mb-8 font-semibold">
            Choose how you want to learn
          </p>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Learning Section Card */}
            <Link href="/home/learning" className="group h-full">
              <div className="h-full bg-white rounded-xl p-8 border-2 border-slate-200 border-l-blue-500 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden relative">
                {/* Subtle background accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-12 -mt-12 opacity-40 group-hover:opacity-50 transition-opacity"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">📖</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-slate-950 transition-colors">
                    Learning
                  </h2>

                  {/* Description */}
                  <p className="text-slate-600 text-base mb-6 leading-relaxed">
                    Master English grammar through structured levels and units
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-sm font-semibold text-blue-600">
                      5 Levels
                    </span>
                    <span className="text-xl text-blue-600 transform group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Tests Section Card */}
            <Link href="/home/tests" className="group h-full">
              <div className="h-full bg-white rounded-xl p-8 border-2 border-slate-200 border-l-purple-500 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden relative">
                {/* Subtle background accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-full -mr-12 -mt-12 opacity-40 group-hover:opacity-50 transition-opacity"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="bg-purple-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">✍️</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-slate-950 transition-colors">
                    Tests
                  </h2>

                  {/* Description */}
                  <p className="text-slate-600 text-base mb-6 leading-relaxed">
                    Take quick quizzes on specific grammar topics
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-sm font-semibold text-purple-600">
                      6 Quizzes
                    </span>
                    <span className="text-xl text-purple-600 transform group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Results Section Card */}
            <Link href="/home/results" className="group h-full">
              <div className="h-full bg-white rounded-xl p-8 border-2 border-slate-200 border-l-emerald-500 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden relative">
                {/* Subtle background accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full -mr-12 -mt-12 opacity-40 group-hover:opacity-50 transition-opacity"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="bg-emerald-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">📊</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-slate-950 transition-colors">
                    Results
                  </h2>

                  {/* Description */}
                  <p className="text-slate-600 text-base mb-6 leading-relaxed">
                    Track your progress and performance history
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-sm font-semibold text-emerald-600">
                      Your Stats
                    </span>
                    <span className="text-xl text-emerald-600 transform group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Vocabulary Section Card */}
            <Link href="/home/vocabulary" className="group h-full">
              <div className="h-full bg-white rounded-xl p-8 border-2 border-slate-200 border-l-amber-500 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden relative">
                {/* Subtle background accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-full -mr-12 -mt-12 opacity-40 group-hover:opacity-50 transition-opacity"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="bg-amber-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">📖</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-slate-950 transition-colors">
                    Vocabulary
                  </h2>

                  {/* Description */}
                  <p className="text-slate-600 text-base mb-6 leading-relaxed">
                    Build vocabulary through structured levels and units
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-sm font-semibold text-amber-600">
                      5 Levels
                    </span>
                    <span className="text-xl text-amber-600 transform group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center text-slate-500 text-sm border-t border-slate-200 pt-8">
          <p>Continue your learning journey with Grammar Mastery</p>
        </div>
      </div>
    </div>
  );
}
