// components/layout/TabButton.tsx
import React from 'react';

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function TabButton({ label, isActive, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
        isActive ? 'bg-primary text-white' : 'bg-background text-secondary hover:brightness-95 dark:hover:brightness-125'
      }`}
    >
      {label}
    </button>
  );
}