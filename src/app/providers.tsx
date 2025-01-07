"use client"
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@vercel/analytics/react';

function Providers({ children }: { children: React.ReactNode }) {
  return (
 <>
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
      <Analytics/>
    </>
  );
}

export default Providers;
