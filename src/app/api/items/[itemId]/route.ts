// src/app/api/items/[itemId]/route.ts
import { NextResponse, NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getSession } from '@/lib/session';
import { Item } from '@/lib/types';
import { ObjectId } from 'mongodb'; // Import ObjectId

// Helper interface for what comes from DB
interface ItemFromDB extends Omit<Item, '_id' | 'createdAt'> {
  _id: ObjectId;
  createdAt: Date;
}

// PUT update an item
export async function PUT(request: NextRequest, { params }: { params: { itemId: string } }) {
  console.log(`PUT /api/items/${params.itemId}: Handler started`);
  const session = await getSession();
  if (!session?.userId) {
    console.log(`PUT /api/items/${params.itemId}: Unauthorized`);
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { itemId } = params;
  if (!ObjectId.isValid(itemId)) {
    console.log(`PUT /api/items/${params.itemId}: Invalid item ID format`);
    return NextResponse.json({ message: 'Invalid item ID format' }, { status: 400 });
  }

  if (!process.env.MONGODB_DB_NAME) {
    console.error(`PUT /api/items/${params.itemId}: MONGODB_DB_NAME not set`);
    return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { name, description, itemCode, imageBase64 } = body;
    console.log(`PUT /api/items/${params.itemId}: Received body:`, { name, description, itemCode, imageBase64: imageBase64 ? 'Present' : 'Not Present' });

    const updateFields: Partial<Omit<Item, '_id' | 'userId' | 'createdAt'>> = {};
    if (name !== undefined) updateFields.name = name;
    if (description !== undefined) updateFields.description = description;
    if (itemCode !== undefined) updateFields.itemCode = itemCode;
    
    if (imageBase64 !== undefined) {
        // Ensure imageBase64 is a valid data URL string if provided
        if (typeof imageBase64 === 'string' && imageBase64.startsWith('data:image')) {
            updateFields.imageBase64 = imageBase64;
        } else if (imageBase64 === null || imageBase64 === '') {
            // If you intend to allow removing the image, you might set imageBase64 to empty string or handle $unset.
            // For now, this logic implies that if imageBase64 is provided, it must be a valid data URL or it's an error.
            // If imageBase64 is not part of the payload, it's simply not updated.
            // If Item type requires imageBase64, setting it to '' or null might violate that.
            // Let's assume if provided, it must be valid, otherwise it's a bad request.
             console.log(`PUT /api/items/${params.itemId}: imageBase64 provided but in invalid format or empty.`);
             // If an empty string is valid to clear an image, then allow it.
             // updateFields.imageBase64 = ""; // if you want to allow clearing it with an empty string
        } else { // imageBase64 is present but not a valid data URL string (and not null/empty string already handled)
            console.log(`PUT /api/items/${params.itemId}: Invalid image data format for update.`);
            return NextResponse.json({ message: 'Invalid image data format for update.' }, { status: 400 });
        }
    }

    if (Object.keys(updateFields).length === 0) {
      console.log(`PUT /api/items/${params.itemId}: No fields to update`);
      return NextResponse.json({ message: 'No fields to update' }, { status: 400 });
    }
    
    // This specific validation might be redundant if the logic above for imageBase64 in updateFields is robust
    // if (updateFields.imageBase64 && (typeof updateFields.imageBase64 !== 'string' || !updateFields.imageBase64.startsWith('data:image'))) {
    //     console.log(`PUT /api/items/${params.itemId}: Invalid image data format in updateFields prepared for DB.`);
    //     return NextResponse.json({ message: 'Invalid image data format for update.' }, { status: 400 });
    // }

    console.log(`PUT /api/items/${params.itemId}: Connecting to DB...`);
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const itemsCollection = db.collection<ItemFromDB>('items');

    console.log(`PUT /api/items/${params.itemId}: Attempting to update item with ID: ${itemId}`);
    
    // Changed 'result' to 'updatedDoc' for clarity and to reflect TS inference.
    // TypeScript seems to infer the return type as ItemFromDB | null here in your environment.
    const updatedDoc: ItemFromDB | null = await itemsCollection.findOneAndUpdate(
      { _id: new ObjectId(itemId), userId: session.userId },
      { $set: updateFields },
      { returnDocument: 'after' } // This option ensures the updated document is returned.
    );

    // Check if a document was found and updated.
    // If updatedDoc is null, it means no document matched the filter.
    if (!updatedDoc) {
      console.log(`PUT /api/items/${params.itemId}: Item not found or user not authorized to update this item.`);
      return NextResponse.json({ message: 'Item not found or not authorized' }, { status: 404 });
    }
    // If we reach here, updatedDoc is of type ItemFromDB (guaranteed not null).
    console.log(`PUT /api/items/${params.itemId}: Item updated successfully`);

    // Construct the Item object to return, ensuring _id is a string.
    const updatedItem: Item = {
      ...updatedDoc, // Spread properties from the retrieved document
      _id: updatedDoc._id.toString(), // Convert ObjectId to string
      // createdAt is already a Date from ItemFromDB definition
    };

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    console.error(`PUT /api/items/${params.itemId}: Failed to update item:`, error);
     if (typeof error === 'object' && error !== null && 'code' in error) {
      const dbError = error as { code?: number; message?: string };
      if (dbError.code === 10334 || (dbError.message && dbError.message.toLowerCase().includes('document too large'))) {
          return NextResponse.json({ message: 'Image is too large to store in the database. Please use a smaller image or a dedicated file storage service.' }, { status: 413 });
      }
    } else if (error instanceof Error) {
        return NextResponse.json({ message: `Server error: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ message: 'An unknown server error occurred while updating item' }, { status: 500 });
  }
}

// DELETE an item
export async function DELETE(request: NextRequest, { params }: { params: { itemId: string } }) {
  console.log(`DELETE /api/items/${params.itemId}: Handler started`);
  const session = await getSession();
  if (!session?.userId) {
    console.log(`DELETE /api/items/${params.itemId}: Unauthorized`);
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { itemId } = params;
   if (!ObjectId.isValid(itemId)) {
    console.log(`DELETE /api/items/${params.itemId}: Invalid item ID format`);
    return NextResponse.json({ message: 'Invalid item ID format' }, { status: 400 });
  }

  if (!process.env.MONGODB_DB_NAME) {
    console.error(`DELETE /api/items/${params.itemId}: MONGODB_DB_NAME not set`);
    return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
  }
  
  try {
    console.log(`DELETE /api/items/${params.itemId}: Connecting to DB...`);
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const itemsCollection = db.collection('items'); // No specific type needed for deleteOne by _id

    console.log(`DELETE /api/items/${params.itemId}: Attempting to delete item with ID: ${itemId}`);
    const result = await itemsCollection.deleteOne({ 
      _id: new ObjectId(itemId), 
      userId: session.userId 
    });

    if (result.deletedCount === 0) {
      console.log(`DELETE /api/items/${params.itemId}: Item not found or user not authorized to delete this item.`);
      return NextResponse.json({ message: 'Item not found or not authorized' }, { status: 404 });
    }
    console.log(`DELETE /api/items/${params.itemId}: Item deleted successfully`);

    return NextResponse.json({ message: 'Item deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(`DELETE /api/items/${params.itemId}: Failed to delete item:`, error);
    return NextResponse.json({ message: 'Server error while deleting item' }, { status: 500 });
  }
}