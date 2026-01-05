import { useState, useEffect, useCallback } from 'react';
import { getGames } from '@/actions/games';
import { Game } from '@/types/new/game';
import { CasinoGame, transformGamesToUI } from '@/lib/data/casinoGames';

interface UseGamesResult {
  games: CasinoGame[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  fetchGames: (page?: number, search?: string) => Promise<void>;
  searchGames: (query: string) => Promise<void>;
  loadMore: () => Promise<void>;
}

export function useGames(initialPageSize = 20): UseGamesResult {
  const [games, setGames] = useState<CasinoGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchGames = useCallback(async (page = 1, search?: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getGames({
        page,
        pageSize: initialPageSize,
        search: search || undefined,
      });

      if (response) {
        const transformedGames = transformGamesToUI(response.data);

        if (page === 1) {
          setGames(transformedGames);
        } else {
          setGames(prev => [...prev, ...transformedGames]);
        }

        setTotalPages(Math.ceil(response.total / initialPageSize));
        setCurrentPage(response.page);
        setHasNext(response.hasNext);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch games');
      console.error('Error fetching games:', err);
    } finally {
      setLoading(false);
    }
  }, [initialPageSize]);

  const searchGames = useCallback(async (query: string) => {
    setSearchQuery(query);
    await fetchGames(1, query);
  }, [fetchGames]);

  const loadMore = useCallback(async () => {
    if (hasNext && !loading) {
      await fetchGames(currentPage + 1, searchQuery);
    }
  }, [hasNext, loading, currentPage, searchQuery, fetchGames]);

  useEffect(() => {
    fetchGames(1);
  }, []);

  return {
    games,
    loading,
    error,
    totalPages,
    currentPage,
    hasNext,
    fetchGames,
    searchGames,
    loadMore,
  };
}
