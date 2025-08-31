// src/data/mockData.ts
import { Patient, Observation } from '@/types';
import { subDays, formatISO, subHours } from 'date-fns';

// --- PATIENT AND DEVICE INFO (No changes needed here) ---
export const mockPatient: Patient = {
  cognito_id: 'us-east-1:xxxxxxxx-xxxx',
  first_name: 'Jane',
  last_name: 'Doe',
  birth_date: formatISO(new Date('1985-05-15')),
  connected_devices: [
    { device_id: 'device_abc123', type: 'fitbit', model: 'Charge 5', connected_on: formatISO(new Date()) },
    { device_id: 'device_def456', type: 'omron', model: 'Evolv', connected_on: formatISO(subDays(new Date(), 30)) },
  ],
};

export const availableDevices = [
    { id: 'fitbit', name: 'Fitbit', icon: 'fitbit' },
    { id: 'omron', name: 'Omron', icon: 'omron' },
    { id: 'dexcom', name: 'Dexcom', icon: 'dexcom' },
    { id: 'apple_health', name: 'Apple Health', icon: 'apple_health' },
    { id: 'google_fit', name: 'Google Fit', icon: 'google_fit' },
];

// --- NEW DATA GENERATION LOGIC ---

// Helper function to generate a random value within a range
const randomValue = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

// Helper function to create an observation
const createObservation = (type: Observation['type'], unit: string, date: Date, value: number, deviceId: string): Observation => ({
  _id: crypto.randomUUID(),
  patient_id: 'p1',
  device_id: deviceId,
  type,
  unit,
  effective_date_time: formatISO(date),
  value,
});

// --- Generate 30 Days of Historical Data ---
const thirtyDaysOfData: Observation[] = [];
for (let i = 0; i < 30; i++) {
  const date = subDays(new Date(), i);
  // Steps
  thirtyDaysOfData.push(createObservation('steps', 'steps', date, randomValue(4000, 12000), 'device_abc123'));
  // Sleep
  thirtyDaysOfData.push(createObservation('sleep', 'hours', date, parseFloat((Math.random() * (8.5 - 6.0) + 6.0).toFixed(1)), 'device_abc123'));
  // Avg Heart Rate for the day
  thirtyDaysOfData.push(createObservation('heart-rate', 'bpm', date, randomValue(60, 75), 'device_abc123'));
  // 2-3 Glucose readings per day
  thirtyDaysOfData.push(createObservation('blood-glucose', 'mg/dL', subHours(date, 16), randomValue(90, 110), 'device_def456')); // Morning
  thirtyDaysOfData.push(createObservation('blood-glucose', 'mg/dL', subHours(date, 8), randomValue(110, 140), 'device_def456')); // Afternoon
}

// --- EXPORT DIFFERENT TIME FRAMES ---

export const mockMonthlyObservations = thirtyDaysOfData;

export const mockWeeklyObservations = thirtyDaysOfData.slice(0, 7 * 4); // Last 7 days, more dense data

export const mockDailyObservations: Observation[] = [
    createObservation('steps', 'steps', subHours(new Date(), 2), 2500, 'device_abc123'),
    createObservation('steps', 'steps', subHours(new Date(), 8), 4000, 'device_abc123'),
    createObservation('heart-rate', 'bpm', subHours(new Date(), 1), 72, 'device_abc123'),
    createObservation('heart-rate', 'bpm', subHours(new Date(), 6), 65, 'device_abc123'),
    createObservation('blood-glucose', 'mg/dL', subHours(new Date(), 10), 95, 'device_def456'), // Morning
    createObservation('blood-glucose', 'mg/dL', subHours(new Date(), 3), 125, 'device_def456'), // Afternoon
];

// Combine all for general use if needed
export const mockObservations = thirtyDaysOfData;

