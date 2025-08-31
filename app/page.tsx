// src/app/page.tsx
'use client';

import { Header } from '@/components/layout/Header';
import { SummaryCard } from '@/components/dashboard/SummaryCard';
import { mockPatient } from '@/data/mockData';
import { format } from 'date-fns';
import { FaWalking, FaFire, FaHeartbeat } from 'react-icons/fa';
import { IoBed } from 'react-icons/io5';
import { GiMedicalDrip } from 'react-icons/gi';
import { Card } from '@/components/ui/Card';
import { MainLineChart } from '@/components/dashboard/MainLineChart';
import { Button } from '@/components/ui/Button';
import { mockObservations } from '@/data/mockData';
import React from 'react';
import { ConnectedDevicesCard } from '@/components/dashboard/ConnectedDevicesCard';
import { ChartToggleButton } from '@/components/dashboard/ChartToggleButton';

export default function DashboardPage() {
  const latestSteps = mockObservations.find(obs => obs.type === 'steps');
  const latestHeartRate = mockObservations.find(obs => obs.type === 'heart-rate');
  const latestSleep = mockObservations.find(obs => obs.type === 'sleep');
  const latestGlucose = mockObservations.find(obs => obs.type === 'blood-glucose');
  const [dataType, setDataType] = React.useState<'blood-glucose' | 'steps'>('blood-glucose');
  const chartData = mockObservations.filter(obs => obs.type === dataType);
  
  const currentDate = format(new Date(), "eeee, d MMMM");
  
  return (
    <>
      <Header />
      
      <main>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-primary-light to-primary rounded-full flex-shrink-0 flex items-center justify-center font-bold text-2xl text-white shadow-lg border-2">
            {mockPatient.first_name.charAt(0)}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Hey, {mockPatient.first_name}!
            </h2>
            <p className="text-base text-secondary mt-1">{currentDate}</p>
          </div>
        </div>
        <div className="mb-8">
                  <ConnectedDevicesCard />
        </div>
        
        {/* --- FIX APPLIED HERE --- */}
        {/* The 'dataType' prop has been added to each SummaryCard */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          <SummaryCard 
            title="Steps" 
            value={`${latestSteps?.value || 0}`} 
            icon={<FaWalking />}
            colorClass="text-green-400"
            dataType="steps" // <-- ADD THIS LINE
          />
          <SummaryCard 
            title="Heart Rate" 
            value={`${latestHeartRate?.value || 0} bpm`} 
            icon={<FaHeartbeat />}
            colorClass="text-red-400"
            dataType="heart-rate" // <-- ADD THIS LINE
          />
          <SummaryCard 
            title="Sleep" 
            value={`${latestSleep?.value || 0} hrs`} 
            icon={<IoBed />}
            colorClass="text-purple-400"
            dataType="sleep" // <-- ADD THIS LINE
          />
          <SummaryCard 
            title="Blood Glucose" 
            value={`${latestGlucose?.value || 0} mg/dL`} 
            icon={<GiMedicalDrip />}
            colorClass="text-blue-400"
            dataType="blood-glucose" // <-- ADD THIS LINE
          />
          <SummaryCard 
            title="Calories" 
            value="1,200 Kcal"
            icon={<FaFire />} 
            colorClass="text-orange-400"
            dataType="calories" // <-- ADD THIS LINE
          />
        </div>

        <div className="space-y-8">
          <Card>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h2 className="text-xl font-semibold text-foreground">Health Trends</h2>
              <div className="flex gap-1 p-1 bg-background rounded-lg">
                <ChartToggleButton
                  label="Blood Glucose"
                  isActive={dataType === 'blood-glucose'}
                  onClick={() => setDataType('blood-glucose')}
                />
                <ChartToggleButton
                  label="Steps"
                  isActive={dataType === 'steps'}
                  onClick={() => setDataType('steps')}
                />
              </div>
            </div>
            <MainLineChart data={chartData} />
          </Card>
        </div>
      </main>
    </>
  );
}

