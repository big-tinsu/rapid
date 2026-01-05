import { useState, useEffect, useCallback } from 'react';
import { getMostRecentWins } from '@/actions/bets';
import { MostRecentWins } from '@/types/new/bet';

interface UseLatestBetsResult {
  bets: MostRecentWins[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useLatestBets(): UseLatestBetsResult {
  const [bets, setBets] = useState<MostRecentWins[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getMostRecentWins();

      if (response) {
        setBets(response);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch latest bets');
      console.error('Error fetching latest bets:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();

    // Auto-refresh every 30 seconds
    const interval = setInterval(refetch, 30000);

    return () => clearInterval(interval);
  }, [refetch]);

  return {
    bets,
    loading,
    error,
    refetch,
  };
}
