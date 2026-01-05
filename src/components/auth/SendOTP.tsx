"use client";

import { useState, useEffect } from "react";
import Loading from "@/components/loading/Loading";
import Error from "@/components/error/Error";
import { resendCode as resendCodeAction } from "@/actions/auth";
import { toastAtom } from "@/global-state/toast.atom";
import { useSetRecoilState } from "@/libs/recoil";

interface SendOTPProps {
  initialEmail?: string;
  onSuccess?: () => void;
  onClose?: () => void;
}

export function SendOTP({
  initialEmail = "",
  onSuccess,
  onClose,
}: SendOTPProps) {
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasClickedSubmit, setHasClickedSubmit] = useState(false);
  const setToast = useSetRecoilState(toastAtom);

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  const hasEmailError = hasClickedSubmit && email.length < 1;

  const clearError = () => {
    setHasError(false);
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasClickedSubmit(true);

    if (!email) {
      setToast({
        showToast: true,
        toastObj: {
          type: "warning",
          description: "Email is required",
        },
      });
      return;
    }

    setLoading(true);
    clearError();

    try {
      await resendCodeAction({ email });

      if (typeof window !== "undefined") {
        sessionStorage.setItem("email", email);
      }

      setToast({
        showToast: true,
        toastObj: {
          type: "success",
          description: "OTP sent successfully!",
        },
      });
      onSuccess?.();
    } catch (error: any) {
      const errorMsg =
        error?.message || error?.toString() || "Failed to send OTP";
      setToast({
        showToast: true,
        toastObj: {
          type: "error",
          description: errorMsg,
        },
      });
      setHasError(true);
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <h4 className="text-left text-gray-500 text-sm mb-6">
        Enter your email address to receive a verification code.
      </h4>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className={`flex flex-col mb-4 ${hasEmailError ? "error" : ""}`}>
          <label
            className={`mb-1 ${
              hasEmailError ? "text-red-500" : "text-gray-400"
            } text-base`}
            htmlFor="email"
          >
            Email
          </label>
          <input
            required
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`text-black bg-[#ffffff] border-none rounded focus:ring-4 focus:ring-[#faa100] py-3 px-4 ${
              hasEmailError ? "border-2 border-red-500" : ""
            }`}
            placeholder="e.g user@example.com"
          />
        </div>

        {hasError && <Error message={errorMessage} />}

        <button
          type="submit"
          className={`action-norm action-log w-full py-2 px-4 bg-[#faa100] hover:bg-[#e89100] text-white font-bold rounded ${
            loading ? "!bg-opacity-80" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <span>Send OTP</span>
          )}
        </button>
      </form>
    </div>
  );
}
