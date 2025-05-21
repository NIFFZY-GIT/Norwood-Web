// src/middleware.ts
import { NextResponse } from 'next/server'; // Used for NextResponse.redirect and NextResponse.next
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/session'; // Your decrypt function

// Define a more specific type for your session payload
interface SessionPayload {
  userId: string;
  // Add any other properties you expect in your session, for example:
  // username?: string;
  // role?: 'admin' | 'user' | 'editor';
  // expires?: Date; // Often included from JWT libraries
}

const PROTECTED_ROUTES = ['/dashboard']; // Routes that require authentication
const PUBLIC_ONLY_ROUTES = ['/login', '/register']; // Routes accessible only when not logged in

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl; // Get the current path
  const sessionCookie = request.cookies.get('session')?.value;

  let sessionPayload: SessionPayload | null = null;

  if (sessionCookie) {
    try {
      const decryptedData = await decrypt(sessionCookie);
      // Ensure decryptedData matches SessionPayload structure
      if (decryptedData && typeof decryptedData === 'object' && 'userId' in decryptedData) {
         sessionPayload = decryptedData as SessionPayload; // Type assertion
      } else if (decryptedData) {
        console.warn('Decrypted session data is not in the expected format:', decryptedData);
        sessionPayload = null;
      }
    } catch (error) {
      console.error('Failed to decrypt session cookie in middleware:', error);
      sessionPayload = null; // Treat as no session if decryption fails

      // If decryption fails and it's a protected route, redirect immediately.
      // This handles cases where the cookie is present but invalid.
      if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect_to', pathname);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.set('session', '', { maxAge: -1, path: '/' }); // Attempt to clear bad cookie
        return response;
      }
    }
  }

  const isAuthenticated = !!sessionPayload?.userId; // Determine if user is authenticated

  // 1. If trying to access a protected route and not authenticated
  if (!isAuthenticated && PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect_to', pathname);
    console.log(`Redirecting unauthenticated user from ${pathname} to ${loginUrl.toString()}`);
    const response = NextResponse.redirect(loginUrl);
     // If there was a cookie but decryption failed, ensure it's cleared
    if (sessionCookie && !sessionPayload) {
        response.cookies.set('session', '', { maxAge: -1, path: '/' });
    }
    return response;
  }

  // 2. If authenticated and trying to access a public-only route (e.g., login, register)
  if (isAuthenticated && PUBLIC_ONLY_ROUTES.includes(pathname)) {
    console.log(`Redirecting authenticated user from ${pathname} to /dashboard`);
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 3. Allow request to proceed if none of the above conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - api/ (API routes)
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
};