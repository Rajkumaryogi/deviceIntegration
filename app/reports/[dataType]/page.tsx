// src/app/reports/[dataType]/page.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  mockDailyObservations, 
  mockWeeklyObservations, 
  mockMonthlyObservations 
} from '@/data/mockData';
import { MainLineChart } from '@/components/dashboard/MainLineChart';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TabButton } from '@/components/layout/TabButton';
import { ReportCard } from '@/components/dashboard/ReportCard';
import { SuggestionCard } from '@/components/dashboard/SuggestionCard';
import { FaChevronLeft } from 'react-icons/fa';
import { Observation } from '@/types';

type DataType = 'blood-glucose' | 'steps' | 'heart-rate' | 'sleep' | 'calories';
type TimeFrame = 'Daily' | 'Weekly' | 'Monthly';

const capitalize = (s: string) => s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

export default function ReportPage() {
  const router = useRouter();
  const params = useParams();
  const dataType = params.dataType as DataType;

  const [timeFrame, setTimeFrame] = useState<TimeFrame>('Weekly');
  const [chartData, setChartData] = useState<Observation[]>([]);

  useEffect(() => {
    let dataSet;
    switch (timeFrame) {
      case 'Daily':
        dataSet = mockDailyObservations;
        break;
      case 'Weekly':
        dataSet = mockWeeklyObservations;
        break;
      case 'Monthly':
        dataSet = mockMonthlyObservations;
        break;
      default:
        dataSet = mockWeeklyObservations;
    }
    setChartData(dataSet.filter(obs => obs.type === dataType));
  }, [timeFrame, dataType]);

  const { average, unit } = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return { average: 'N/A', unit: '' };
    }
    const sum = chartData.reduce((acc, obs) => acc + obs.value, 0);
    const avg = sum / chartData.length;
    const firstUnit = chartData[0].unit;

    if (firstUnit === 'hours') {
      return { average: avg.toFixed(1), unit: firstUnit };
    }
    return { average: Math.round(avg).toLocaleString(), unit: firstUnit };
  }, [chartData]);

  const reportGoals = {
    'steps': 'Goal: 10,000 steps daily',
    'heart-rate': 'Goal Avg: 60-80 bpm',
    'sleep': 'Goal: 8 hrs',
    'blood-glucose': 'Goal Avg: 90-130 mg/dL',
    'calories': 'Goal: 1,800 Kcal'
  };

  const pageTitle = capitalize(dataType);

  return (
    <main>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="secondary" onClick={() => router.back()} className="p-2.5 rounded-full">
          <FaChevronLeft />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">
          {pageTitle} Report
        </h1>
      </div>

      <div className="flex justify-center mb-8">
        {/* The updated container for the TabButtons */}
        <div className="flex gap-2 p-1.5 bg-card rounded-xl">
          {(['Daily', 'Weekly', 'Monthly'] as TimeFrame[]).map((frame) => (
            <TabButton
              key={frame}
              label={frame}
              isActive={timeFrame === frame}
              onClick={() => setTimeFrame(frame)}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <ReportCard
            title={`${timeFrame} Average`}
            value={`${average} ${unit}`}
            goal={reportGoals[dataType] || ''}
          />
          <Card>
            {chartData.length > 0 ? (
              <MainLineChart data={chartData} />
            ) : (
              <div className="h-[350px] flex items-center justify-center text-secondary">
                No data available for this period.
              </div>
            )}
          </Card>
        </div>
        <div className="space-y-6">
          <SuggestionCard 
            title="Today's Tip"
            suggestion="Consistent sleep is key! Try to go to bed and wake up at the same time each day to improve your sleep quality and heart health."
          />
           <SuggestionCard 
            title="Weekly Goal"
            suggestion="You're close to your step goal! A brisk 20-minute walk each day this week will help you reach it."
          />
        </div>
      </div>
    </main>
  );
}

