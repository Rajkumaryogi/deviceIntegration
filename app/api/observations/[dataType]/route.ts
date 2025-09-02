import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ dataType: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db("vitals7db");

    // ✅ Await params
    const { dataType } = await context.params;

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
