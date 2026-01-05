"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/loading/Loading";
import LoadingBar from "@/components/loading/LoadingBar";
import type { Game } from "@/types/new/game";
import styles from "./Games.module.css";
import { useAuth } from "@/contexts/auth-context";
import { useSetRecoilState } from "@/libs/recoil";
import { iframeAtom } from "@/global-state/iframe.atom";
import { getGames, initiatePlayerGameSession } from "@/actions/games";
import { toastAtom } from "@/global-state/toast.atom";
import { useGame } from "@/hooks";
import { latestWinnersAtom } from "@/global-state/latest-winners.atom";
import { getMostRecentWins } from "@/actions/bets";

export default function Games() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [btnIndex, setBtnIndex] = useState<number | null>(null);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [getTokenLoading, setGetTokenLoading] = useState<boolean>(false);
  const [games, setGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showGameModal, setShowGameModal] = useState(false);
  const noMatchFound = searchTerm.length > 0 && games.length < 1;
  const { token } = useAuth();
  const { launchGame, closeGame } = useGame();
  const setToast = useSetRecoilState(toastAtom);
  const setLatestWinners = useSetRecoilState(latestWinnersAtom);

  const fetchGames = useCallback(
    async (search?: string) => {
      setLoading(true);
      try {
        const games = await getGames({ page: 1, search, pageSize: 20 });
        const recentWins = await getMostRecentWins();
        setLatestWinners(recentWins);
        setGames(games.data);
      } catch (error) {
        console.error("Failed to fetch games:", error);
      } finally {
        setInitialLoading(false);
        setLoading(false);
      }
    },
    [searchParams, searchTerm]
  );

  const getPlayerToken = async (
    gameId: string,
    isDemoMode: boolean = false
  ) => {
    setGetTokenLoading(true);
    try {
      const result = await initiatePlayerGameSession({
        gameType: gameId,
        demo: isDemoMode,
      });
      return result || "";
    } catch (error: any) {
      console.error("Error getting player token:", error);
      setToast({
        showToast: true,
        toastObj: {
          type: "error",
          description: error.message || "Failed to launch game",
        },
      });
      return "";
    } finally {
      setGetTokenLoading(false);
    }
  };

  const showBtns = (index: number) => {
    setBtnIndex(index);
  };

  const goToGame = async (game: Game, type: string) => {
    const isValidToken = token;
    const isDemoMode = type === "demo";

    if (!isValidToken && !isDemoMode) {
      setSelectedGame(game);
      setShowGameModal(true);
      return;
    }

    const gameUrl = await getPlayerToken(game.gameId, isDemoMode);
    if (gameUrl) {
      launchGame(gameUrl);
    }
  };

  const handlePlayDemo = async () => {
    if (!selectedGame) return;

    const gameUrl = await getPlayerToken(selectedGame.gameId, true);
    if (gameUrl) {
      launchGame(gameUrl);
    }
    setShowGameModal(false);
  };

  const handlePlayLive = () => {
    setShowGameModal(false);
    router.push("/login");
  };

  const closeGameModal = () => {
    setShowGameModal(false);
    setSelectedGame(null);
  };

  const clearSearch = () => {
    setSearchTerm("");
    router.push("/");
  };

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setSearchTerm(search);
    }

    fetchGames(search || undefined);
  }, [searchParams]);

  return (
    <div
      className="container overflow-x-hidden pt-4 relative text-center"
      style={{ maxWidth: "1140px" }}
    >
      {loading && <LoadingBar loading={loading} />}

      {initialLoading && (
        <div className="container">
          <div className={styles.games}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className={styles.game}>
                <div className={styles.gameContainer}>
                  <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!initialLoading && noMatchFound && (
        <div className={styles.noMatchFound}>
          <div className="grid gap-4">
            <p className="text-white text-center">
              No Match for "<span className="font-bold">{searchTerm}</span>"
            </p>

            <button
              onClick={clearSearch}
              className={`${styles.noMatchFoundButton} px-3 py-1 text-white rounded-md border border-white`}
            >
              <p>Clear</p>
            </button>
          </div>
        </div>
      )}

      {!initialLoading && !noMatchFound && games.length < 1 && (
        <div className={styles.noMatchFound}>
          <p className="text-white font-bold">No Game found</p>
        </div>
      )}

      {!initialLoading && games.length > 0 && (
        <div className="container">
          <div className={styles.games}>
            {games.map((game, index) => (
              <div key={game.id} className={styles.game}>
                <div
                  className={styles.gameContainer}
                  onClick={() => showBtns(index)}
                >
                  <div
                    className={styles.gameWrapper}
                    style={{ filter: "none", transform: "scale(1)" }}
                  >
                    <img
                      src={game.bannerURL}
                      alt={`${game.name} Image`}
                      className="object-cover lg:object-fill rounded-lg"
                      width={256}
                      height={165}
                    />

                    {index === btnIndex && (
                      <div className={styles.gameBtns}>
                        <button
                          className={styles.live}
                          onClick={() => goToGame(game, "live")}
                          disabled={getTokenLoading}
                        >
                          <div>
                            {getTokenLoading ? (
                              <Loading />
                            ) : (
                              <p className={styles.ctaPlay}>Play Now</p>
                            )}
                          </div>
                        </button>
                        <button
                          className={styles.demo}
                          onClick={() => goToGame(game, "demo")}
                          disabled={getTokenLoading}
                        >
                          <div>
                            {getTokenLoading ? (
                              <Loading />
                            ) : (
                              <p className={styles.ctaDemo}>Demo</p>
                            )}
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Game selection modal for non-logged in users */}
      {showGameModal && selectedGame && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">
                {selectedGame.name}
              </h3>
              <button
                onClick={closeGameModal}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mb-6">
              <img
                src={selectedGame.bannerURL}
                alt={selectedGame.name}
                width={400}
                height={250}
                className="w-full h-auto rounded-lg"
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handlePlayDemo}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
              >
                Play Demo
              </button>
              <button
                onClick={handlePlayLive}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md"
              >
                Login to Play
              </button>
            </div>
          </div>
        </div>
      )}

      {/* {iframeLink && (
        <div 
          className="fixed top-0 left-0 w-full z-50 bg-black" 
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 9999, border: '1px solid red' }}
        >
          <div 
            className="absolute top-4 left-4 cursor-pointer z-50 bg-black bg-opacity-70 p-2 rounded-full hover:bg-opacity-90 transition-all"
            onClick={() => setGameLink('')}
          >
            <img
              src="/assets/images/white_logo.png"
              alt="Logo"
              width={152}
              height={40}
              className="w-full object-contain"
            />
          </div>
          
          <iframe
            src={iframeLink}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            title="Game"
          />
        </div>
      )} */}
    </div>
  );
}
