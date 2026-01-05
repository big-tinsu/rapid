"use client";

import { useState } from "react";
import Loading from "@/components/loading/Loading";
import ErrorMessage from "@/components/error/Error";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/auth-context";
import Monnify from "monnify-js";
import OverlayLoader from "./OverlayLoader";
import {
  cancelDeposit,
  initiateDeposit as initiateDepositAction,
  verifyDeposit,
} from "@/actions/transaction";
import { useSetRecoilState } from "@/libs/recoil";
import { toastAtom } from "@/global-state/toast.atom";
import { PaymentProvider } from "@/types/new/transaction";

interface DepositProps {
  fromRegistration?: boolean;
  onReload?: () => void;
  onClose?: () => void;
}

export default function Deposit({
  fromRegistration = false,
  onReload,
  onClose,
}: DepositProps) {
  const router = useRouter();
  const { getWallet } = useAuth();
  const [amount, setAmount] = useState<number>(1000);
  const [loading, setLoading] = useState<boolean>(false);
  const [depositLoading, setDepositLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loaderText, setLoaderText] = useState<string>("");
  const setToast = useSetRecoilState(toastAtom);

  function closeAuth() {
    onClose?.();
    if (fromRegistration) router.push("/");
  }

  async function onComplete(
    reference: string,
    payload: any,
    provider: PaymentProvider
  ) {
    try {
      setToast({
        showToast: true,
        toastObj: {
          type: "success",
          description:
            "Payment initiated! Your balance will be updated once payment is confirmed.",
        },
      });
      setLoaderText("Verifying payment...");
      const res = await verifyDeposit(reference, provider);

      if (res.status !== "successful") {
        setToast({
          showToast: true,
          toastObj: {
            type: "info",
            description:
              "Payment is still being processed. Please check back later.",
          },
        });
        setDepositLoading(false);
        return;
      }

      setLoaderText("Updating balance...");
      await getWallet();
      setDepositLoading(false);

      closeAuth();
    } catch (error) {
      setHasError(true);
      setErrorMessage("Failed to verify payment. Please try again.");
      setToast({
        showToast: true,
        toastObj: {
          type: "error",
          description: "Failed to verify payment. Please try again.",
        },
      });
    }
  }

  async function initiateDepositMonnify(e: React.FormEvent) {
    if (amount < 100) {
      setToast({
        showToast: true,
        toastObj: {
          type: "warning",
          description: "Please enter a minimum of ₦100",
        },
      });
      return;
    }
    e.preventDefault();
    setLoading(true);

    try {
      const transactionInfo = await initiateDepositAction({
        amount,
        provider: PaymentProvider.MONNIFY,
      });
      setLoading(false);

      setLoaderText("Launching payment gateway...");
      setDepositLoading(true);

      const monnify = new Monnify(
        process.env.NEXT_PUBLIC_MONNIFY_API_KEY || "",
        process.env.NEXT_PUBLIC_MONNIFY_CONTRACT_CODE || ""
      );

      monnify.initializePayment({
        amount: amount,
        currency: "NGN",
        reference: transactionInfo.reference,
        customerFullName: transactionInfo.customerFullName,
        customerEmail: transactionInfo.customerEmail,
        apiKey: process.env.NEXT_PUBLIC_MONNIFY_API_KEY || "",
        contractCode: process.env.NEXT_PUBLIC_MONNIFY_CONTRACT_CODE || "",
        paymentDescription: "Deposit to wallet",
        onComplete: (payload: any) =>
          onComplete(
            transactionInfo.reference,
            payload,
            PaymentProvider.MONNIFY
          ),
        onClose: (payload: any) => onCancel(transactionInfo.reference, payload),
      });
    } catch (error) {
      setHasError(true);
      setErrorMessage("Failed to process deposit request. Please try again.");
      setToast({
        showToast: true,
        toastObj: {
          type: "error",
          description: "Failed to process deposit request. Please try again.",
        },
      });
    } finally {
      setLoading(false);
    }
  }

  async function initiateDepositPaystack(e: React.FormEvent) {
    if (amount < 100) {
      setToast({
        showToast: true,
        toastObj: {
          type: "warning",
          description: "Please enter a minimum of ₦100",
        },
      });
      return;
    }
    e.preventDefault();
    setLoading(true);

    try {
      const transactionInfo = await initiateDepositAction({
        amount,
        provider: PaymentProvider.PAYSTACK,
      });
      setLoading(false);

      setLoaderText("Launching payment gateway...");
      setDepositLoading(true);

      // Check if Paystack is loaded
      if (typeof window === "undefined" || !window.PaystackPop) {
        throw new Error("Paystack script not loaded");
      }

      const paystackHandler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
        email: transactionInfo.customerEmail,
        amount: amount * 100, // Paystack amounts are in kobo (smallest currency unit)
        ref: transactionInfo.reference,
        currency: "NGN",
        metadata: {
          custom_fields: [
            {
              display_name: "Customer Name",
              variable_name: "customer_name",
              value: transactionInfo.customerFullName,
            },
          ],
        },
        callback: (response: any) => {
          onComplete(
            transactionInfo.reference,
            response,
            PaymentProvider.PAYSTACK
          );
        },
        onClose: () => {
          onCancel(transactionInfo.reference, { status: "CANCELLED" });
        },
      });

      paystackHandler.openIframe();
    } catch (error) {
      setHasError(true);
      setErrorMessage("Failed to process deposit request. Please try again.");
      setToast({
        showToast: true,
        toastObj: {
          type: "error",
          description: "Failed to process deposit request. Please try again.",
        },
      });
      setDepositLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function onCancel(reference: string, payload: any) {
    if (payload?.status === "SUCCESS") return;
    setDepositLoading(false);
    await cancelDeposit(reference);
    setToast({
      showToast: true,
      toastObj: {
        type: "error",
        description: "Deposit request cancelled.",
      },
    });
  }

  return (
    <div className="flex flex-col w-full">
      <form className="flex flex-col">
        <div className="form-group">
          <label htmlFor="amount">How much would you like to add?</label>
          <input
            type="number"
            className="form-input"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min="100"
          />
        </div>

        {hasError && <ErrorMessage message={errorMessage} />}

        <div className="flex flex-col gap-3">
          <button
            onClick={initiateDepositPaystack}
            className={`action-norm action-log w-full ${
              loading ? "!bg-opacity-80" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Loading />
                <p className="text-gray-400 ml-3 text-xs">
                  Initializing payment...
                </p>
              </div>
            ) : (
              <span>Pay with Paystack</span>
            )}
          </button>

          <button
            onClick={initiateDepositMonnify}
            className={`action-norm action-log w-full ${
              loading ? "!bg-opacity-80" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Loading />
                <p className="text-gray-400 ml-3 text-xs">
                  Initializing payment...
                </p>
              </div>
            ) : (
              <span>Pay with Monnify</span>
            )}
          </button>
        </div>
      </form>

      {depositLoading && <OverlayLoader loaderText={loaderText} />}
    </div>
  );
}
