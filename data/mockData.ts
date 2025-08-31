// src/data/mockData.ts
import { Patient, Observation } from '@/types';
import { subDays, formatISO, subHours } from 'date-fns';

// --- PATIENT AND DEVICE INFO ---
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

// --- STATIC, PRE-DEFINED DATA (FIXES HYDRATION ERROR) ---

// Helper to create an observation
const createObservation = (type: Observation['type'], unit: string, date: Date, value: number, deviceId: string): Observation => ({
  _id: crypto.randomUUID(),
  patient_id: 'p1',
  device_id: deviceId,
  type,
  unit,
  effective_date_time: formatISO(date),
  value,
});

// Static arrays of values to create a realistic but consistent pattern
const stepValues = [8500, 7200, 10200, 9100, 6500, 11500, 7800, 8900, 9500, 10500, 6800, 7500, 12000, 8200, 9300, 9700, 11000, 7100, 8300, 10800, 9900, 8800, 7600, 11200, 10100, 9400, 8100, 7900, 10300, 9200];
const sleepValues = [7.5, 6.8, 8.1, 7.2, 6.5, 7.8, 7.1, 7.6, 7.3, 8.0, 6.9, 7.4, 8.2, 7.0, 7.7, 7.9, 8.3, 6.7, 7.5, 8.4, 7.8, 7.2, 6.9, 8.1, 7.7, 7.9, 7.3, 7.1, 8.0, 7.6];
const heartRateValues = [68, 72, 65, 69, 74, 67, 71, 66, 70, 73, 68, 69, 64, 72, 67, 69, 66, 73, 70, 65, 68, 71, 74, 66, 69, 72, 67, 70, 65, 68];
const glucoseMorning = [95, 102, 98, 105, 93, 100, 103, 97, 101, 104, 96, 99, 106, 94, 102, 100, 98, 105, 95, 103, 101, 97, 104, 96, 102, 99, 106, 98, 101, 95];
const glucoseAfternoon = [125, 130, 120, 135, 115, 128, 132, 123, 129, 138, 122, 127, 140, 118, 133, 126, 131, 137, 121, 134, 128, 124, 136, 120, 130, 125, 139, 127, 129, 122];

// Generate 30 Days of consistent, historical data
const thirtyDaysOfData: Observation[] = [];
for (let i = 0; i < 30; i++) {
  const date = subDays(new Date(), i);
  thirtyDaysOfData.push(createObservation('steps', 'steps', date, stepValues[i % stepValues.length], 'device_abc123'));
  thirtyDaysOfData.push(createObservation('sleep', 'hours', date, sleepValues[i % sleepValues.length], 'device_abc123'));
  thirtyDaysOfData.push(createObservation('heart-rate', 'bpm', date, heartRateValues[i % heartRateValues.length], 'device_abc123'));
  thirtyDaysOfData.push(createObservation('blood-glucose', 'mg/dL', subHours(date, 16), glucoseMorning[i % glucoseMorning.length], 'device_def456'));
  thirtyDaysOfData.push(createObservation('blood-glucose', 'mg/dL', subHours(date, 8), glucoseAfternoon[i % glucoseAfternoon.length], 'device_def456'));
}

// --- EXPORT TIME FRAMES ---
export const mockMonthlyObservations = thirtyDaysOfData;
export const mockWeeklyObservations = thirtyDaysOfData.slice(0, 14); // Use first 14 days for weekly view to get enough points
export const mockDailyObservations: Observation[] = [
    createObservation('steps', 'steps', subHours(new Date(), 2), 2500, 'device_abc123'),
    createObservation('steps', 'steps', subHours(new Date(), 8), 4000, 'device_abc123'),
    createObservation('heart-rate', 'bpm', subHours(new Date(), 1), 72, 'device_abc123'),
    createObservation('heart-rate', 'bpm', subHours(new Date(), 6), 65, 'device_abc123'),
    createObservation('blood-glucose', 'mg/dL', subHours(new Date(), 10), 95, 'device_def456'),
    createObservation('blood-glucose', 'mg/dL', subHours(new Date(), 3), 125, 'device_def456'),
];

export const mockObservations = thirtyDaysOfData;

