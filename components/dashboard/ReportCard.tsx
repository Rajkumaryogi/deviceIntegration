// src/components/dashboard/ReportCard.tsx
import { Card } from '@/components/ui/Card';

interface ReportCardProps {
  title: string;
  value: string;
  goal: string;
}

export function ReportCard({ title, value, goal }: ReportCardProps) {
  return (
    // This wrapper div adds the hover effect
    <div className="transition-transform duration-200 hover:-translate-y-1">
      <Card>
        <p className="text-secondary font-medium">{title}</p>
        <p className="text-4xl font-bold text-foreground mt-2">{value}</p>
        <p className="text-sm text-primary mt-1">{goal}</p>
      </Card>
    </div>
  );
}

