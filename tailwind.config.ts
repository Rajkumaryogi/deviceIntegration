import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  
  // --- FIX APPLIED HERE ---
  // Update the paths to look inside the new 'src' directory.
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          light: 'var(--primary-light)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
        },
        gradientFrom: 'var(--gradient-from)',
      },
    },
  },
  plugins: [],
};
export default config;

