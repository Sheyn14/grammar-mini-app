'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/auth/supabase';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the token from URL
        const token = searchParams.get('token');
        const type = searchParams.get('type');

        console.log('🔐 Auth callback triggered:', { type, hasToken: !!token });

        // Exchange the token for a session
        if (type === 'email' && token) {
          const { error: exchangeError } = await supabase.auth.verifyOtp({
            email: searchParams.get('email') || '',
            token: token,
            type: 'email',
          });

          if (exchangeError) {
            setError(exchangeError.message);
            setLoading(false);
            return;
          }
        }

        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session) {
          setError('Failed to establish session');
          setLoading(false);
          return;
        }

        console.log('✅ Session established, redirecting to app');

        // Redirect to app (levels page)
        router.replace('/app');
      } catch (err: any) {
        console.error('❌ Auth callback error:', err);
        setError(err.message || 'Authentication failed');
        setLoading(false);
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 text-center">
          {loading ? (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Confirming Email...</h1>
              <p className="text-gray-600">Please wait while we verify your email address.</p>
            </>
          ) : error ? (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <span className="text-3xl">❌</span>
              </div>
              <h1 className="text-2xl font-bold text-red-900 mb-2">Confirmation Failed</h1>
              <p className="text-red-700 mb-6">{error}</p>
              <div className="space-y-3">
                <p className="text-gray-600 text-sm">
                  The confirmation link may have expired or is invalid.
                </p>
                <a
                  href="/auth/verify-email"
                  className="inline-block w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Request New Confirmation Email
                </a>
                <a
                  href="/login"
                  className="inline-block w-full py-3 px-6 bg-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-400 transition"
                >
                  Back to Login
                </a>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
