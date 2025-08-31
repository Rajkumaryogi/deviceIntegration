// src/components/layout/Header.tsx
'use client'; 

import React from 'react';
import { mockPatient } from '@/data/mockData';
import { FiSettings, FiBell } from 'react-icons/fi';
import { ThemeToggleButton } from './ThemeToggleButton';

export function Header() {
  return (
    // The new header has a bottom border for a clean separation
    <header className="flex justify-between items-center mb-8 border-b border-secondary/20 pb-4">
      {/* Left Side: Logo and Brand Name */}
      <div className="flex items-center gap-3">
        {/* Simple SVG logo - 'currentColor' makes it adapt to themes */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
        >
          <path
            d="M3 12H6L9 3L15 21L18 12H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-bold text-2xl text-foreground">Vitals7</span>
      </div>

      {/* Right Side: Icons and User Avatar are grouped together */}
      <div className="flex items-center gap-2 md:gap-4">
        <ThemeToggleButton />
        <button className="p-2.5 rounded-full hover:bg-card transition-colors" aria-label="Notifications">
          <FiBell size={22} className="text-secondary" />
        </button>
        <button className="p-2.5 rounded-full hover:bg-card transition-colors" aria-label="Settings">
          <FiSettings size={22} className="text-secondary" />
        </button>
      </div>
    </header>
  );
}

