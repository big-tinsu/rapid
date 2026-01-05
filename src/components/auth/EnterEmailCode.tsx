"use client";

import { useState, useEffect, useCallback } from "react";
import Loading from "@/components/loading/Loading";
import Error from "@/components/error/Error";
import { useRouter } from "next/router";
import { verifyOTP, resendCode as resendCodeAction } from "@/actions/auth";
import { toastAtom } from "@/global-state/toast.atom";
import { useSetRecoilState } from "@/libs/recoil";

interface EnterEmailCodeProps {
  fromRegistration?: boolean;
  email: string;
  onReload?: () => void;
  onClose?: () => void;
  onSuccess?: () => void;
}

export default function EnterEmailCode({
  fromRegistration = false,
  email,
  onReload,
  onClose,
  onSuccess,
}: EnterEmailCodeProps) {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [loadingText] = useState("Processing...");
  const [timer, setTimer] = useState(fromRegistration ? 120 : 0);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const setToast = useSetRecoilState(toastAtom);

  const closeAuth = () => {
    onClose?.();
    if (fromRegistration) router.push("/");
  };

  const clearError = () => {
    setHasError(false);
    setErrorMessage("");
  };

  const verify = async () => {
    if (!code) {
      setToast({
        showToast: true,
        toastObj: {
          type: "warning",
          description: "Code is required!",
        },
      });
      return;
    }

    setLoading(true);
    clearError();
    try {
      await verifyOTP({ otp: code, email });
      setToast({
        showToast: true,
        toastObj: {
          type: "success",
          description: "Your email has been verified!",
        },
      });
      setCode("");
      closeAuth();
      onSuccess?.();
    } catch (error: any) {
      const errorMsg =
        error?.message || error?.toString() || "Verification failed";
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

  const countdown = useCallback(async () => {
    while (timer > 0) {
      setTimer((prev) => prev - 1);
      if (timer === 0) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }, [timer]);

  const resendCode = async () => {
    setLoading(true);
    setTimer(120);
    countdown();
    clearError();

    try {
      await resendCodeAction({ email });
      setToast({
        showToast: true,
        toastObj: {
          type: "success",
          description: "Code sent!",
        },
      });
    } catch (error: any) {
      const errorMsg =
        error?.message || error?.toString() || "Failed to send code";
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

  useEffect(() => {
    countdown();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <h4 className="text-left text-gray-500 text-sm mb-6">
        Check your email for your confirmation code.
      </h4>
      <div className="flex flex-col">
        <div className="form-group">
          <label htmlFor="code">Confirmation Code</label>
          <input
            type="text"
            id="code"
            className="form-input"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your short code"
          />
        </div>

        {hasError && <Error message={errorMessage} />}

        <button
          onClick={verify}
          className={`action-norm action-log w-max ${
            loading ? "!bg-opacity-80" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center">
              <Loading />
              <p className="text-gray-400 ml-3 text-xs">{loadingText}</p>
            </div>
          ) : (
            <span>Confirm</span>
          )}
        </button>

        {timer <= 0 && (
          <button onClick={resendCode} className="action-norm action-log w-max">
            <span>Resend Code</span>
          </button>
        )}

        {timer > 0 && (
          <button disabled className="action-norm action-log w-max opacity-50">
            <div className="flex items-center">
              <p className="text-gray-400 ml-3 text-xs">
                Retry in {timer} seconds
              </p>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
