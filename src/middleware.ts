import { NextResponse, type NextRequest } from 'next/server';

/**
 * Middleware routing logic
 * 
 * Note: Session verification happens CLIENT-SIDE, not in middleware
 * Because:
 * - Sessions stored in browser localStorage
 * - Middleware runs server-side and can't access browser storage
 * - Client-side AuthProvider handles redirects based on auth state
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Public routes that should NOT be protected - always allow these
  const publicRoutes = [
    '/login',
    '/signup',
    '/auth',         // Allow all /auth/* routes
    '/confirm',
    '/',
  ];

  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For protected routes, just allow through
  // Session verification happens CLIENT-SIDE in AuthProvider + App pages
  // Middleware can't verify browser localStorage sessions server-side
  const isProtected = pathname.startsWith('/app') || pathname.startsWith('/quiz');

  if (isProtected) {
    // Just allow it - the client-side pages will redirect if not authenticated
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
