'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { levels } from '@/data/levels';
import { getLessonBySlug } from '@/data/lessons';

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const levelSlug = params.level as string;
  const unitId = params.unitId as string;
  const lessonSlug = params.lessonSlug as string;
  const { loading: authLoading, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  // Find level from slug
  const level = levels.find((l) => l.slug === levelSlug);

  // Extract unit number from unitId
  const unitNumber = parseInt(unitId.split('-')[1], 10);
  const isValidUnit = !isNaN(unitNumber) && unitNumber > 0 && unitNumber <= (level?.unitCount || 0);

  // Get lesson by slug
  const lesson = getLessonBySlug(lessonSlug);

  // Color mapping
  const colorMap: Record<string, { border: string; bg: string; icon: string; accent: string; lightBg: string; textAccent: string }> = {
    'beginner': { border: 'border-emerald-500', bg: 'bg-emerald-50', icon: 'bg-emerald-100', accent: 'text-emerald-600', lightBg: 'bg-emerald-100', textAccent: 'text-emerald-500' },
    'elementary': { border: 'border-blue-500', bg: 'bg-blue-50', icon: 'bg-blue-100', accent: 'text-blue-600', lightBg: 'bg-blue-100', textAccent: 'text-blue-500' },
    'pre-intermediate': { border: 'border-purple-500', bg: 'bg-purple-50', icon: 'bg-purple-100', accent: 'text-purple-600', lightBg: 'bg-purple-100', textAccent: 'text-purple-500' },
    'intermediate': { border: 'border-amber-500', bg: 'bg-amber-50', icon: 'bg-amber-100', accent: 'text-amber-600', lightBg: 'bg-amber-100', textAccent: 'text-amber-500' },
    'upper-intermediate': { border: 'border-rose-500', bg: 'bg-rose-50', icon: 'bg-rose-100', accent: 'text-rose-600', lightBg: 'bg-rose-100', textAccent: 'text-rose-500' },
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

  // Redirect if invalid
  useEffect(() => {
    if (!authLoading && (!level || !isValidUnit || !lesson || lesson.unitId !== unitNumber)) {
      router.push('/home/learning');
    }
  }, [authLoading, level, isValidUnit, lesson, unitNumber, router]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !level || !isValidUnit || !lesson) {
    return null;
  }

  // Parse markdown-like content
  const renderContent = (content: string) => {
    return content.split('\n').map((line, idx) => {
      if (line.startsWith('# ')) {
        return <h1 key={idx} className="text-3xl font-bold text-slate-900 mt-6 mb-4">{line.replace('# ', '')}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={idx} className="text-2xl font-bold text-slate-900 mt-5 mb-3">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="text-xl font-bold text-slate-900 mt-4 mb-2">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('- ')) {
        return <li key={idx} className="text-slate-700 ml-6">{line.replace('- ', '')}</li>;
      }
      if (line.startsWith('❌ ') || line.startsWith('✅ ')) {
        return <p key={idx} className={`my-2 p-3 rounded font-mono text-sm ${line.startsWith('❌') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>{line}</p>;
      }
      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }
      return <p key={idx} className="text-slate-700 leading-relaxed mb-3">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumbs */}
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-600 flex-wrap">
          <Link href="/home/learning" className="hover:text-slate-900 transition-colors">
            Learning
          </Link>
          <span className="text-slate-400">/</span>
          <Link href={`/learning/${level.slug}`} className="hover:text-slate-900 transition-colors">
            {level.title}
          </Link>
          <span className="text-slate-400">/</span>
          <Link href={`/learning/${level.slug}/unit/unit-${unitNumber}`} className="hover:text-slate-900 transition-colors">
            Unit {unitNumber}
          </Link>
          <span className="text-slate-400">/</span>
          <span className="font-semibold text-slate-900">{lesson.title}</span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-8 inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors"
        >
          <span className="mr-2">←</span>
          <span className="font-semibold">Back to Unit</span>
        </button>

        {/* Lesson Header */}
        <div className={`${colors.border} border-l-4 bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8`}>
          <div className="flex items-start gap-4 mb-4">
            <span className="text-4xl">{lesson.icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap gap-y-2">
                <span className={`text-xs font-semibold ${colors.accent} px-3 py-1 rounded-full ${colors.lightBg}`}>
                  {level.title} • Unit {unitNumber}
                </span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${lesson.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-700' : lesson.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                  {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)} • {lesson.estimatedTime} min
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{lesson.title}</h1>
              <p className="text-slate-600 mt-2">{lesson.description}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          {/* Lesson Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 prose prose-sm md:prose max-w-none">
              <div className="space-y-4">
                {renderContent(lesson.content)}
              </div>
            </div>

            {/* Lesson Navigation */}
            <div className="mt-8 flex gap-4">
              <Link href={`/learning/${level.slug}/unit/unit-${unitNumber}`} className="flex-1">
                <button className="w-full p-4 rounded-lg border-2 border-slate-200 bg-white hover:border-slate-400 hover:shadow-md transition-all font-semibold text-slate-700 hover:text-slate-900">
                  ← Back to Unit
                </button>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lesson Info Card */}
            <div className={`${colors.border} border-l-4 bg-white rounded-xl shadow-sm p-6 overflow-hidden`}>
              <h3 className="text-lg font-bold text-slate-900 mb-4">Lesson Info</h3>

              <div className="space-y-4">
                {/* Difficulty */}
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                    Difficulty
                  </p>
                  <p className={`text-sm font-bold ${lesson.difficulty === 'easy' ? 'text-emerald-600' : lesson.difficulty === 'medium' ? 'text-amber-600' : 'text-rose-600'}`}>
                    {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
                  </p>
                </div>

                {/* Time */}
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                    Reading Time
                  </p>
                  <p className="text-sm font-bold text-slate-900">⏱️ {lesson.estimatedTime} minutes</p>
                </div>

                {/* Unit */}
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                    Unit
                  </p>
                  <p className={`text-sm font-bold ${colors.accent}`}>Unit {unitNumber}</p>
                </div>

                {/* Separator */}
                <div className="my-4 border-t border-slate-200" />

                {/* Progress Tracker (Placeholder) */}
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">
                    Your Progress
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: '0%' }} />
                      </div>
                    </div>
                    <p className="text-xs text-slate-600">Not started</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps Card */}
            <div className={`${colors.bg} rounded-xl p-6 border-2 ${colors.border}`}>
              <h3 className="font-bold text-slate-900 mb-3">Next Steps</h3>
              <ol className="list-decimal list-inside text-sm text-slate-700 space-y-2">
                <li>Read the lesson</li>
                <li>Take practice exercises</li>
                <li>Move to next lesson</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
