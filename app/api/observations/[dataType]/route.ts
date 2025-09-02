//app/api/observations/[dataType]/route.ts

// --- FIX PART 1 ---
// Import 'NextRequest' in addition to 'NextResponse'.
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// --- FIX PART 2 ---
// Use the correct types for both 'request' and the 'context' object containing params.
export async function GET(
  request: NextRequest,
  { params }: { params: { dataType: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("vitals7db");
    
    // Now we can safely destructure and use dataType.
    const { dataType } = params;

    const patientId = new ObjectId("507f1f77bcf86cd799439011");

    const observations = await db
      .collection('observations')
      .find({
        patient_id: patientId,
        type: dataType,
      })
      .sort({ effective_date_time: -1 })
      .limit(30)
      .toArray();

    return NextResponse.json(observations);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch observations' }, { status: 500 });
  }
}

