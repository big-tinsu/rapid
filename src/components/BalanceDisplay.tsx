"use client";

import { motion } from "motion/react";
import { formatCurrency } from "@/utils/currency";
import ClientOnly from "./ClientOnly";
import { useAuth } from "@/contexts/auth-context";

interface BalanceDisplayProps {
  className?: string;
}

export default function BalanceDisplay({
  className = "",
}: BalanceDisplayProps) {
  const { wallet, fetchingWallet } = useAuth();

  return (
    <div className={className}>
      <p className="text-[10px] text-[#eeeded]">Balance:</p>
      <ClientOnly
        fallback={<p className="font-bold text-sm text-white">₦0.00</p>}
      >
        {fetchingWallet ? (
          <motion.div
            className="h-4 w-20 bg-gray-400/20 rounded"
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
        ) : (
          <p
            className={`font-bold text-sm ${
              (wallet?.balance || 0) > 0 ? "text-white" : "text-red-500"
            }`}
          >
            {formatCurrency(
              +(wallet?.balance || 0) + +(wallet?.promoBalance || 0)
            )}
          </p>
        )}
      </ClientOnly>
    </div>
  );
}
