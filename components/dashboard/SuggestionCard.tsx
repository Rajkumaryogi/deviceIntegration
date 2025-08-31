// src/components/dashboard/SuggestionCard.tsx
import { Card } from '@/components/ui/Card';
import { FiThumbsUp } from 'react-icons/fi';

interface SuggestionCardProps {
  title: string;
  suggestion: string;
}

export function SuggestionCard({ title, suggestion }: SuggestionCardProps) {
  return (
    // This wrapper div adds the hover effect
    <div className="transition-transform duration-200 hover:-translate-y-1">
      <Card className="flex items-start gap-4 h-full">
        <div className="p-3 bg-primary/20 rounded-full flex-shrink-0">
          <FiThumbsUp size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-secondary text-sm mt-1">{suggestion}</p>
        </div>
      </Card>
    </div>
  );
}

