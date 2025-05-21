// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/session'; // Import your decrypt function

const PROTECTED_ROUTES = ['/dashboard'];
const PUBLIC_ROUTES = ['/login', '/register']; // Routes accessible without login

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session')?.value;

  // Try to get session data
  const session = await decrypt(sessionCookie);

  // If trying to access a protected route without a valid session, redirect to login
  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route)) && !session?.userId) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect_to', pathname); // Optional: redirect back after login
    return NextResponse.redirect(loginUrl);
  }

  // If user is logged in (has a valid session) and tries to access a public-only route (like login/register),
  // redirect them to the dashboard.
  if (session?.userId && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next(); // Allow request to proceed
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/ (API routes, though login/logout might be handled specifically or excluded if needed)
     *
     * This ensures middleware runs on page navigations.
     * If you want finer control over API routes, adjust the matcher.
     */
    '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
    // Added 'api/auth' exclusion if you have auth-specific public APIs like /api/auth/session
    // If /api/login is public, it should not be blocked by middleware trying to redirect
    // The current logic handles /api/login fine as it's not in PROTECTED_ROUTES.
  ],
};