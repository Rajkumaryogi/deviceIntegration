// data/mockData.ts
import { Patient, Observation } from '@/types';
import { subDays, formatISO } from 'date-fns';

export const mockPatient: Patient = {
  cognito_id: 'us-east-1:xxxxxxxx-xxxx',
  first_name: 'Jane',
  last_name: 'Doe',
  birth_date: formatISO(new Date('1985-05-15')),
  connected_devices: [
    { device_id: 'device_abc123', type: 'fitbit', model: 'Charge 5', connected_on: formatISO(new Date()) },
    { device_id: 'device_def456', type: 'omron', model: 'Evolv', connected_on: formatISO(subDays(new Date(), 30)) },
    { device_id: 'device_ghi789', type: 'dexcom', model: 'G6', connected_on: formatISO(subDays(new Date(), 90)) },
  ],
};

export const mockObservations: Observation[] = [
  // Blood Glucose Data
  { _id: '1', patient_id: 'p1', device_id: 'device_def456', type: 'blood-glucose', effective_date_time: formatISO(subDays(new Date(), 1)), value: 110, unit: 'mg/dL' },
  { _id: '2', patient_id: 'p1', device_id: 'device_def456', type: 'blood-glucose', effective_date_time: formatISO(subDays(new Date(), 2)), value: 140, unit: 'mg/dL' },
  { _id: '3', patient_id: 'p1', device_id: 'device_def456', type: 'blood-glucose', effective_date_time: formatISO(subDays(new Date(), 3)), value: 95, unit: 'mg/dL' },

  // Steps Data
  { _id: '6', patient_id: 'p1', device_id: 'device_abc123', type: 'steps', effective_date_time: formatISO(subDays(new Date(), 1)), value: 8500, unit: 'steps' },
  { _id: '7', patient_id: 'p1', device_id: 'device_abc123', type: 'steps', effective_date_time: formatISO(subDays(new Date(), 2)), value: 7200, unit: 'steps' },
  { _id: '8', patient_id: 'p1', device_id: 'device_abc123', type: 'steps', effective_date_time: formatISO(subDays(new Date(), 3)), value: 10200, unit: 'steps' },


  // Heart Rate Data
  { _id: '11', patient_id: 'p1', device_id: 'device_abc123', type: 'heart-rate', effective_date_time: formatISO(new Date()), value: 72, unit: 'bpm' },
  { _id: '12', patient_id: 'p1', device_id: 'device_abc123', type: 'heart-rate', effective_date_time: formatISO(subDays(new Date(), 1)), value: 68, unit: 'bpm' },
  
  // Sleep Data
  { _id: '13', patient_id: 'p1', device_id: 'device_abc123', type: 'sleep', effective_date_time: formatISO(subDays(new Date(), 1)), value: 7.5, unit: 'hours' },
  { _id: '14', patient_id: 'p1', device_id: 'device_abc123', type: 'sleep', effective_date_time: formatISO(subDays(new Date(), 2)), value: 6.8, unit: 'hours' },
];
