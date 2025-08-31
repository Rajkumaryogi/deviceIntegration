// src/components/layout/TabButton.tsx
'use client';

import React from 'react';

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function TabButton({ label, isActive, onClick }: TabButtonProps) {
  // --- STYLING UPDATES APPLIED HERE ---
  const baseStyles = 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out';
  
  const activeStyles = 'bg-primary text-white shadow-lg shadow-primary/30 border';
  
  const inactiveStyles = 'bg-transparent text-secondary hover:bg-card/60';

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${isActive ? activeStyles : inactiveStyles}`}
    >
      {label}
    </button>
  );
}

