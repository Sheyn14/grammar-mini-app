'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LevelRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect /app/[level] to /learning/[slug] for backward compatibility
    router.replace('/home');
  }, [router]);

  return null;
}
