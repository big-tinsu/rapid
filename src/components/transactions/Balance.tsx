"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { formatCurrency } from "@/utils/currency";
import Modal from "@/components/Modal";
import Withdraw from "@/components/transactions/Withdraw";
import { useAuth } from "@/contexts/auth-context";
import { toastAtom } from "@/global-state/toast.atom";
import { useRecoilState, useSetRecoilState } from "@/libs/recoil";
import Deposit from "../Deposit";
import { refreshTransactionsAtom } from "@/global-state/refresh.atom";
export default function Balance() {
  const { getWallet, wallet } = useAuth();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const setToast = useSetRecoilState(toastAtom);
  const [refreshTransactions, setRefreshTransactions] = useRecoilState(
    refreshTransactionsAtom
  );
  const handleReload = async () => {
    setIsLoading(true);
    await getWallet();
    setIsLoading(false);
    setRefreshTransactions(refreshTransactions + 1);
  };

  useEffect(() => {
    handleReload();
  }, []);

  if (isLoading) {
    return (
      <div className="pad py-3 flex items-center justify-between">
        <div className="flex flex-col">
          <label className="text-base mb-2 text-gray-500" htmlFor="bal">
            Balance
          </label>
          <motion.div
            className="w-32 h-9 bg-gray-400/20 rounded"
            animate={{
              background: [
                "linear-gradient(90deg, rgba(156, 163, 175, 0.2) 0%, rgba(156, 163, 175, 0.4) 50%, rgba(156, 163, 175, 0.2) 100%)",
                "linear-gradient(90deg, rgba(156, 163, 175, 0.4) 0%, rgba(156, 163, 175, 0.2) 50%, rgba(156, 163, 175, 0.4) 100%)",
                "linear-gradient(90deg, rgba(156, 163, 175, 0.2) 0%, rgba(156, 163, 175, 0.4) 50%, rgba(156, 163, 175, 0.2) 100%)",
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    );
  }

  const balance = wallet?.balance || 0;

  return (
    <div className="pad py-3 flex items-center justify-between">
      <div className="flex flex-col">
        <label className="text-base mb-2 text-gray-500" htmlFor="bal">
          Balance
        </label>

        <div>
          {balance > 99 ? (
            <h2 className="text-3xl text-gray-100 font-bold">
              {formatCurrency(balance)}
            </h2>
          ) : (
            <h2 className="text-3xl text-red-500 font-bold">
              {formatCurrency(balance)}
            </h2>
          )}
        </div>

        <div className="flex items-center gap-4">
          <a
            onClick={() => {
              setShowDepositModal(true);
            }}
            className="mt-4 flex items-center cursor-pointer"
          >
            <p className="text-green-600 text-lg">Deposit</p>
          </a>
          <a
            onClick={() => {
              // if (balance < 1000) {
              //   setToast({
              //     showToast: true,
              //     toastObj: {
              //       type: "error",
              //       description:
              //         "Insufficient balance. Minimum withdrawal is ₦1000",
              //     },
              //   });
              //   return;
              // }
              setShowWithdrawModal(true);
            }}
            className="mt-4 flex items-center cursor-pointer"
          >
            <p className="text-blue-500 text-lg">Withdraw</p>
          </a>
        </div>
      </div>

      {showWithdrawModal && (
        <Modal
          title={"Withdraw Funds"}
          onClose={() => setShowWithdrawModal(false)}
        >
          <Withdraw
            onReload={handleReload}
            onClose={() => setShowWithdrawModal(false)}
          />
        </Modal>
      )}

      {showDepositModal && (
        <Modal title="Add Funds" onClose={() => setShowDepositModal(false)}>
          <Deposit
            onReload={handleReload}
            onClose={() => setShowDepositModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}
