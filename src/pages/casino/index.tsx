'use client';

import { useState, useMemo } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TopNav } from '@/components/TopNav';
import BottomNavbar from '@/components/BottomNavbar';
import { HeroBanner } from '@/components/HeroBanner';
import { CategoryTabs } from '@/components/CategoryTabs';
import { GameGrid } from '@/components/GameGrid';
import { LatestBetsTable } from '@/components/LatestBetsTable';
import { useGames } from '@/hooks/useGames';

export default function CasinoPage() {
  const [activeCategory, setActiveCategory] = useState('lobby');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const {
    games,
    loading,
    error,
    hasNext,
    loadMore,
    searchGames,
    fetchGames
  } = useGames(20);

  const [loadingMore, setLoadingMore] = useState(false);

  // Handle load more
  const handleLoadMore = async () => {
    setLoadingMore(true);
    await loadMore();
    setLoadingMore(false);
  };

  // Filter games based on category (in real app, this would be an API call)
  const filteredGames = useMemo(() => {
    if (activeCategory === 'lobby') {
      return games;
    }
    // For now, return all games - in a real implementation,
    // you would filter by category from the API
    return games;
  }, [games, activeCategory]);

  // Featured games (top 7)
  const featuredGames = useMemo(() => {
    return games.filter(game => game.isFeatured).slice(0, 7);
  }, [games]);

  // Hot games (games with high player count)
  const hotGames = useMemo(() => {
    return [...games]
      .sort((a, b) => (b.players || 0) - (a.players || 0))
      .slice(0, 7);
  }, [games]);

  const isLobby = activeCategory === 'lobby';

  // Handle category change
  const handleCategoryChange = async (category: string) => {
    setActiveCategory(category);
    // In a real implementation, you might filter via API
    await fetchGames(1);
  };

  // Handle search
  const handleSearch = async (query: string) => {
    if (query.trim()) {
      await searchGames(query);
    } else {
      await fetchGames(1);
    }
  };

  return (
    <div className='bg-[var(--bc-bg-primary)] min-h-screen pb-20 md:pb-0'>
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onCategoryChange={handleCategoryChange}
      />

      <TopNav sidebarCollapsed={sidebarCollapsed} />

      {/* Mobile Bottom Navigation */}
      <BottomNavbar />

      <main
        className={`pt-14 md:pt-16 main-transition bg-[var(--bc-bg-secondary)] ${
          sidebarCollapsed ? 'md:ml-[70px]' : 'md:ml-64'
        }`}
      >
        {/* Hero Banner */}
        <HeroBanner />

        {/* Category Tabs */}
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Error State */}
        {error && (
          <div className="px-4 md:px-6 py-8 text-center">
            <p className="text-red-400 text-sm">{error}</p>
            <button
              onClick={() => fetchGames(1)}
              className="mt-2 px-4 py-2 bg-[var(--bc-bg-secondary)] text-white text-sm rounded-lg hover:bg-[var(--bc-border)] transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Game Sections */}
        {!error && (
          <>
            {isLobby ? (
              <>
                {/* Featured/Original Games Section */}
                <GameGrid
                  games={featuredGames}
                  isLoading={loading && games.length === 0}
                  title="Featured Games"
                  showViewAll={true}
                  onViewAll={() => handleCategoryChange('featured')}
                />

                {/* Hot Games Section */}
                <GameGrid
                  games={hotGames}
                  isLoading={loading && games.length === 0}
                  title="Hot Games"
                  showViewAll={true}
                  onViewAll={() => handleCategoryChange('hot-games')}
                />

                {/* All Games Section */}
                <GameGrid
                  games={games}
                  isLoading={loading && games.length === 0}
                  title="All Games"
                  hasMore={hasNext}
                  onLoadMore={handleLoadMore}
                  loadingMore={loadingMore}
                />
              </>
            ) : (
              <GameGrid
                games={filteredGames}
                isLoading={loading && games.length === 0}
                hasMore={hasNext}
                onLoadMore={handleLoadMore}
                loadingMore={loadingMore}
              />
            )}
          </>
        )}

        {/* Latest Bets Table */}
        <LatestBetsTable />
      </main>
    </div>
  );
}
