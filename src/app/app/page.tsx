'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AppRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect /app to /home for backward compatibility
    router.replace('/home');
  }, [router]);

  return null;
}
