// types/index.ts
export interface Device {
  device_id: string;
  type: 'fitbit' | 'omron' | 'dexcom';
  model: string;
  connected_on: string; // ISO Date String
}

export interface Patient {
  cognito_id: string;
  first_name: string;
  last_name: string;
  birth_date: string; // ISO Date String
  connected_devices: Device[];
}

export interface Observation {
  _id: string;
  patient_id: string;
  device_id: string;
  type: 'blood-glucose' | 'steps' | 'heart-rate' | 'sleep';
  effective_date_time: string; // ISO Date String
  value: number;
  unit: string;
}
