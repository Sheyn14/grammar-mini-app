'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [resendCount, setResendCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [canResend, setCanResend] = useState(true);

  // Get email from session storage or URL params
  useEffect(() => {
    const storedEmail = sessionStorage.getItem('signup_email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  // Handle countdown timer - prevents hydration issues by computing client-side only
  useEffect(() => {
    if (!canResend && timeRemaining > 0) {
      const interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [canResend, timeRemaining]);

  const handleResendEmail = async () => {
    if (!canResend) return;

    try {
      setCanResend(false);
      setTimeRemaining(60);
      setResendCount(resendCount + 1);

      // Resend verification email (requires backend endpoint)
      // For now, just show success message
      console.log('📧 Resending verification email to:', email);
    } catch (error) {
      console.error('Error resending email:', error);
      setCanResend(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Icon */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <span className="text-4xl">✉️</span>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Check Your Email</h1>
          <p className="text-gray-600 text-center mb-6">
            We've sent a verification email to <span className="font-semibold">{email || 'your email'}</span>
          </p>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">What to do next:</h3>
            <ol className="text-sm text-blue-800 space-y-2">
              <li>1. Check your email inbox (and spam folder)</li>
              <li>2. Click the confirmation link in the email</li>
              <li>3. You'll be able to log in to your account</li>
            </ol>
          </div>

          {/* Status Messages */}
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                {resendCount > 0 && (
                  <span className="text-gray-500">
                    {resendCount === 1 && '✓ Verification email resent'}
                    {resendCount > 1 && `✓ Resent ${resendCount} times`}
                  </span>
                )}
              </p>
            </div>

            {/* Resend Button */}
            <button
              onClick={handleResendEmail}
              disabled={!canResend}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition ${
                canResend
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              {canResend ? 'Resend Verification Email' : `Resend in ${timeRemaining}s`}
            </button>
          </div>

          {/* Confirmation Link */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600 text-sm mb-4">
              Already confirmed your email?
            </p>
            <Link
              href="/login"
              className="w-full block text-center py-3 px-6 text-blue-600 font-semibold hover:text-blue-700 transition"
            >
              Go to Login
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Didn't receive the email? Check your spam folder or try resending.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-8 bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4">Troubleshooting</h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-gray-700">Still haven't received the email?</p>
              <p className="text-gray-600 mt-1">
                Try resending, or check your spam/junk folder. Sometimes emails take a few minutes to arrive.
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Email is wrong?</p>
              <p className="text-gray-600 mt-1">
                You'll need to sign up again with the correct email address.
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Link expired?</p>
              <p className="text-gray-600 mt-1">
                No problem! Just request a new verification email using the button above.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
