'use client';

import { useLatestBets } from '@/hooks/useLatestBets';
import { formatCurrency } from '@/utils/currency';
import { getGameIcon } from '@/lib/data/casinoGames';

// Mask username for privacy
function maskUsername(username: string): string {
  if (!username || username.length <= 3) return username;
  const first = username.slice(0, 2);
  const last = username.slice(-2);
  return `${first}***${last}`;
}

// Format date/time
function formatTime(date: Date): string {
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

export function LatestBetsTable() {
  const { bets, loading, error, refetch } = useLatestBets();

  if (loading && bets.length === 0) {
    return (
      <div className="px-4 md:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 w-48 bg-[var(--bc-bg-secondary)] rounded animate-pulse" />
        </div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-[var(--bc-bg-secondary)] rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 md:px-6 py-8">
        <div className="text-center py-8">
          <p className="text-red-400 text-sm">{error}</p>
          <button
            onClick={refetch}
            className="mt-2 px-4 py-2 bg-[var(--bc-bg-secondary)] text-white text-sm rounded-lg hover:bg-[var(--bc-border)] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-white font-bold text-lg">Latest Wins</h2>

        <div className="flex">
          <button
            onClick={refetch}
            className="px-6 py-2 bg-[var(--bc-bg-secondary)] text-white font-medium rounded-lg text-sm hover:bg-[var(--bc-border)] transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-[var(--bc-text-muted)] text-sm bg-[var(--bc-bg-primary)]">
              <th className="text-left py-3 px-4 font-medium">Game</th>
              <th className="text-left py-3 px-4 font-medium">Player</th>
              <th className="text-left py-3 px-4 font-medium">Time</th>
              <th className="text-right py-3 px-4 font-medium">Amount Won</th>
            </tr>
          </thead>
          <tbody>
            {bets.map((bet, index) => {
              const gameIcon = getGameIcon(bet.game);
              const amountNum = parseFloat(bet.amount);
              const isWin = amountNum > 0;

              return (
                <tr
                  key={bet.id}
                  className={`transition-colors ${index % 2 === 0 ? 'bg-[#292D2E]' : 'bg-[#232626]'} hover:bg-white/5`}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{gameIcon}</span>
                      <span className="text-white text-sm">{bet.game}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-white text-sm">{maskUsername(bet.username)}</td>
                  <td className="py-3 px-4 text-[var(--bc-text-muted)] text-sm">{formatTime(bet.createdAt)}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`text-sm font-medium ${isWin ? 'text-green-400' : 'text-red-400'}`}>
                      {isWin ? '+' : ''}{formatCurrency(amountNum)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-0 rounded-xl overflow-hidden">
        {bets.slice(0, 5).map((bet, index) => {
          const gameIcon = getGameIcon(bet.game);
          const amountNum = parseFloat(bet.amount);
          const isWin = amountNum > 0;

          return (
            <div
              key={bet.id}
              className={`p-4 ${index % 2 === 0 ? 'bg-[#292D2E]' : 'bg-[#232626]'}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{gameIcon}</span>
                  <span className="text-white text-sm font-medium">{bet.game}</span>
                </div>
                <span className={`text-sm font-semibold ${isWin ? 'text-green-400' : 'text-red-400'}`}>
                  {isWin ? '+' : ''}{formatCurrency(amountNum)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-[var(--bc-text-muted)]">
                <span>{maskUsername(bet.username)}</span>
                <span>{formatTime(bet.createdAt)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {bets.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">🎲</div>
          <p className="text-white text-base font-semibold">No recent wins yet</p>
          <p className="text-[var(--bc-text-muted)] text-xs mt-1">Be the first to win!</p>
        </div>
      )}
    </div>
  );
}
