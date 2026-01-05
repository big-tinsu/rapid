"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Bank } from "@/types/new/transaction";
import { useDebounce } from "@/hooks/useDebounce";
import Select from "react-select";
import {
  getBanks,
  validateAccount,
  initiateWithdrawal as initiateWithdrawalAction,
} from "@/actions/transaction";
import { toastAtom } from "@/global-state/toast.atom";
import { useSetRecoilState } from "@/libs/recoil";
interface WithdrawProps {
  onReload: () => void;
  onClose: () => void;
}

export default function Withdraw({ onReload, onClose }: WithdrawProps) {
  const setToast = useSetRecoilState(toastAtom);

  const [amount, setAmount] = useState(0);
  const [validatingBank, setValidatingBank] = useState(false);
  const [banksLoading, setBanksLoading] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [withdrawLoader, setWithdrawLoader] = useState(false);
  const [loadingText, setLoadingText] = useState("Processing...");
  const [bankDetails, setBankDetails] = useState({ name: "", code: "" });
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [banks, setBanks] = useState<Bank[]>([]);

  const clearError = () => {
    setHasError(false);
    setErrorMessage("");
  };

  const validateBank = async () => {
    setHasError(false);
    setAccountName("");

    if (bankDetails.code && accountNumber.length === 10) {
      setValidatingBank(true);

      const data = {
        accountNumber: accountNumber.toString(),
        bankCode: bankDetails.code,
      };

      try {
        const response = await validateAccount(data);

        if (response.accountName) {
          setAccountName(response.accountName);
          setAccountNumber(response.accountNumber);
          clearError();
        }
      } catch (error: any) {
        setAccountName("");
        setHasError(true);
        setErrorMessage(error?.message || "Account validation failed");

        setTimeout(() => {
          setHasError(false);
        }, 5000);
      } finally {
        setValidatingBank(false);
      }
    }
  };

  const findBanks = async () => {
    setBanksLoading(true);
    setHasError(false);
    setAccountName("");
    setBankDetails({ name: "", code: "" });
    try {
      const response = await getBanks();
      setBanks(response);
      clearError();
    } catch (error: any) {
      setHasError(true);
      setErrorMessage(error?.message || "Failed to fetch banks");
    } finally {
      setBanksLoading(false);
    }
  };

  const closeAuth = () => {
    onClose?.();
  };

  const initiateWithdrawal = async () => {
    if (amount < 1000) {
      setToast({
        showToast: true,
        toastObj: {
          type: "warning",
          description: "Please enter a minimum of ₦1,000.00",
        },
      });
      setHasError(true);
      setErrorMessage("Please enter a minimum of ₦1,000.00");
      return;
    }

    if (amount > 100000) {
      setToast({
        showToast: true,
        toastObj: {
          type: "warning",
          description: "Please enter a maximum of ₦100,000.00",
        },
      });
      setHasError(true);
      setErrorMessage("Please enter a maximum of ₦100,000.00");
      return;
    }

    setWithdrawLoader(true);
    setLoadingText("Processing withdrawal...");
    clearError();

    try {
      const response = await initiateWithdrawalAction({
        amount,
        accountNumber,
        bankCode: bankDetails.code,
      });

      if (response) {
        closeAuth();
        setToast({
          showToast: true,
          toastObj: {
            type: "success",
            description: "Your withdrawal request is being processed.",
          },
        });

        if (onReload) {
          onReload();
        }
      } else {
        throw new Error("Withdrawal request failed");
      }
    } catch (error: any) {
      setHasError(true);
      setErrorMessage(error.message || "Withdrawal failed. Please try again.");
      setToast({
        showToast: true,
        toastObj: {
          type: "error",
          description: error.message || "Withdrawal failed. Please try again.",
        },
      });
    } finally {
      setWithdrawLoader(false);
    }
  };

  const { debounce } = useDebounce();

  const debouncedValidateBank = debounce(validateBank, 2000);

  useEffect(() => {
    debouncedValidateBank();
  }, [accountNumber, bankDetails.code]);

  useEffect(() => {
    findBanks();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="space-y-4 transition-all duration-300 ease-in-out">
        <div className="flex flex-col gap-2">
          <label htmlFor="bankDetails">Bank Name</label>
          {banksLoading ? (
            <motion.div
              className="w-full h-10 bg-gray-400/20 rounded"
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
            <Select
              options={banks.map((bank) => ({
                value: bank.code,
                label: `${bank.name}`,
              }))}
              classNames={{
                control: () => "text-black text-xs",
                option: () => "text-black text-xs",
                menu: () => "text-black text-xs",
                menuList: () => "text-black text-xs",
              }}
              onChange={(e) => {
                if (e) {
                  setBankDetails({ name: e.label, code: e.value });
                }
              }}
            />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="account_number">Account Number</label>
          <input
            type="text"
            id="account_number"
            className="p-2 border rounded w-full text-sm"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Enter your account number"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="account_name">Account Name</label>
          {validatingBank ? (
            <motion.div
              className="w-full h-10 bg-gray-400/20 rounded"
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
            <input
              type="text"
              id="name"
              className="p-2 border border-gray-300 rounded w-full text-xs"
              value={accountName}
              disabled
            />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            className="p-2 border border-gray-300 rounded w-full text-xs"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
          />
        </div>

        {hasError && <div className="text-red-500 text-xs">{errorMessage}</div>}

        <div className="flex justify-start">
          <button
            onClick={initiateWithdrawal}
            className={`px-4 py-2 rounded flex items-center gap-2 ${
              withdrawLoader || !accountName ? "opacity-80" : ""
            } action-norm action-log disabled:opacity-80 disabled:cursor-not-allowed`}
            disabled={withdrawLoader || !accountName}
          >
            <span>Withdraw</span>{" "}
            {withdrawLoader && (
              <motion.div
                className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
