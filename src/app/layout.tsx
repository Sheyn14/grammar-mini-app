'use client';

import type { Metadata, Viewport } from 'next';
import { AuthProvider } from '@/providers/AuthProvider';
import './globals.css';

// Metadata needs to be in a server component, so we'll create a separate layout wrapper
// For now, these are moved to a server-side config file

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-white">
        <div id="app" className="min-h-screen">
          <AuthProvider>{children}</AuthProvider>
        </div>

        {/* Telegram WebApp SDK */}
        <script src="https://telegram.org/js/telegram-web-app.js" />
      </body>
    </html>
  );
}
