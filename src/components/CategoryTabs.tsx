'use client';

import { CATEGORY_TABS } from '@/lib/constants/routes';
import { IoHome, IoStar, IoFlame, IoApps, IoPlay, IoTv, IoDice, IoCaretForward } from 'react-icons/io5';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const tabIcons: Record<string, React.ReactNode> = {
  'lobby': <IoHome className="text-sm" />,
  'originals': <IoStar className="text-sm" />,
  'hot-games': <IoFlame className="text-sm" />,
  'slots': <IoApps className="text-sm" />,
  'live-casino': <IoPlay className="text-sm" />,
  'game-shows': <IoTv className="text-sm" />,
  'table-games': <IoDice className="text-sm" />,
};

export function CategoryTabs({
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className='bg-[var(--bc-bg-secondary)] overflow-x-auto sticky top-14 md:top-16 z-20 scrollbar-hide'>
      <div className='flex gap-1 px-4 md:px-6 min-w-max py-2'>
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onCategoryChange(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2 whitespace-nowrap font-medium text-xs md:text-sm transition-all duration-200 rounded-lg ${
              activeCategory === tab.id
                ? 'bg-[var(--bc-accent-green)]/10 text-[var(--bc-accent-green)]'
                : 'text-[var(--bc-text-secondary)] hover:text-white hover:bg-white/5'
            }`}
          >
            {tabIcons[tab.id]}
            <span>{tab.label}</span>
          </button>
        ))}
        
        <button className='flex items-center justify-center w-8 h-8 text-[var(--bc-text-muted)]'>
          <IoCaretForward className="text-sm" />
        </button>
      </div>
    </div>
  );
}
