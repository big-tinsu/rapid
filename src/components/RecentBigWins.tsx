'use client';

import { useState } from 'react';

interface RecentBigWinsProps {
  onFilterChange?: (filter: string) => void;
}

const filters = [
  { id: 'all', label: 'All' },
  { id: 'originals', label: 'BC Originals' },
  { id: 'slots', label: 'Slots' },
  { id: 'live-casino', label: 'Live Casino' },
];

export function RecentBigWins({ onFilterChange }: RecentBigWinsProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    onFilterChange?.(filterId);
  };

  return (
    <div className='flex items-center gap-4 px-4 py-3 overflow-x-auto scrollbar-hide'>
      <div className='flex items-center gap-2 flex-shrink-0'>
        <div className='w-2 h-2 rounded-full bg-[var(--bc-accent-green)] animate-pulse' />
        <span className='text-white font-semibold text-sm whitespace-nowrap'>Recent Big Wins</span>
      </div>

      <div className='flex items-center gap-2'>
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleFilterChange(filter.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeFilter === filter.id
                ? 'bg-[var(--bc-accent-green)]/15 text-[var(--bc-accent-green)]'
                : 'text-[var(--bc-text-secondary)] hover:text-white'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
