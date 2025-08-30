// components/ui/PageTitle.tsx
import React from 'react';

export function PageTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="text-3xl font-bold text-foreground mb-6">{children}</h1>;
}