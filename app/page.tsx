// app/page.tsx
'use client';

import { Header } from '@/components/layout/Header';
import { SummaryCard } from '@/components/dashboard/SummaryCard';
import { mockPatient } from '@/data/mockData'; // Import mockPatient
import { format } from 'date-fns'; // Import date-fns
import { FaWalking, FaFire, FaHeartbeat } from 'react-icons/fa';
import { IoBed } from 'react-icons/io5';
import { GiMedicalDrip } from 'react-icons/gi';
import { Card } from '@/components/ui/Card';
import { MainLineChart } from '@/components/dashboard/MainLineChart';
import { Button } from '@/components/ui/Button';
import { mockObservations } from '@/data/mockData'; // Import mockObservations
import React from 'react';

export default function DashboardPage() {
  const latestSteps = mockObservations.find(obs => obs.type === 'steps');
  const latestHeartRate = mockObservations.find(obs => obs.type === 'heart-rate');
  const latestSleep = mockObservations.find(obs => obs.type === 'sleep');
  const latestGlucose = mockObservations.find(obs => obs.type === 'blood-glucose');
  const [dataType, setDataType] = React.useState<'blood-glucose' | 'steps'>('blood-glucose');
  const chartData = mockObservations.filter(obs => obs.type === dataType);

  // Get the current date for the greeting
  const currentDate = format(new Date(), "eeee, d MMMM");

  return (
    <>
      {/* The Header component is now cleaner */}
      <Header />
      
      <main>
        {/* The greeting has been moved here to be the page's main title */}
        <div className="mb-8">
          
          <h2 className="text-3xl font-bold text-foreground">
            Hey, {mockPatient.first_name}!
          </h2>
          <p className="text-base text-secondary mt-1">{currentDate}</p>
        </div>

        {/* The rest of your dashboard content remains the same */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          <SummaryCard 
            title="Steps" 
            value={`${latestSteps?.value || 0}`} 
            icon={<FaWalking />}
            colorClass="text-green-400"
          />
          <SummaryCard 
            title="Heart Rate" 
            value={`${latestHeartRate?.value || 0} bpm`} 
            icon={<FaHeartbeat />}
            colorClass="text-red-400"
          />
          <SummaryCard 
            title="Sleep" 
            value={`${latestSleep?.value || 0} hrs`} 
            icon={<IoBed />}
            colorClass="text-purple-400"
          />
          <SummaryCard 
            title="Blood Glucose" 
            value={`${latestGlucose?.value || 0} mg/dL`} 
            icon={<GiMedicalDrip />}
            colorClass="text-blue-400"
          />
          <SummaryCard 
            title="Calories" 
            value="1,200 Kcal"
            icon={<FaFire />}
            colorClass="text-orange-400"
          />
        </div>
        <Card>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <h2 className="text-xl font-semibold text-foreground">Health Trends</h2>
            <div className="flex gap-2">
              <Button
                onClick={() => setDataType('blood-glucose')}
                variant={dataType === 'blood-glucose' ? 'primary' : 'secondary'}
              >
                Blood Glucose
              </Button>
              <Button
                onClick={() => setDataType('steps')}
                variant={dataType === 'steps' ? 'primary' : 'secondary'}
              >
                Steps
              </Button>
            </div>
          </div>
          <MainLineChart data={chartData} />
        </Card>
      </main>
    </>
  );
}

