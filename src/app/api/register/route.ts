import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  // Check for MONGODB_DB_NAME environment variable
  if (!process.env.MONGODB_DB_NAME) {
    console.error('Registration error: MONGODB_DB_NAME environment variable not set.');
    return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
  }

  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ message: 'Missing username or password' }, { status: 400 });
    }

    const client = await clientPromise;
    // MODIFICATION: Use environment variable for the database name
    const db = client.db(process.env.MONGODB_DB_NAME); 
    const users = db.collection('users');

    const existingUser = await users.findOne({ username });

    if (existingUser) {
      // This response is more specific and helpful to the frontend
      return NextResponse.json({ message: 'Username already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // MODIFICATION: Add `isAdmin: true` to the new user document
    const result = await users.insertOne({
      username,
      passwordHash: hashedPassword, // Best practice: rename field to reflect it's a hash
      createdAt: new Date(),
      isAdmin: true, // This makes every new user an administrator
    });

    // The response is slightly improved to be more consistent
    return NextResponse.json({ 
      message: 'User registered successfully', 
      userId: result.insertedId.toString() 
    }, { status: 201 });

  } catch (error: unknown) {
    console.error('Registration error:', error);
    
    // MODIFICATION: Add specific check for duplicate key errors (safer than checking findOne)
    if (error && typeof error === 'object' && 'code' in error && (error as { code: number }).code === 11000) {
      return NextResponse.json({ message: 'Username already exists (database constraint).' }, { status: 409 });
    }
    
    return NextResponse.json({ message: 'An internal server error occurred' }, { status: 500 });
  }
}