import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/app/providers/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Health Dashboard',
  description: 'A unified view of your health data.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning is recommended when using a theme provider
    // that relies on localStorage to avoid a server/client mismatch.
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        {/* The ThemeProvider wraps everything, making the theme available globally */}
        <ThemeProvider>
          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

