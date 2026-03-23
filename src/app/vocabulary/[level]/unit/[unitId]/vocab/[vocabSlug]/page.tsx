'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function VocabularyVocabPage() {
  const router = useRouter();
  const params = useParams() as unknown as {
    level: string;
    unitId: string;
    vocabSlug: string;
  };
  const { level, unitId } = params;

  useEffect(() => {
    // Redirect to the practice page for this unit
    // Individual word/topic pages are now handled within the practice page
    router.push(`/vocabulary/${level}/unit/${unitId}/practice`);
  }, [level, unitId, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-slate-200 rounded w-1/3"></div>
          <div className="h-6 bg-slate-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}
