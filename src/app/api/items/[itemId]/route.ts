// src/app/api/items/[itemId]/route.ts
import { NextResponse, NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getSession } from '@/lib/session';
import { Item } from '@/lib/types';
import { ObjectId } from 'mongodb';

// Interface for DB documents
interface ItemFromDB extends Omit<Item, '_id' | 'createdAt'> {
  _id: ObjectId;
  createdAt: Date;
}

// PUT: Update an item
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  const { itemId } = await params;
  const session = await getSession();
  if (!session?.userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (!ObjectId.isValid(itemId)) {
    return NextResponse.json({ message: 'Invalid item ID format' }, { status: 400 });
  }
  if (!process.env.MONGODB_DB_NAME) {
    return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
  }

  try {
    const { name, description, itemCode, imageBase64 } = await request.json();
    const updateFields: Partial<Omit<Item, '_id' | 'userId' | 'createdAt'>> = {};

    if (name !== undefined)        updateFields.name = name;
    if (description !== undefined) updateFields.description = description;
    if (itemCode !== undefined)    updateFields.itemCode = itemCode;

    if (imageBase64 !== undefined) {
      if (typeof imageBase64 === 'string' && imageBase64.startsWith('data:image')) {
        updateFields.imageBase64 = imageBase64;
      } else if (imageBase64 === null || imageBase64 === '') {
        updateFields.imageBase64 = '';
      } else {
        return NextResponse.json(
          { message: 'Invalid image data format for update.' },
          { status: 400 }
        );
      }
    }

    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json({ message: 'No fields to update' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const itemsCollection = db.collection<ItemFromDB>('items');

    // updatedDoc will be the document itself (or null)
    const updatedDoc = await itemsCollection.findOneAndUpdate(
      { _id: new ObjectId(itemId), userId: session.userId },
      { $set: updateFields },
      {
        returnDocument: 'after',   // ensure we get the post-update doc
      }
    );

    if (!updatedDoc) {
      return NextResponse.json(
        { message: 'Item not found or not authorized' },
        { status: 404 }
      );
    }

    // Build the API response object
    const respItem: Item = {
      _id: updatedDoc._id.toString(),
      name: updatedDoc.name,
      description: updatedDoc.description,
      itemCode: updatedDoc.itemCode,
      imageBase64: updatedDoc.imageBase64,
      userId: updatedDoc.userId,
      createdAt: updatedDoc.createdAt,
    };

    return NextResponse.json(respItem, { status: 200 });
  } catch (error: unknown) {
    type DatabaseError = { code?: number; message?: string };
    const dbError = error as DatabaseError;
    if (
      dbError.code === 10334 ||
      dbError.message?.toLowerCase().includes('document too large')
    ) {
      return NextResponse.json(
        { message: 'Image is too large to store in the database.' },
        { status: 413 }
      );
    }
    if (error instanceof Error) {
      return NextResponse.json(
        { message: `Server error: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: 'An unknown server error occurred while updating item' },
      { status: 500 }
    );
  }
}

// DELETE: Remove an item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  const { itemId } = await params;
  const session = await getSession();
  if (!session?.userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (!ObjectId.isValid(itemId)) {
    return NextResponse.json({ message: 'Invalid item ID format' }, { status: 400 });
  }
  if (!process.env.MONGODB_DB_NAME) {
    return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const itemsCollection = db.collection('items');

    const result = await itemsCollection.deleteOne({
      _id: new ObjectId(itemId),
      userId: session.userId,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Item not found or not authorized' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Item deleted successfully' }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: `Server error: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: 'An unknown server error occurred while deleting item' },
      { status: 500 }
    );
  }
}
