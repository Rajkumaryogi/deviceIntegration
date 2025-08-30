// components/dashboard/SummaryCard.tsx
import React from 'react';
import { Card } from '@/components/ui/Card';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  colorClass: string;
}

export function SummaryCard({ title, value, icon, colorClass }: SummaryCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute top-4 right-4 text-4xl opacity-90 ${colorClass}`}>{icon}</div>
      <p className="text-secondary font-medium">{title}</p>
      <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
    </Card>
  );
}