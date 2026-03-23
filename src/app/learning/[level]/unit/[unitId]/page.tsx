'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { levels } from '@/data/levels';
import { getLessonsByUnit } from '@/data/lessons';

export default function UnitPage() {
  const router = useRouter();
  const params = useParams();
  const levelSlug = params.level as string;
  const unitId = params.unitId as string;
  const { loading: authLoading, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  // Find level from slug
  const level = levels.find((l) => l.slug === levelSlug);

  // Extract unit number from unitId (e.g., "unit-1" -> 1)
  const unitNumber = parseInt(unitId.split('-')[1], 10);

  // Parse unit number
  const isValidUnit = !isNaN(unitNumber) && unitNumber > 0 && unitNumber <= (level?.unitCount || 0);

  // Color mapping for levels
  const colorMap: Record<string, { border: string; bg: string; icon: string; accent: string; lightBg: string; textAccent: string }> = {
    'beginner': { border: 'border-emerald-500', bg: 'bg-emerald-50', icon: 'bg-emerald-100', accent: 'text-emerald-600', lightBg: 'bg-emerald-100', textAccent: 'text-emerald-500' },
    'elementary': { border: 'border-blue-500', bg: 'bg-blue-50', icon: 'bg-blue-100', accent: 'text-blue-600', lightBg: 'bg-blue-100', textAccent: 'text-blue-500' },
    'pre-intermediate': { border: 'border-purple-500', bg: 'bg-purple-50', icon: 'bg-purple-100', accent: 'text-purple-600', lightBg: 'bg-purple-100', textAccent: 'text-purple-500' },
    'intermediate': { border: 'border-amber-500', bg: 'bg-amber-50', icon: 'bg-amber-100', accent: 'text-amber-600', lightBg: 'bg-amber-100', textAccent: 'text-amber-500' },
    'upper-intermediate': { border: 'border-rose-500', bg: 'bg-rose-50', icon: 'bg-rose-100', accent: 'text-rose-600', lightBg: 'bg-rose-100', textAccent: 'text-rose-500' },
  };

  const colors = level ? colorMap[level.slug] || colorMap['beginner'] : colorMap['beginner'];

  // Get lessons for this unit
  const lessons = getLessonsByUnit(unitNumber);

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

  // Redirect if unit is invalid
  useEffect(() => {
    if (!authLoading && level && !isValidUnit) {
      router.push(`/learning/${levelSlug}`);
    }
  }, [authLoading, level, isValidUnit, levelSlug, router]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading unit...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !level || !isValidUnit) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumbs */}
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-600">
          <Link href="/home/learning" className="hover:text-slate-900 transition-colors">
            Learning
          </Link>
          <span className="text-slate-400">/</span>
          <Link href={`/learning/${level.slug}`} className="hover:text-slate-900 transition-colors">
            {level.title}
          </Link>
          <span className="text-slate-400">/</span>
          <span className="font-semibold text-slate-900">Unit {unitNumber}</span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-8 inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors"
        >
          <span className="mr-2">←</span>
          <span className="font-semibold">Back</span>
        </button>

        {/* Unit Header Card */}
        <div className={`${colors.border} border-l-4 bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8`}>
          <div className="flex items-start gap-4 sm:gap-6 mb-6">
            {/* Level Icon */}
            <div className={`${colors.icon} w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0`}>
              <span className="text-4xl">{level.icon}</span>
            </div>

            {/* Title and Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-sm font-bold ${colors.accent} px-3 py-1 rounded-full ${colors.lightBg}`}>
                  {level.title}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2">
                Unit {unitNumber}
              </h1>
              <p className="text-lg text-slate-600">
                {level.title} Grammar Mastery - Unit {unitNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {/* Left Column - Topics Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Topics/Lessons Section */}
            <div className={`${colors.border} border-l-4 bg-white rounded-xl shadow-sm overflow-hidden`}>
              <div className={`${colors.bg} px-6 sm:px-8 py-4 border-b border-slate-200`}>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  📚 Lessons & Topics {lessons.length > 0 && `(${lessons.length})`}
                </h2>
              </div>
              <div className="p-6 sm:p-8">
                {lessons.length > 0 ? (
                  <>
                    <p className="text-slate-600 mb-6">
                      Complete the following lessons to master Unit {unitNumber}:
                    </p>
                    <div className="space-y-4">
                      {lessons.map((lesson, idx) => (
                        <Link key={lesson.id} href={`/learning/${level.slug}/unit/unit-${unitNumber}/lesson/${lesson.slug}`}>
                          <button className="w-full group text-left p-4 rounded-lg border-2 border-slate-200 bg-white hover:border-slate-400 hover:shadow-md hover:bg-slate-50 transition-all">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="text-xl">{lesson.icon}</span>
                                  <h3 className="font-semibold text-slate-900 text-lg">{lesson.title}</h3>
                                </div>
                                <p className="text-sm text-slate-600 ml-10 mb-2">{lesson.description}</p>
                                <div className="flex items-center gap-4 ml-10 text-xs text-slate-500">
                                  <span className={`px-2 py-1 rounded-full font-semibold ${lesson.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-700' : lesson.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                                    {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
                                  </span>
                                  <span>⏱️ {lesson.estimatedTime} min</span>
                                </div>
                              </div>
                              <span className={`text-2xl ${colors.accent} opacity-0 group-hover:opacity-100 transition-opacity ml-4 flex-shrink-0`}>
                                →
                              </span>
                            </div>
                          </button>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-slate-600 mb-6">
                      Topics and grammar lessons for this unit are coming soon.
                    </p>
                    <div className="space-y-4">
                      {[1, 2, 3].map((idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-slate-900">Topic {idx}</h3>
                              <p className="text-sm text-slate-600 mt-1">Placeholder for topic content</p>
                            </div>
                            <span className="text-2xl text-slate-400">🔒</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Upload Info */}
                    <div className={`mt-8 p-4 rounded-lg ${colors.lightBg} border-2 border-dashed ${colors.border}`}>
                      <p className="text-sm text-slate-700">
                        <span className="font-semibold">Administrator:</span> Use the admin panel to upload topics, grammar explanations, and lesson materials for this unit.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Tests/Quizzes Section */}
            <div className={`${colors.border} border-l-4 bg-white rounded-xl shadow-sm overflow-hidden`}>
              <div className={`${colors.bg} px-6 sm:px-8 py-4 border-b border-slate-200`}>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  ✅ Unit Tests
                </h2>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-slate-600 mb-6">
                  Unit tests and quizzes are coming soon. You will be able to test your understanding of all topics covered in Unit {unitNumber}.
                </p>

                {/* Placeholder Test */}
                <div className="p-4 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 transition-colors cursor-not-allowed">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">Unit {unitNumber} Test</h3>
                      <p className="text-sm text-slate-600 mt-1">Comprehensive grammar test - Coming Soon</p>
                    </div>
                    <span className="text-2xl text-slate-400">🔒</span>
                  </div>
                </div>

                {/* Upload Info */}
                <div className={`mt-8 p-4 rounded-lg ${colors.lightBg} border-2 border-dashed ${colors.border}`}>
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold">Administrator:</span> Use the admin panel to create and upload unit tests and quiz questions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-6">
            {/* Unit Summary Card */}
            <div className={`${colors.border} border-l-4 bg-white rounded-xl shadow-sm p-6 overflow-hidden`}>
              <h3 className="text-lg font-bold text-slate-900 mb-4">Unit Summary</h3>
              
              <div className="space-y-4">
                {/* Level */}
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                    Proficiency Level
                  </p>
                  <p className={`text-sm font-bold ${colors.accent}`}>{level.title}</p>
                </div>

                {/* Unit Number */}
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                    Unit Number
                  </p>
                  <p className="text-2xl font-bold text-slate-900">{unitNumber}</p>
                </div>

                {/* Progress */}
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                    Progress
                  </p>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`${colors.textAccent} bg-current h-full rounded-full transition-all`}
                      style={{ width: '0%' }}
                    />
                  </div>
                  <p className="text-xs text-slate-600 mt-1">Topics: 0 / 3</p>
                </div>

                {/* Separator */}
                <div className="my-4 border-t border-slate-200" />

                {/* Next Steps */}
                <div>
                  <p className="text-sm font-bold text-slate-900 mb-3">Next Steps</p>
                  <ol className="list-decimal list-inside text-sm text-slate-600 space-y-2">
                    <li>Review all topics</li>
                    <li>Complete practice exercises</li>
                    <li>Take the unit test</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Navigation Card */}
            <div className="grid grid-cols-2 gap-3">
              {/* Previous Unit */}
              {unitNumber > 1 && (
                <Link
                  href={`/learning/${level.slug}/unit/unit-${unitNumber - 1}`}
                  className="group"
                >
                  <button className="w-full p-4 rounded-lg border-2 border-slate-200 bg-white hover:border-slate-400 hover:shadow-md transition-all text-center">
                    <span className="text-xl mb-2 block">←</span>
                    <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900">Prev Unit</span>
                  </button>
                </Link>
              )}
              {unitNumber === 1 && (
                <div className="p-4 rounded-lg border-2 border-slate-200 bg-slate-50 text-center opacity-50">
                  <span className="text-xl mb-2 block">←</span>
                  <span className="text-xs font-semibold text-slate-600">First Unit</span>
                </div>
              )}

              {/* Next Unit */}
              {unitNumber < level.unitCount && (
                <Link
                  href={`/learning/${level.slug}/unit/unit-${unitNumber + 1}`}
                  className="group"
                >
                  <button className="w-full p-4 rounded-lg border-2 border-slate-200 bg-white hover:border-slate-400 hover:shadow-md transition-all text-center">
                    <span className="text-xl mb-2 block">→</span>
                    <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900">Next Unit</span>
                  </button>
                </Link>
              )}
              {unitNumber === level.unitCount && (
                <div className="p-4 rounded-lg border-2 border-slate-200 bg-slate-50 text-center opacity-50">
                  <span className="text-xl mb-2 block">→</span>
                  <span className="text-xs font-semibold text-slate-600">Last Unit</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className={`${colors.bg} rounded-xl p-8 text-center border-2 border-dashed ${colors.border}`}>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">Ready to Learn?</h3>
          <p className="text-slate-600 mb-6">
            Wait for topics and tests to be uploaded, or return to the Learning overview to explore other units.
          </p>
          <Link href="/home/learning">
            <button className={`px-8 py-3 rounded-lg font-semibold text-white ${colors.textAccent} bg-current hover:opacity-90 transition-all`}>
              Back to Learning
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
