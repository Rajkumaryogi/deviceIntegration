// components/dashboard/MainLineChart.tsx
'use client';

import React from 'react';
import { Observation } from '@/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface MainLineChartProps {
  data: Observation[];
}

export function MainLineChart({ data }: MainLineChartProps) {
  const formatDate = (tickItem: string) => format(new Date(tickItem), 'MMM d');
  const getUnit = () => data[0]?.unit || '';

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid stroke="var(--secondary)" strokeOpacity={0.3} strokeDasharray="3 3" />
          <XAxis dataKey="effective_date_time" tickFormatter={formatDate} stroke="var(--secondary)" />
          <YAxis stroke="var(--secondary)" />
          <Tooltip
            contentStyle={{ 
              backgroundColor: 'var(--card)', 
              borderColor: 'var(--secondary)'
            }}
            labelFormatter={(label) => format(new Date(label), 'eeee, MMM d')}
            formatter={(value) => [`${value} ${getUnit()}`, 'Value']}
          />
          <Legend wrapperStyle={{ color: 'var(--foreground)' }} />
          <Line type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}