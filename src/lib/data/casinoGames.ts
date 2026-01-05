import { Game } from "@/types/new/game";

// Casino game types (categories)
export type GameCategory =
  | 'lobby'
  | 'originals'
  | 'exclusive'
  | 'hot-games'
  | 'slots'
  | 'live-casino'
  | 'feature-buy-in'
  | 'new-releases'
  | 'burst-games'
  | 'poker'
  | 'bingo';

// Extended game interface for UI display
export interface CasinoGame extends Game {
  category?: GameCategory;
  isFeatured?: boolean;
  isNew?: boolean;
  multiplier?: string;
  players?: number;
}

// Transform API game to CasinoGame with additional UI properties
export function transformGameToUI(game: Game): CasinoGame {
  // Generate random multiplier for demo (in real app, this would come from API)
  const hasMultiplier = Math.random() > 0.5;
  const multiplier = hasMultiplier ? `${(Math.random() * 100 + 1).toFixed(2)}x` : undefined;

  // Random player count for demo
  const players = Math.floor(Math.random() * 500) + 50;

  return {
    ...game,
    isFeatured: Math.random() > 0.7,
    isNew: Math.random() > 0.8,
    multiplier,
    players,
  };
}

// Transform array of games
export function transformGamesToUI(games: Game[]): CasinoGame[] {
  return games.map(transformGameToUI);
}

// Game colors for UI styling
export const GAME_COLORS: Record<string, { from: string; to: string; accent?: string }> = {
  'crash': { from: '#8b5cf6', to: '#4c1d95', accent: '#a78bfa' },
  'bubble-shooter': { from: '#14b8a6', to: '#0f766e', accent: '#5eead4' },
  'boom-blast': { from: '#f59e0b', to: '#b45309', accent: '#fcd34d' },
  'limbo': { from: '#22c55e', to: '#15803d', accent: '#86efac' },
  'plinko': { from: '#10b981', to: '#047857', accent: '#6ee7b7' },
  'roulette': { from: '#3b82f6', to: '#1d4ed8', accent: '#93c5fd' },
  'ultimate-dice': { from: '#06b6d4', to: '#0e7490', accent: '#67e8f9' },
  'jade': { from: '#6366f1', to: '#4338ca', accent: '#a5b4fc' },
  'mines': { from: '#ef4444', to: '#b91c1c', accent: '#fca5a5' },
  'coin-flip': { from: '#eab308', to: '#a16207', accent: '#fde047' },
  'classic-dice': { from: '#ec4899', to: '#be185d', accent: '#f9a8d4' },
  'slots': { from: '#7c3aed', to: '#5b21b6', accent: '#c4b5fd' },
  'live-casino': { from: '#dc2626', to: '#991b1b', accent: '#fca5a5' },
  'poker': { from: '#059669', to: '#047857', accent: '#6ee7b7' },
  'default': { from: '#6b7280', to: '#374151', accent: '#9ca3af' },
};

// Game icons for UI display
export const GAME_ICONS: Record<string, string> = {
  'crash': '🚀',
  'bubble-shooter': '🫧',
  'boom-blast': '💣',
  'limbo': '⬇️',
  'plinko': '🎯',
  'roulette': '🎡',
  'ultimate-dice': '🎲',
  'jade': '💎',
  'mines': '💣',
  'coin-flip': '🪙',
  'classic-dice': '🎲',
  'sweet-bonanza': '🍬',
  'dragon-tower': '🐉',
  'wheel': '🎰',
  'slots': '🎰',
  'poker': '🃏',
  'live-casino': '🎲',
  'bingo': '🎱',
  'default': '🎮',
};

// Get game color based on game ID or name
export function getGameColor(gameIdOrName: string): { from: string; to: string; accent?: string } {
  const normalizedId = gameIdOrName.toLowerCase().replace(/\s+/g, '-');
  return GAME_COLORS[normalizedId] || GAME_COLORS['default'];
}

// Get game icon based on game ID or name
export function getGameIcon(gameIdOrName: string): string {
  const normalizedId = gameIdOrName.toLowerCase().replace(/\s+/g, '-');
  return GAME_ICONS[normalizedId] || GAME_ICONS['default'];
}
