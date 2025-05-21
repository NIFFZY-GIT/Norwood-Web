// src/middleware.ts
'use server'; 
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt, type SessionData } from '@/lib/session'; // Import decrypt and SessionData type

// Define routes that require authentication
const PROTECTED_ROUTES = ['/dashboard']; // Add other protected base paths (e.g., '/profile', '/settings')

// Define routes that should only be accessible to unauthenticated users
const PUBLIC_ONLY_ROUTES = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookieValue = request.cookies.get('session')?.value;

  let session: SessionData | null = null;

  if (sessionCookieValue) {
    // Decrypt the session cookie directly in middleware.
    // Note: The `decrypt` function from lib/session uses `jose` which is Edge-compatible.
    session = await decrypt(sessionCookieValue);
  }

  const isAuthenticated = !!session?.userId;

  // Scenario 1: User is trying to access a protected route
  const isAccessingProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

  if (isAccessingProtectedRoute && !isAuthenticated) {
    // User is not authenticated and trying to access a protected route, redirect to login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect_to', pathname); // Pass original path for redirect after login
    console.log(`[Middleware] Unauthenticated access to ${pathname}. Redirecting to login.`);
    const response = NextResponse.redirect(loginUrl);
    // If the cookie was present but invalid (decryption failed), clear it.
    if (sessionCookieValue && !session) {
        response.cookies.set('session', '', { maxAge: -1, path: '/' });
    }
    return response;
  }

  // Scenario 2: User is authenticated and trying to access a public-only route
  if (isAuthenticated && PUBLIC_ONLY_ROUTES.includes(pathname)) {
    // User is authenticated, redirect them away from login/register to the dashboard
    console.log(`[Middleware] Authenticated user accessing ${pathname}. Redirecting to dashboard.`);
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Scenario 3: No special action needed, allow the request to proceed
  return NextResponse.next();
}

// Configure the matcher to specify which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes, these often handle their own auth or are public)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     *
     * This ensures middleware primarily runs on page navigations.
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};