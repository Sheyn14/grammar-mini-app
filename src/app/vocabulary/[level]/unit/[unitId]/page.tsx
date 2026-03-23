'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

const colorMap: Record<
  string,
  {
    border: string;
    bg: string;
    icon: string;
    accent: string;
    lightBg: string;
  }
> = {
  beginner: {
    border: 'border-l-emerald-500',
    bg: 'bg-emerald-50',
    icon: 'bg-emerald-100',
    accent: 'text-emerald-600',
    lightBg: 'bg-emerald-100',
  },
  elementary: {
    border: 'border-l-blue-500',
    bg: 'bg-blue-50',
    icon: 'bg-blue-100',
    accent: 'text-blue-600',
    lightBg: 'bg-blue-100',
  },
  'pre-intermediate': {
    border: 'border-l-purple-500',
    bg: 'bg-purple-50',
    icon: 'bg-purple-100',
    accent: 'text-purple-600',
    lightBg: 'bg-purple-100',
  },
  intermediate: {
    border: 'border-l-amber-500',
    bg: 'bg-amber-50',
    icon: 'bg-amber-100',
    accent: 'text-amber-600',
    lightBg: 'bg-amber-100',
  },
  'upper-intermediate': {
    border: 'border-l-rose-500',
    bg: 'bg-rose-50',
    icon: 'bg-rose-100',
    accent: 'text-rose-600',
    lightBg: 'bg-rose-100',
  },
};

export default function VocabularyUnitPage() {
  const router = useRouter();
  const params = useParams() as unknown as { level: string; unitId: string };
  const { level, unitId } = params;

  useEffect(() => {
    // Redirect to practice page
    router.push(`/vocabulary/${level}/unit/${unitId}/practice`);
  }, [level, unitId, router]);

  const colors = colorMap[level as keyof typeof colorMap] || colorMap.beginner;

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-slate-200 rounded w-1/3"></div>
          <div className="h-6 bg-slate-200 rounded w-1/2"></div>
          <div className="grid gap-4 mt-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 bg-slate-200 rounded-lg"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
