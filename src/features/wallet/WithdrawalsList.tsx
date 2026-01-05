"use client";

import { useState, useEffect } from "react";
import { formatCurrency } from "@/utils/currency";
import { formatDate } from "@/utils/date";
import Pagination from "@/components/Pagination";
import TableRowLoader from "@/components/TableRowLoader";
import { WithdrawalRequest, WithdrawalStatus } from "@/types/new/transaction";
import { getWithdrawalRequests } from "@/actions/transaction";
import { useRecoilValue } from "@/libs/recoil";
import { refreshTransactionsAtom } from "@/global-state/refresh.atom";

export function WithdrawalsList() {
  const refreshTransactions = useRecoilValue(refreshTransactionsAtom);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [pagination, setPagination] = useState<{
    totalCount: number;
    totalPages: number;
    page: number;
    limit: number;
  } | null>(null);

  const fetchWithdrawals = async (page: number) => {
    try {
      if (!initialLoading) {
        setLoading(true);
      }

      const response = await getWithdrawalRequests({ page, pageSize: 10 });

      if (response.data) {
        setWithdrawals(response.data);
        setPagination({
          totalCount: response.total,
          totalPages: Math.ceil(response.total / 10),
          page: page,
          limit: 10,
        });
        setCurrentPage(page);
      }

      setError(null);
    } catch (error) {
      console.error("Failed to fetch withdrawal requests:", error);
      setError("Failed to load withdrawal requests. Please try again.");
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  const onPageChange = (page: number) => {
    if (page < 1 || (pagination && page > pagination.totalPages)) {
      return;
    }
    setCurrentPage(page);
    fetchWithdrawals(page);
  };

  useEffect(() => {
    fetchWithdrawals(currentPage);
  }, [refreshTransactions]);

  const getStatusColor = (status: WithdrawalStatus) => {
    switch (status) {
      case WithdrawalStatus.APPROVED:
        return "text-green-500";
      case WithdrawalStatus.DECLINED:
        return "text-red-500";
      case WithdrawalStatus.PENDING:
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  if (initialLoading) {
    return (
      <div className="pad my-4 mt-8 lg:mt-8">
        <div className="screen-margin-bottom">
          <div className="table-wrapper">
            <table className="content-table !shadow-none">
              <thead>
                <tr className="!bg-transparent border-t-2 border-b-2 border-gray-700">
                  <th>Date Initiated</th>
                  <th>Date Processed</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <TableRowLoader />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pad my-4 mt-8 lg:mt-8">
        <div className="screen-margin-bottom">
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => fetchWithdrawals(currentPage)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pad my-4 mt-8 lg:mt-8">
      <div className="screen-margin-bottom">
        <div className="table-wrapper" style={{ overflow: "auto" }}>
          <table className="content-table !shadow-none">
            <thead>
              <tr className="!bg-transparent border-t-2 border-b-2 border-gray-700">
                <th>Date Initiated</th>
                <th>Date Processed</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <TableRowLoader />
              ) : withdrawals && withdrawals.length > 0 ? (
                withdrawals.map((withdrawal, index) => (
                  <tr key={withdrawal.id || index}>
                    <td>
                      <p className="w-max">
                        {formatDate(withdrawal.dateInitiated)}
                      </p>
                    </td>
                    <td>
                      <p className="w-max">
                        {withdrawal.dateProcessed
                          ? formatDate(withdrawal.dateProcessed)
                          : "N/A"}
                      </p>
                    </td>
                    <td className="winnings-red">
                      <p className="w-max">
                        <span>-</span> {formatCurrency(withdrawal.amount)}
                      </p>
                    </td>
                    <td
                      className={`capitalize ${getStatusColor(
                        withdrawal.status
                      )}`}
                    >
                      {withdrawal.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    <div className="flex flex-col items-center">
                      <img
                        src="/assets/images/empty.svg"
                        alt="No data"
                        width={320}
                        height={320}
                        className="h-80 w-80 mt-16"
                      />
                      <h4 className="mt-4 text-white text-3xl font-semibold">
                        No withdrawal requests available
                      </h4>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {pagination && pagination.totalPages > 1 && (
          <div className="mt-2 flex justify-center gap-3">
            <Pagination
              value={currentPage}
              totalCount={pagination.totalCount}
              totalPages={pagination.totalPages}
              onNewPage={onPageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
