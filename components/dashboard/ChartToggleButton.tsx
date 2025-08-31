// src/components/dashboard/ChartToggleButton.tsx
'use client';

import React from 'react';

interface ChartToggleButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function ChartToggleButton({ label, isActive, onClick }: ChartToggleButtonProps) {
  // Define styles for a more polished look
  const baseStyles = 'px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ease-in-out';
  
  // The active button "pops" with a shadow and primary color
  const activeStyles = 'bg-primary text-white shadow-md shadow-primary/30 border';
  
  // The inactive button is more subtle with a clear hover effect
  const inactiveStyles = 'text-secondary hover:text-foreground';

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${isActive ? activeStyles : inactiveStyles}`}
    >
      {label}
    </button>
  );
}
