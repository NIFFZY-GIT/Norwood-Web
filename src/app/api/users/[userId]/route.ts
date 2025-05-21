// src/app/api/users/[userId]/route.ts
import { NextResponse, NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getSession } from '@/lib/session';
import { ObjectId } from 'mongodb';

export async function DELETE(request: NextRequest, { params }: { params: { userId: string } }) {
    const session = await getSession();
    if (!session?.userId) { // Only check if user is logged in
        return NextResponse.json({ message: 'Unauthorized: You must be logged in.' }, { status: 401 });
    }

    const { userId } = params;

    if (!ObjectId.isValid(userId)) {
        return NextResponse.json({ message: 'Invalid user ID format' }, { status: 400 });
    }
    
    // Optional: Prevent a user from deleting their own account via this specific UI action
    // if (session.userId === userId) {
    //     return NextResponse.json({ message: 'You cannot delete your own account here. Please use account settings.' }, { status: 403 });
    // }

    if (!process.env.MONGODB_DB_NAME) {
        return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
    }

    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB_NAME);
        const usersCollection = db.collection('users');

        const result = await usersCollection.deleteOne({ _id: new ObjectId(userId) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ message: 'Failed to delete user' }, { status: 500 });
    }
}