//app/api/ingest/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// This function handles POST requests to /api/ingest
export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("vitals7db");

    // Get the data payload from the request body
    const observationData = await request.json();

    // Basic validation
    if (!observationData.patient_id || !observationData.type || !observationData.value) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Prepare the document for insertion
    const docToInsert = {
      ...observationData,
      patient_id: new ObjectId(observationData.patient_id),
      effective_date_time: new Date(), // Set the current time
    };

    const result = await db.collection('observations').insertOne(docToInsert);

    return NextResponse.json({ success: true, insertedId: result.insertedId }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to ingest data' }, { status: 500 });
  }
}
