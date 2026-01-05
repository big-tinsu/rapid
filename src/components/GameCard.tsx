'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { CasinoGame, getGameColor, getGameIcon } from '@/lib/data/casinoGames';
import { IoPersonOutline } from 'react-icons/io5';
import { useGame } from '@/hooks/useGame';
import { useAuth } from '@/contexts/auth-context';

interface GameCardProps {
  game: CasinoGame;
  onPlay?: (game: CasinoGame) => void;
}

export function GameCard({ game, onPlay }: GameCardProps) {
  const router = useRouter();
  const { token } = useAuth();
  const { launchGame } = useGame();
  const [imageError, setImageError] = useState(false);

  const colors = getGameColor(game.gameId || game.id);
  const icon = getGameIcon(game.gameId || game.id);
  const hasImage = (game.logoURL || game.bannerURL) && !imageError;

  const handlePlay = async () => {
    if (!token) {
      router.push('/auth/login');
      return;
    }

    if (onPlay) {
      onPlay(game);
    } else {
      // Launch the game using the game hook
      try {
        await launchGame(game.gameId || game.id);
      } catch (error) {
        console.error('Failed to launch game:', error);
      }
    }
  };

  return (
    <button
      onClick={handlePlay}
      className='group relative overflow-hidden rounded-xl transition-all duration-300 active:scale-95 md:hover:scale-[1.02] md:hover:shadow-xl focus:outline-none w-full'
    >
      <div className='relative aspect-[4/5] overflow-hidden rounded-xl'>
        {/* Background - either image or gradient */}
        {hasImage ? (
          <Image
            src={game.logoURL || game.bannerURL || ''}
            alt={game.name}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 50vw, 25vw'
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className='absolute inset-0'
            style={{
              background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)`
            }}
          />
        )}

        {/* Decorative circles when no image */}
        {!hasImage && (
          <div className='absolute inset-0 opacity-20'>
            <div className='absolute top-0 right-0 w-16 md:w-32 h-16 md:h-32 rounded-full bg-white/20 -translate-y-1/2 translate-x-1/2' />
            <div className='absolute bottom-0 left-0 w-12 md:w-24 h-12 md:h-24 rounded-full bg-black/20 translate-y-1/2 -translate-x-1/2' />
          </div>
        )}

        {/* Game Icon (when no image) */}
        {!hasImage && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <span className='text-4xl md:text-6xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300'>
              {icon}
            </span>
          </div>
        )}

        {game.multiplier && (
          <div className='absolute top-2 right-2 z-10'>
            <div
              className='font-bold text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-md shadow-lg'
              style={{
                backgroundColor: colors.accent || '#4ade80',
                color: '#000'
              }}
            >
              {game.multiplier}
            </div>
          </div>
        )}

        <div className='hidden md:flex absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center'>
          <div className='bc-button-primary py-2 px-6 text-sm font-bold'>
            Play
          </div>
        </div>

        <div className='absolute bottom-0 left-0 right-0 bg-[var(--bc-bg-card)]/90 backdrop-blur-sm py-2 px-2 md:px-3'>
          <div className='flex items-center justify-between'>
            <span className='text-white font-bold text-[10px] md:text-xs uppercase truncate pr-1'>
              {game.name}
            </span>
          </div>
          <div className='flex items-center justify-between mt-0.5'>
            <span className='text-[var(--bc-text-muted)] text-[8px] md:text-[10px] uppercase'>
              {game.provider || 'Original Game'}
            </span>
            {game.players !== undefined && (
              <div className='flex items-center gap-0.5 text-[var(--bc-text-muted)] text-[8px] md:text-[10px]'>
                <IoPersonOutline className='text-[8px] md:text-xs' />
                <span>{game.players >= 1000 ? `${(game.players / 1000).toFixed(0)}k` : game.players}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
