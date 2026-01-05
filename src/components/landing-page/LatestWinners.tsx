"use client";

import { formatDate } from "@/utils/date";
import { formatCurrency } from "@/utils/currency";
import TableRowLoader from "@/components/TableRowLoader";
import { MostRecentWins } from "@/types/new/bet";
import { useEffect, useState } from "react";
import { getMostRecentWins } from "@/actions/bets";
import { useRecoilState } from "@/libs/recoil";
import { latestWinnersAtom } from "@/global-state/latest-winners.atom";

export default function LatestWinners() {
  const [loading, setLoading] = useState(true);
  const [latestWinners, setLatestWinners] = useRecoilState(latestWinnersAtom);

  useEffect(() => {
    const fetchLatestWinners = async () => {
      setLoading(true);
      try {
        const result = await getMostRecentWins();
        setLatestWinners(result);
      } catch (error) {
        console.error("Failed to fetch latest winners:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestWinners();
  }, []);

  return (
    <div
      className="pad my-4 mt-8 lg:mt-12 container mx-auto"
      style={{ maxWidth: "1140px" }}
    >
      <h4 className="text-white text-3xl font-bold text-center flex items-center justify-center">
        Past Rounds
        <span
          className="ml-2 rounded-lg flex items-center text-white text-sm px-4 py-2"
          style={{ backgroundColor: "#faa100" }}
        >
          Realtime Winners
          <span className="ml-2 text-lg">🥳</span>
        </span>
      </h4>
      <table className="content-table">
        <thead>
          <tr className="bg-buslybg">
            <th>Game</th>
            <th>User</th>
            <th className="hidden sm:table-cell">Time</th>
            <th>
              Payout <span className="ml-2 text-lg">🎉</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <TableRowLoader />
          ) : latestWinners && latestWinners.length > 0 ? (
            latestWinners.map((bets, index) => (
              <tr key={index}>
                <td>{bets.game}</td>
                <td className="winnings-user capitalize">{bets.username}</td>
                <td className="hidden sm:table-cell">
                  {new Date(bets.createdAt).toLocaleTimeString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </td>
                <td className="winnings-clr">{formatCurrency(+bets.amount)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No recent winners found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
