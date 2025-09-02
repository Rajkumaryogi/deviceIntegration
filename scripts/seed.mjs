// scripts/seed.mjs
import { MongoClient, ObjectId } from 'mongodb';
import { subDays, formatISO, subHours } from 'date-fns';
import dotenv from 'dotenv';

// Load environment variables from your .env.local file
dotenv.config({ path: './.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'vitals7db';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

// --- DEFINE THE STATIC DATA TO SEED ---

// We need a consistent ObjectId to link the patient to their observations
const patientId = new ObjectId("507f1f77bcf86cd799439011");

const patientToSeed = {
  _id: patientId,
  cognito_id: 'us-east-1:example-id-12345',
  first_name: 'Jane',
  last_name: 'Doe',
  birth_date: new Date('1985-05-15T00:00:00Z'),
  created_at: new Date(),
  connected_devices: [
    { device_id: 'device_abc123', type: 'fitbit', model: 'Charge 5', connected_on: new Date() },
    { device_id: 'device_def456', type: 'omron', model: 'Evolv', connected_on: subDays(new Date(), 30) },
  ],
};

// Use the same static data arrays from your mockData file
const stepValues = [8500, 7200, 10200, 9100, 6500, 11500, 7800, 8900, 9500, 10500, 6800, 7500, 12000, 8200, 9300, 9700, 11000, 7100, 8300, 10800, 9900, 8800, 7600, 11200, 10100, 9400, 8100, 7900, 10300, 9200];
const sleepValues = [7.5, 6.8, 8.1, 7.2, 6.5, 7.8, 7.1, 7.6, 7.3, 8.0, 6.9, 7.4, 8.2, 7.0, 7.7, 7.9, 8.3, 6.7, 7.5, 8.4, 7.8, 7.2, 6.9, 8.1, 7.7, 7.9, 7.3, 7.1, 8.0, 7.6];
const heartRateValues = [68, 72, 65, 69, 74, 67, 71, 66, 70, 73, 68, 69, 64, 72, 67, 69, 66, 73, 70, 65, 68, 71, 74, 66, 69, 72, 67, 70, 65, 68];
const glucoseMorning = [95, 102, 98, 105, 93, 100, 103, 97, 101, 104, 96, 99, 106, 94, 102, 100, 98, 105, 95, 103, 101, 97, 104, 96, 102, 99, 106, 98, 101, 95];
const glucoseAfternoon = [125, 130, 120, 135, 115, 128, 132, 123, 129, 138, 122, 127, 140, 118, 133, 126, 131, 137, 121, 134, 128, 124, 136, 120, 130, 125, 139, 127, 129, 122];

const observationsToSeed = [];
for (let i = 0; i < 30; i++) {
  const date = subDays(new Date(), i);
  observationsToSeed.push({
    patient_id: patientId,
    device_id: 'device_abc123',
    type: 'steps',
    unit: 'steps',
    effective_date_time: date,
    value: stepValues[i % stepValues.length]
  });
  observationsToSeed.push({
    patient_id: patientId,
    device_id: 'device_abc123',
    type: 'sleep',
    unit: 'hours',
    effective_date_time: date,
    value: sleepValues[i % sleepValues.length]
  });
  observationsToSeed.push({
    patient_id: patientId,
    device_id: 'device_abc123',
    type: 'heart-rate',
    unit: 'bpm',
    effective_date_time: date,
    value: heartRateValues[i % heartRateValues.length]
  });
  observationsToSeed.push({
    patient_id: patientId,
    device_id: 'device_def456',
    type: 'blood-glucose',
    unit: 'mg/dL',
    effective_date_time: subHours(date, 16),
    value: glucoseMorning[i % glucoseMorning.length]
  });
  observationsToSeed.push({
    patient_id: patientId,
    device_id: 'device_def456',
    type: 'blood-glucose',
    unit: 'mg/dL',
    effective_date_time: subHours(date, 8),
    value: glucoseAfternoon[i % glucoseAfternoon.length]
  });
}

// --- THE SEEDING LOGIC ---

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('Connecting to the database...');
    await client.connect();
    console.log('Successfully connected to MongoDB Atlas!');

    const db = client.db(DB_NAME);
    const patientsCollection = db.collection('patients');
    const observationsCollection = db.collection('observations');

    console.log('Clearing existing data...');
    await patientsCollection.deleteMany({});
    await observationsCollection.deleteMany({});

    console.log('Inserting new patient data...');
    await patientsCollection.insertOne(patientToSeed);

    console.log('Inserting new observation data...');
    await observationsCollection.insertMany(observationsToSeed);

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ An error occurred while seeding the database:', error);
  } finally {
    console.log('Closing database connection...');
    await client.close();
  }
}

// Run the seeding function
seedDatabase();