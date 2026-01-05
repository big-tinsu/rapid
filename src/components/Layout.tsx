'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Import Navbar with no SSR to prevent hydration issues
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Static placeholder for navbar during SSR */}
      <div className="h-[74px] w-full"></div>
      
      {/* Dynamically loaded Navbar (client-side only) */}
      <Navbar />
      
      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Optional Footer could go here */}
    </div>
  );
} 