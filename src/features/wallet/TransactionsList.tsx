"use client";

import { useState, useEffect } from "react";
import { formatCurrency } from "@/utils/currency";
import { formatDate } from "@/utils/date";
import Pagination from "@/components/Pagination";
import TableRowLoader from "@/components/TableRowLoader";
import { ApiService } from "@/services/apiService";
import { Transaction } from "@/types/new/transaction";
import { getTransactions } from "@/actions/transaction";
import { useRecoilValue } from "@/libs/recoil";
import { refreshTransactionsAtom } from "@/global-state/refresh.atom";

export function TransactionList() {
  const refreshTransactions = useRecoilValue(refreshTransactionsAtom);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState<{
    totalCount: number;
    totalPages: number;
    page: number;
    limit: number;
  } | null>(null);

  const fetchTransactions = async (page: number) => {
    try {
      if (!initialLoading) {
        setLoading(true);
      }

      const response = await getTransactions({ page, pageSize: 10 });

      if (response.data) {
        setTransactions(response.data);
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
      console.error("Failed to fetch transactions:", error);
      setError("Failed to load transactions. Please try again.");
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
    fetchTransactions(page);
  };

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [refreshTransactions]);

  if (initialLoading) {
    return (
      <div className="pad my-4 mt-8 lg:mt-8">
        <div className="screen-margin-bottom">
          <div className="table-wrapper">
            <table className="content-table !shadow-none">
              <thead>
                <tr className="!bg-transparent border-t-2 border-b-2 border-gray-700">
                  <th>Date</th>
                  <th>Type</th>
                  <th>Reference</th>
                  <th>Status</th>
                  <th>Amount</th>
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
              onClick={() => fetchTransactions(currentPage)}
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
                <th>Date</th>
                <th>Type</th>
                <th>Reference</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <TableRowLoader />
              ) : transactions && transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr key={transaction.id || index}>
                    <td>
                      <p className="w-max">
                        {formatDate(transaction.createdAt)}
                      </p>
                    </td>
                    <td>{transaction.type}</td>
                    <td className="winnings-user">{transaction.reference}</td>
                    <td className="capitalize">{transaction.status}</td>
                    {transaction.type === "credit" ? (
                      <td className="winnings-clr">
                        <p className="w-max">
                          <span>+</span> {formatCurrency(transaction.amount)}
                        </p>
                      </td>
                    ) : (
                      <td className="winnings-red">
                        <p className="w-max">
                          <span>-</span> {formatCurrency(transaction.amount)}
                        </p>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
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
                        No transactions available
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
