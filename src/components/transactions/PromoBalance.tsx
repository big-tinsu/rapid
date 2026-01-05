"use client";

import { motion } from "motion/react";
import { useAuth } from "@/contexts/auth-context";
import { formatCurrency } from "@/utils/currency";

export default function PromoBalance() {
  const { wallet, fetchingWallet } = useAuth();

  const promoBalance = wallet?.promoBalance || 0;

  if (fetchingWallet) {
    return (
      <div className="pad py-3 flex items-center justify-between">
        <div className="flex flex-col">
          <label className="text-base mb-2 text-gray-500" htmlFor="bal">
            Promo Balance
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

  return (
    <div className="pad py-3 flex items-center justify-between">
      <div className="flex flex-col">
        <label className="text-base mb-2 text-gray-500" htmlFor="bal">
          Promo Balance
        </label>
        {promoBalance > 99 ? (
          <h2 className="text-3xl text-gray-100 font-bold">
            {formatCurrency(promoBalance)}
          </h2>
        ) : (
          <h2 className="text-3xl text-red-500 font-bold">
            {formatCurrency(promoBalance)}
          </h2>
        )}
      </div>
    </div>
  );
}
