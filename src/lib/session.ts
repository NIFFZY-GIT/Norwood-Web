// src/lib/session.ts
import 'server-only'; // Ensures this code only runs on the server

import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { cookies } from 'next/headers'; // Ensure this is the correct import

const secretKey = process.env.JWT_SECRET_KEY;
if (!secretKey) {
  throw new Error('JWT_SECRET_KEY is not set in environment variables.');
}
const key = new TextEncoder().encode(secretKey);

interface AppJWTPayload extends JWTPayload {
  userId: string;
  username: string;
}

export interface SessionData {
  userId: string;
  username: string;
  expires?: Date;
}

export async function encrypt(payload: { userId: string; username: string }): Promise<string> {
  return new SignJWT(payload as AppJWTPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(key);
}

export async function decrypt(sessionToken: string | undefined = ''): Promise<SessionData | null> {
  if (!sessionToken) {
    return null;
  }
  try {
    const { payload: verifiedJwtPayload } = await jwtVerify(sessionToken, key, {
      algorithms: ['HS256'],
    });

    const userId = verifiedJwtPayload.userId as string | undefined;
    const username = verifiedJwtPayload.username as string | undefined;
    const expTimestamp = verifiedJwtPayload.exp as number | undefined;

    if (!userId || !username) {
      console.error('JWT payload is missing required custom fields (userId, username).');
      return null;
    }

    return {
      userId,
      username,
      expires: expTimestamp ? new Date(expTimestamp * 1000) : undefined,
    };
  } catch (error) {
    if (error instanceof Error && (error.name === 'JWTExpired' || error.message.includes('expired'))) {
        console.log('Session token expired.');
    } else {
        console.error('Failed to verify or decrypt session token:', (error as Error).message);
    }
    return null;
  }
}

export async function createSessionCookie(userId: string, username: string) {
  const cookieExpiresAt = new Date(Date.now() + 60 * 60 * 1000); 
  const sessionToken = await encrypt({ userId, username });

  // MODIFICATION: Awaiting cookies() based on TypeScript error
  const cookieStore = await cookies(); 
  cookieStore.set('session', sessionToken, { // Using the resolved cookieStore
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: cookieExpiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function getSession(): Promise<SessionData | null> {
  // MODIFICATION: Awaiting cookies() based on TypeScript error
  const cookieStore = await cookies();
  const sessionCookieValue = cookieStore.get('session')?.value; // Using the resolved cookieStore
  
  if (!sessionCookieValue) {
    return null;
  }
  return await decrypt(sessionCookieValue);
}

export async function deleteSessionCookie() {
  // MODIFICATION: Awaiting cookies() based on TypeScript error
  const cookieStore = await cookies();
  cookieStore.set('session', '', { // Using the resolved cookieStore
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0), 
    sameSite: 'lax',
    path: '/',
  });
}

// The updateSession function remains commented out.
// ...