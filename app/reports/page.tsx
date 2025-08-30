// app/reports/page.tsx
'use client';

import { useState } from 'react';
import { PageTitle } from '@/components/ui/PageTitle';
import { MainLineChart } from '@/components/dashboard/MainLineChart';
import { TabButton } from '@/components/layout/TabButton';
import { mockObservations } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Observation } from '@/types';

type DataType = 'blood-glucose' | 'steps' | 'heart-rate' | 'sleep';
type TimeFrame = 'Daily' | 'Weekly' | 'Monthly';

export default function ReportsPage() {
  const [dataType, setDataType] = useState<DataType>('steps');
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('Weekly');

  const filteredData = mockObservations.filter(obs => obs.type === dataType);

  return (
    <main>
      <PageTitle>Health Reports</PageTitle>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        {/* Metric Selector */}
        <label htmlFor="metric-select" className="sr-only">Select Metric</label>
        <select 
          id="metric-select"
          aria-label="Select Metric"
          value={dataType} 
          onChange={(e) => setDataType(e.target.value as DataType)}
          className="bg-card border border-secondary/20 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="steps">Steps</option>
          <option value="blood-glucose">Blood Glucose</option>
          <option value="heart-rate">Heart Rate</option>
          <option value="sleep">Sleep</option>
        </select>

        {/* Timeframe Tabs */}
        <div className="flex gap-2 p-1 bg-card rounded-lg">
          {(['Daily', 'Weekly', 'Monthly'] as TimeFrame[]).map(frame => (
            <TabButton 
              key={frame}
              label={frame}
              isActive={timeFrame === frame}
              onClick={() => setTimeFrame(frame)}
            />
          ))}
        </div>
      </div>
      <Card>
        <MainLineChart data={filteredData} />
      </Card>
    </main>
  );
}