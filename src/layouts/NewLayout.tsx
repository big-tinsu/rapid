'use client';

import { useState, ReactNode } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TopNav } from '@/components/TopNav';
import BottomNavbar from '@/components/BottomNavbar';
import { LoginBanner } from '@/components/LoginBanner';

interface NewLayoutProps {
  children: ReactNode;
  showHero?: boolean;
}

export default function NewLayout({ children, showHero = false }: NewLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className='bg-[var(--bc-bg-primary)] min-h-screen pb-20 md:pb-0'>
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <TopNav sidebarCollapsed={sidebarCollapsed} />

      {/* Mobile Bottom Navigation */}
      <BottomNavbar />

      <main
        className={`pt-14 md:pt-16 main-transition bg-[var(--bc-bg-primary)] min-h-screen ${
          sidebarCollapsed ? 'md:ml-[70px]' : 'md:ml-64'
        }`}
      >
        {/* Login Banner for non-authenticated users */}
        <LoginBanner />

        {children}
      </main>
    </div>
  );
}
