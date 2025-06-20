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
    // --- MODIFICATION 1: Get `registrationCode` from the request body ---
    const { username, password, registrationCode } = await req.json();
    
    // --- MODIFICATION 2: Read the secret code from your environment variables ---
    const secretCode = process.env.REGISTRATION_SECRET_CODE;

    // --- MODIFICATION 3: Add validation for the registration code ---
    if (!username || !password || !registrationCode) {
      return NextResponse.json({ message: 'Missing username, password, or registration code' }, { status: 400 });
    }
    
    // Check if the provided code is valid.
    if (registrationCode !== secretCode) {
      return NextResponse.json(
        { message: 'Invalid Registration Code.' },
        { status: 403 } // 403 Forbidden is a great status code for this
      );
    }
    
    // --- The rest of your existing logic continues from here ---

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME); 
    const users = db.collection('users');

    const existingUser = await users.findOne({ username });

    if (existingUser) {
      return NextResponse.json({ message: 'Username already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await users.insertOne({
      username,
      passwordHash: hashedPassword,
      createdAt: new Date(),
      isAdmin: true, // This makes every new user an administrator
    });

    return NextResponse.json({ 
      message: 'User registered successfully', 
      userId: result.insertedId.toString() 
    }, { status: 201 });

  } catch (error: unknown) {
    console.error('Registration error:', error);
    
    if (error && typeof error === 'object' && 'code' in error && (error as { code: number }).code === 11000) {
      return NextResponse.json({ message: 'Username already exists (database constraint).' }, { status: 409 });
    }
    
    return NextResponse.json({ message: 'An internal server error occurred' }, { status: 500 });
  }
}