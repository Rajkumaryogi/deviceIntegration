//app/api/dashboard/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { Observation } from '@/types'; // --- NEW --- Import the Observation type

// --- NEW --- Define a specific type for our dictionary of observations
type LatestObservationsMap = {
  [key: string]: Observation | null;
};

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("vitals7db");

    // In a real app, you would get this from an authenticated session.
    const patientId = new ObjectId("507f1f77bcf86cd799439011");

    // --- 1. Fetch Patient Information ---
    const patient = await db.collection('patients').findOne({ _id: patientId });
    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }

    // --- 2. Fetch the latest observation for each data type ---
    const dataTypes = ['steps', 'heart-rate', 'sleep', 'blood-glucose'];
    
    // --- FIX APPLIED HERE ---
    // Use the specific type instead of `any`
    const latestObservations: LatestObservationsMap = {};

    // This loop runs a query for each data type to find the most recent record.
    for (const type of dataTypes) {
      const observation = await db.collection('observations').findOne<Observation>(
        { patient_id: patientId, type: type },
        { sort: { effective_date_time: -1 } } // Get the newest one
      );
      latestObservations[type] = observation;
    }

    // --- 3. Combine and return all the data ---
    const responseData = {
      patient: {
        first_name: patient.first_name,
        connected_devices: patient.connected_devices,
      },
      latestObservations: latestObservations,
    };

    return NextResponse.json(responseData);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}

