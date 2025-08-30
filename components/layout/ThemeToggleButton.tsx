// components/layout/ThemeToggleButton.tsx
'use client';

import { useTheme } from '@/app/providers/ThemeProvider';
import { FiSun, FiMoon } from 'react-icons/fi';

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-full hover:bg-card transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <FiMoon size={22} className="text-secondary" />
      ) : (
        <FiSun size={22} className="text-secondary" />
      )}
    </button>
  );
}

