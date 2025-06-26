// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt, type SessionData } from '@/lib/session';

const PROTECTED_ROUTES = ['/dashboard'];
const PUBLIC_ONLY_ROUTES = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // === AUTHENTICATION LOGIC ===
  const sessionCookieValue = request.cookies.get('session')?.value;
  let session: SessionData | null = null;

  if (sessionCookieValue) {
    try {
      session = await decrypt(sessionCookieValue);
    } catch {
      // decryption failed
      session = null;
    }
  }

  const isAuthenticated = !!session?.userId;
  const isAccessingProtectedRoute = PROTECTED_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  // Redirect unauthenticated users away from protected pages
  if (isAccessingProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect_to', pathname);

    const response = NextResponse.redirect(loginUrl);
    // Clear bad cookie if decryption failed
    if (sessionCookieValue && !session) {
      response.cookies.set('session', '', { maxAge: -1, path: '/' });
    }
    return response;
  }

  // Redirect logged-in users away from login/register
  if (isAuthenticated && PUBLIC_ONLY_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // === HEADER INJECTION FOR LAYOUT ROUTING ===
  // Clone and augment the incoming headers so app/layout.tsx can read it
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-next-pathname', pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}

export const config = {
  // apply middleware to all non-API, non-static, non-image, non-favicon routes
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
