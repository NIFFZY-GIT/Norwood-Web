import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const getDb = async () => {
    const client = await clientPromise;
    return client.db(process.env.DB_NAME);
};

// GET all vacancies
export async function GET() {
  try {
    const db = await getDb();
    const vacancies = await db.collection('vacancies').find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(vacancies);
  } catch (error) {
    console.error("Error fetching vacancies:", error);
    return NextResponse.json({ message: 'Error fetching vacancies' }, { status: 500 });
  }
}

// POST a new vacancy
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, department, location, description, type, isActive } = body;

    if (!title || !department || !location || !description || !type) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newVacancy = {
      title,
      department,
      location,
      description,
      type,
      isActive: isActive ?? true,
      createdAt: new Date(),
    };

    const db = await getDb();
    const result = await db.collection('vacancies').insertOne(newVacancy);
    return NextResponse.json({ ...newVacancy, _id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("Error creating vacancy:", error);
    return NextResponse.json({ message: 'Error creating vacancy' }, { status: 500 });
  }
}

// PUT (update) an existing vacancy
export async function PUT(
  req: NextRequest,
  // --- THIS IS THE CRITICAL FIX ---
  // We use the stricter type for a REQUIRED catch-all route.
  // The build system is likely expecting this shape, even for an optional route.
  { params }: { params: { id: string[] } }
) {
  try {
    // Our logic still safely handles the optional case with `?.`
    const id = params.id?.[0]; 
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Valid Vacancy ID is required for updating.' }, { status: 400 });
    }

    const body = await req.json();
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, createdAt, ...updateData } = body; 
    
    const db = await getDb();
    const result = await db.collection('vacancies').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Vacancy not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Vacancy updated successfully' });
  } catch (error) {
    console.error("Error updating vacancy:", error);
    return NextResponse.json({ message: 'Error updating vacancy' }, { status: 500 });
  }
}

// DELETE a vacancy
export async function DELETE(
  req: NextRequest,
  // --- APPLY THE SAME CRITICAL FIX HERE ---
  { params }: { params: { id: string[] } }
) {
    try {
        const id = params.id?.[0];
        if (!id || !ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Valid Vacancy ID is required for deleting.' }, { status: 400 });
        }

        const db = await getDb();
        const result = await db.collection('vacancies').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: 'Vacancy not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Vacancy deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error("Error deleting vacancy:", error);
        return NextResponse.json({ message: 'Error deleting vacancy' }, { status: 500 });
    }
}