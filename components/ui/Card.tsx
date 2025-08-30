// components/ui/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    // Added backdrop-blur for a frosted glass effect and a subtle border
    // This looks great on the gradient theme and also works well in solid dark mode
    <div className={`bg-card rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/10 ${className}`}>
      {children}
    </div>
  );
}

