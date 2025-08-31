// src/components/dashboard/SummaryCard.tsx
import React from 'react';
import { Card } from '@/components/ui/Card';
import Link from 'next/link'; // Import the Link component

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  colorClass: string;
  // --- NEW --- Add a 'slug' for the URL
  dataType: 'steps' | 'heart-rate' | 'sleep' | 'blood-glucose' | 'calories';
}

export function SummaryCard({ title, value, icon, colorClass, dataType }: SummaryCardProps) {
  return (
    // Wrap the entire card in a Link component
    <Link href={`/reports/${dataType}`} className="transform hover:scale-105 transition-transform duration-200">
      <Card className="relative overflow-hidden h-full">
        <div className={`absolute top-4 right-4 text-4xl opacity-100 ${colorClass}`}>{icon}</div>
        <p className="text-secondary font-medium">{title}</p>
        <p className="text-2xl font-bold text-foreground mt-2">{value}</p>
        <p className="font-sm  text-foreground mt-2">more..</p>
      </Card>
    </Link>
  );
}
