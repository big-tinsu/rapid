"use client";

import React, { useState, useCallback, useEffect } from "react";
import { formatCurrency } from "@/utils/helper";
import { truncateString } from "@/utils/string";
import { formatDate } from "@/utils/date";
import PaginationComponent from "@/components/Pagination";
import TableRowLoader from "@/components/TableRowLoader";
import { Pagination } from "@/types/Response";
import { useAuth } from "@/contexts/auth-context";
import { getBets } from "@/actions/bets";
import { Bet } from "@/types/new/bet";

export function Bets() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bets, setBets] = useState<Bet[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    page: 1,
    pageSize: 20,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const fetchBetsData = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      const betsResponse = await getBets({
        page: Number(page),
        pageSize: 20,
      });

      if (betsResponse) {
        const responseData = betsResponse;

        setBets(responseData.data || []);

        setPagination({
          total: responseData.total || 0,
          totalPages: Math.ceil(responseData.total / responseData.pageSize),
          page: responseData.page || 1,
          pageSize: responseData.pageSize || 20,
        });

        setCurrentPage(responseData.page || page);
      } else {
        setError("Failed to load bet history.");
        setBets([]);
      }
    } catch (err: any) {
      console.error("Error fetching bets data:", err);
      setError(err.message || "Failed to load bet history. Please try again.");
      setBets([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const onPageChange = useCallback(
    (page: number) => {
      if (page < 1 || (pagination && page > pagination.totalPages) || loading)
        return;
      fetchBetsData(page);
    },
    [fetchBetsData, pagination, loading]
  );

  const renderContent = () => {
    if (loading) {
      return <TableRowLoader />;
    }

    if (bets && bets.length > 0) {
      return bets.map((bet: Bet, idx: number) => (
        <tr key={bet.id || idx} className="border-b border-gray-700">
          <td className="p-4">
            <p className="w-max px-3">{formatDate(bet.createdAt)}</p>
          </td>
          <td className="p-4 text-blue-400">
            <p className="px-3 capitalize">
              {truncateString(bet.gameType || bet.roundId || "", 10)}
            </p>
          </td>
          <td className="hidden sm:table-cell p-4 text-left">
            <p className="px-3">{bet.reference}</p>
          </td>
          <td className="p-4">
            <p className="px-3">{formatCurrency(bet.amount)}</p>
          </td>
          <td
            className={`p-4 ${
              bet.cashoutAmount > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            <p className="px-3">{bet.cashoutAmount > 0 ? "Won" : "Lost"}</p>
          </td>
          <td className="p-4 text-blue-400">
            <p className="px-3">{formatCurrency(bet.cashoutAmount)}</p>
          </td>
        </tr>
      ));
    }

    return (
      <tr>
        <td colSpan={5} className="text-center py-4">
          <div className="flex flex-col items-center">
            <img
              src="/assets/images/empty.svg"
              alt="No data"
              width={320}
              height={320}
              className="h-80 w-80 mt-16"
            />
            <h4 className="mt-4 text-white text-3xl font-semibold">
              No data available
            </h4>
          </div>
        </td>
      </tr>
    );
  };

  useEffect(() => {
    fetchBetsData(currentPage);
  }, [currentPage, fetchBetsData]);

  return (
    <div className="bg-[#161923] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col">
        <div className="flex justify-between items-center gap-2.5 text-white mb-10 flex-col sm:flex-row">
          <h4 className="text-3xl font-bold text-left">
            Bets: <span>{loading ? "..." : pagination.total || 0}</span>
          </h4>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-900 text-red-200 border border-red-700 rounded">
            <p>Error: {error}</p>
            <button
              onClick={() => fetchBetsData(currentPage)}
              className="mt-2 bg-red-700 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm"
              disabled={loading}
            >
              Retry
            </button>
          </div>
        )}

        <div className="mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-y-2 border-gray-700 bg-transparent">
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Game</th>
                  <th className="hidden sm:table-cell p-4 text-left">
                    Reference
                  </th>
                  <th className="p-4 text-left whitespace-nowrap">
                    Bet Amount
                  </th>
                  <th className="p-4 text-left">Result</th>
                  <th className="p-4 text-left whitespace-nowrap">
                    Amount Won
                  </th>
                </tr>
              </thead>
              <tbody>{renderContent()}</tbody>
            </table>
          </div>

          {!loading && pagination.totalPages > 1 && (
            <div className="mt-2 flex justify-center gap-3">
              <PaginationComponent
                value={currentPage}
                totalCount={pagination.total}
                totalPages={pagination.totalPages}
                onNewPage={onPageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
