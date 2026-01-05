'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { TopNav } from '@/components/TopNav';

export function PlaceholderPageLayout() {
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className='bg-[var(--bc-bg-primary,#292D2E)] min-h-screen'>
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <TopNav sidebarCollapsed={sidebarCollapsed} />
      <main className={`pt-20 px-8 py-16 flex items-center justify-center min-h-[calc(100vh-80px)] transition-all ${sidebarCollapsed ? 'ml-[70px]' : 'ml-64'}`}>
        <div className='text-center space-y-6 max-w-md'>
          <div className='text-8xl'>🚧</div>
          <div>
            <h1 className='text-4xl font-black text-white mb-2'>Coming Soon</h1>
            <p className='text-gray-400 text-lg'>
              This section is not yet implemented.
            </p>
          </div>
          <button
            onClick={() => router.push('/casino')}
            className='mt-8 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black font-black py-3 px-8 rounded-lg transition-all inline-block shadow-lg hover:shadow-xl transform hover:scale-105'
          >
            Back to Casino
          </button>
        </div>
      </main>
    </div>
  );
}
