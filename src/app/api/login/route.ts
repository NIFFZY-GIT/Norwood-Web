// src/app/api/login/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'; // Ensure this path is correct
import bcrypt from 'bcryptjs';
import { createSessionCookie } from '@/lib/session'; // Import the session utility

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { message: 'Missing username or password' },
      { status: 400 }
    );
  }

  if (!process.env.JWT_SECRET_KEY) {
    console.error('FATAL: JWT_SECRET_KEY is not set in environment variables.');
    return NextResponse.json(
      { message: 'Server configuration error. Please contact support.' },
      { status: 500 }
    );
  }
  if (!process.env.MONGODB_DB_NAME) {
    console.error('FATAL: MONGODB_DB_NAME is not set in environment variables.');
    return NextResponse.json(
      { message: 'Server configuration error. Please contact support.' },
      { status: 500 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME); 
    const users = db.collection('users');

    const user = await users.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 } // Unauthorized
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 } // Unauthorized
      );
    }

    // Create session cookie
    const userId = user._id.toString(); // Convert ObjectId to string if necessary
    await createSessionCookie(userId, user.username);

    return NextResponse.json(
      { message: 'Login successful', user: { id: userId, username: user.username } },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { message: 'An internal server error occurred during login.' },
      { status: 500 }
    );
  }
}