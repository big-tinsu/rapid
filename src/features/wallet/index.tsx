"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Balance from "@/components/transactions/Balance";
import PromoBalance from "@/components/transactions/PromoBalance";
import TableRowLoader from "@/components/TableRowLoader";
import { TransactionList } from "./TransactionsList";
import { WithdrawalsList } from "./WithdrawalsList";
import { useAuth } from "@/contexts/auth-context";
import { toastAtom } from "@/global-state/toast.atom";
import { useSetRecoilState } from "@/libs/recoil";

type TabType = "transactions" | "withdrawals";

export function Wallet() {
  const searchParams = useSearchParams();
  const setToast = useSetRecoilState(toastAtom);

  // const [fundLoading, setFundLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("transactions");

  const { getWallet } = useAuth();

  useEffect(() => {
    const initializeWallet = async () => {
      setIsLoading(true);
      try {
        await getWallet();
      } catch (error) {
        console.error("Failed to initialize wallet:", error);
        setToast({
          showToast: true,
          toastObj: {
            type: "error",
            description: "Failed to load wallet data",
          },
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeWallet();
  }, [searchParams]);

  return (
    <div className="relative bg-[#161923]">
      <div className="flex flex-col pb-24">
        {/* {fundLoading && (
          <div className="absolute top-0 left-0 right-0 bottom-0 z-50 bg-[#161923] bg-opacity-80">
            <div className="pad my-4 mt-8 lg:mt-8 max-w-4xl mx-auto">
              <h4 className="text-white text-3xl font-bold text-left">
                Processing Payment
              </h4>
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
          </div>
        )} */}

        <div className="flex justify-between mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 sm:flex-row flex-col sm:items-center items-start sm:space-y-0 space-y-4">
          <Balance />
          <PromoBalance />
        </div>

        {/* Tabs */}
        <div className="pad mt-8">
          <div className="flex gap-4 border-b-2 border-gray-700">
            <button
              onClick={() => setActiveTab("transactions")}
              className={`px-6 py-3 text-3xl text-base font-semibold transition-all duration-200 relative ${
                activeTab === "transactions"
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Transactions
              {activeTab === "transactions" && (
                <span className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-white"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("withdrawals")}
              className={`px-6 py-3 text-3xl text-base font-semibold transition-all duration-200 relative ${
                activeTab === "withdrawals"
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Withdrawals
              {activeTab === "withdrawals" && (
                <span className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-white"></span>
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {isLoading ? (
          <div className="pad my-4 mt-8 lg:mt-8">
            <div className="screen-margin-bottom">
              <div className="table-wrapper">
                <table className="content-table !shadow-none">
                  <thead>
                    <tr className="!bg-transparent border-t-2 border-b-2 border-gray-700">
                      {activeTab === "transactions" ? (
                        <>
                          <th>Date</th>
                          <th>Type</th>
                          <th>Reference</th>
                          <th>Status</th>
                          <th>Amount</th>
                        </>
                      ) : (
                        <>
                          <th>Date Initiated</th>
                          <th>Date Processed</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    <TableRowLoader />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <>
            {activeTab === "transactions" ? (
              <TransactionList />
            ) : (
              <WithdrawalsList />
            )}
          </>
        )}
      </div>
    </div>
  );
}
