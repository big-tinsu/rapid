'use client';

import { CasinoGame } from '@/lib/data/casinoGames';
import { GameCard } from './GameCard';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

interface GameGridProps {
  games: CasinoGame[];
  isLoading?: boolean;
  title?: string;
  showViewAll?: boolean;
  onViewAll?: () => void;
  hasMore?: boolean;
  onLoadMore?: () => void;
  loadingMore?: boolean;
}

export function GameGrid({
  games,
  isLoading = false,
  title,
  showViewAll = false,
  onViewAll,
  hasMore,
  onLoadMore,
  loadingMore = false,
}: GameGridProps) {
  // Skeleton Card Component
  const SkeletonCard = () => (
    <div className='w-[120px] md:w-auto flex-shrink-0 md:flex-shrink'>
      <div className='relative aspect-[4/5] bg-[var(--bc-bg-tertiary)] rounded-xl overflow-hidden'>
        {/* Shimmer effect */}
        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-[var(--bc-bg-secondary)]/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]' />
        {/* Game thumbnail placeholder */}
        <div className='absolute inset-0 bg-gradient-to-b from-[var(--bc-border)] to-[var(--bc-bg-secondary)]' />
        {/* Provider badge placeholder */}
        <div className='absolute top-2 left-2 w-16 h-4 bg-[var(--bc-bg-secondary)] rounded-md' />
        {/* Play button placeholder */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='w-10 h-10 rounded-full bg-[var(--bc-bg-secondary)]' />
        </div>
        {/* Bottom info placeholder */}
        <div className='absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent'>
          <div className='h-3 w-3/4 bg-[var(--bc-bg-secondary)] rounded mb-1' />
          <div className='h-2 w-1/2 bg-[var(--bc-bg-secondary)] rounded' />
        </div>
      </div>
    </div>
  );

  if (isLoading && games.length === 0) {
    return (
      <div className='px-4 md:px-6 py-4 md:py-6'>
        {title && (
          <div className='flex items-center justify-between mb-3'>
            <div className='h-6 w-32 bg-[var(--bc-bg-secondary)] rounded animate-pulse' />
            {showViewAll && (
              <div className='flex items-center gap-2'>
                <div className='w-10 h-7 bg-[var(--bc-bg-secondary)] rounded-lg' />
                <div className='w-7 h-7 bg-[var(--bc-bg-secondary)] rounded-lg' />
                <div className='w-7 h-7 bg-[var(--bc-bg-secondary)] rounded-lg' />
              </div>
            )}
          </div>
        )}
        {/* Horizontal scroll on mobile, grid on desktop - same as actual games */}
        <div className='overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible'>
          <div className='flex md:grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 md:gap-4 min-w-max md:min-w-0'>
            {[...Array(14)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isLoading && games.length === 0) {
    return (
      <div className='px-4 md:px-6 py-12 text-center'>
        <div className='text-4xl mb-3'>🎲</div>
        <p className='text-white text-base font-semibold'>No games found</p>
        <p className='text-[var(--bc-text-muted)] text-xs mt-1'>Try adjusting your search</p>
      </div>
    );
  }

  return (
    <div className='px-4 md:px-6 py-4'>
      {title && (
        <div className='flex items-center justify-between mb-3'>
          <h2 className='text-white font-bold text-base md:text-lg'>{title}</h2>
          {showViewAll && (
            <div className='flex items-center gap-2'>
              <button
                onClick={onViewAll}
                className='px-3 py-1.5 bg-[var(--bc-bg-secondary)] text-white text-xs font-medium rounded-lg hover:bg-[var(--bc-border)] transition-colors'
              >
                All
              </button>
              <button className='w-7 h-7 flex items-center justify-center bg-[var(--bc-bg-secondary)] rounded-lg text-[var(--bc-text-muted)] hover:text-white transition-colors'>
                <IoChevronBack className='text-sm' />
              </button>
              <button className='w-7 h-7 flex items-center justify-center bg-[var(--bc-bg-secondary)] rounded-lg text-[var(--bc-text-muted)] hover:text-white transition-colors'>
                <IoChevronForward className='text-sm' />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className='overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible'>
        <div className='flex md:grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 md:gap-4 min-w-max md:min-w-0'>
          {games.map((game) => (
            <div key={game.id} className='w-[120px] md:w-auto flex-shrink-0 md:flex-shrink'>
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      {hasMore && onLoadMore && (
        <div className='flex justify-center mt-6'>
          <button
            onClick={onLoadMore}
            disabled={loadingMore}
            className='px-6 py-2 bg-[var(--bc-bg-secondary)] text-white text-sm font-medium rounded-lg hover:bg-[var(--bc-border)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loadingMore ? 'Loading...' : 'Load More Games'}
          </button>
        </div>
      )}

      {/* Loading more indicator */}
      {loadingMore && (
        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 md:gap-4 mt-4'>
          {[...Array(7)].map((_, i) => (
            <div
              key={`loading-${i}`}
              className='aspect-[4/5] bg-[var(--bc-bg-secondary)] rounded-xl animate-pulse'
            />
          ))}
        </div>
      )}
    </div>
  );
}
