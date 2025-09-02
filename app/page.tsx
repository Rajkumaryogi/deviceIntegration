// src/app/page.tsx
'use client';

// --- NEW --- We need useState and useEffect for data fetching
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { SummaryCard } from '@/components/dashboard/SummaryCard';
import { format } from 'date-fns';
import { FaWalking, FaFire, FaHeartbeat } from 'react-icons/fa';
import { IoBed } from 'react-icons/io5';
import { GiMedicalDrip } from 'react-icons/gi';
import { Card } from '@/components/ui/Card';
import { MainLineChart } from '@/components/dashboard/MainLineChart';
import { ChartToggleButton } from '@/components/dashboard/ChartToggleButton';
import { ConnectedDevicesCard } from '@/components/dashboard/ConnectedDevicesCard';
import { Observation, Patient } from '@/types'; // Import your types

// --- NEW --- Define a type for our dashboard data
interface DashboardData {
  patient: {
    first_name: string;
    connected_devices: any[];
  };
  latestObservations: {
    [key: string]: Observation | null;
  };
}

export default function DashboardPage() {
  // --- NEW --- State for data, loading, and errors
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [chartDataType, setChartDataType] = useState<'blood-glucose' | 'steps'>('blood-glucose');
  // Chart data will be populated from the API later if needed, starting empty.
  const [chartData, setChartData] = useState<Observation[]>([]);
  
  // This effect fetches all data when the component mounts
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const apiData: DashboardData = await response.json();
        setData(apiData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []); // Empty array means this runs once on mount

  // This effect fetches the chart data when the toggle button is clicked
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(`/api/observations/${chartDataType}`);
        if (!response.ok) throw new Error('Failed to fetch chart data');
        const chartApiData = await response.json();
        setChartData(chartApiData.reverse());
      } catch (err) {
        // Handle chart-specific error if necessary
      }
    };
    fetchChartData();
  }, [chartDataType]);

  const currentDate = format(new Date(), "eeee, d MMMM");
  
  // --- RENDER A LOADING STATE ---
  if (isLoading) {
    return <div className="text-center text-secondary">Loading Dashboard...</div>;
  }

  // --- RENDER AN ERROR STATE ---
  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // --- RENDER THE DATA-DRIVEN UI ---
  return (
    <>
      <Header />
      
      <main>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-primary-light to-primary rounded-full flex-shrink-0 flex items-center justify-center font-bold text-2xl text-white shadow-lg border-2">
            {data?.patient?.first_name.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Hey, {data?.patient?.first_name || 'User'}!
            </h2>
            <p className="text-base text-secondary mt-1">{currentDate}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          <SummaryCard 
            title="Steps" 
            value={`${data?.latestObservations.steps?.value || 0}`} 
            icon={<FaWalking />}
            colorClass="text-green-400"
            dataType="steps"
          />
          <SummaryCard 
            title="Heart Rate" 
            value={`${data?.latestObservations['heart-rate']?.value || 0} bpm`} 
            icon={<FaHeartbeat />}
            colorClass="text-red-400"
            dataType="heart-rate"
          />
          <SummaryCard 
            title="Sleep" 
            value={`${data?.latestObservations.sleep?.value || 0} hrs`} 
            icon={<IoBed />}
            colorClass="text-purple-400"
            dataType="sleep"
          />
          <SummaryCard 
            title="Blood Glucose" 
            value={`${data?.latestObservations['blood-glucose']?.value || 0} mg/dL`} 
            icon={<GiMedicalDrip />}
            colorClass="text-blue-400"
            dataType="blood-glucose"
          />
          <SummaryCard 
            title="Calories" 
            value="1,200 Kcal" // This can be made dynamic later
            icon={<FaFire />} 
            colorClass="text-orange-400"
            dataType="calories"
          />
        </div>

        <div className="space-y-8">
          {/* --- PASS LIVE DATA TO THE COMPONENT --- */}
          <ConnectedDevicesCard connectedDevices={data?.patient.connected_devices || []} />
          <Card>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h2 className="text-xl font-semibold text-foreground">Health Trends</h2>
              <div className="flex gap-1 p-1 bg-background rounded-lg border border-secondary/10">
                <ChartToggleButton
                  label="Blood Glucose"
                  isActive={chartDataType === 'blood-glucose'}
                  onClick={() => setChartDataType('blood-glucose')}
                />
                <ChartToggleButton
                  label="Steps"
                  isActive={chartDataType === 'steps'}
                  onClick={() => setChartDataType('steps')}
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

