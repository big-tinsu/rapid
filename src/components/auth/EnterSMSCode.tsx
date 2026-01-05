// src/components/auth/EnterSMSCode.tsx
"use client";

import { useState, useEffect } from "react";
import Loading from "@/components/loading/Loading";
import Error from "@/components/error/Error";
import { getUser } from "@/utils/helper";
import { useRouter } from "next/router";
import { Customer } from "@/types/Customer";
import { toastAtom } from "@/global-state/toast.atom";
import { useSetRecoilState } from "@/libs/recoil";

interface EnterSMSCodeProps {
  fromRegistration?: boolean;
  onReload?: () => void;
  onClose?: () => void;
  onSuccess?: () => void;
}

export default function EnterSMSCode({
  fromRegistration = false,
  onReload,
  onClose,
  onSuccess,
}: EnterSMSCodeProps) {
  const router = useRouter();
  const user: Customer | null = getUser();

  const [code, setCode] = useState("");
  const [loadingText] = useState("Processing...");
  const [timer, setTimer] = useState(120);
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
      // await useAuthStore.getState().verifyRegistrationSMSCode({
      //   email: user?.mobile!,
      //   otp: code,
      // });

      setToast({
        showToast: true,
        toastObj: {
          type: "success",
          description: "Your phone number has been verified!",
        },
      });
      setCode("");
      onSuccess?.();
      closeAuth();
    } catch (error: any) {
      setToast({
        showToast: true,
        toastObj: {
          type: "error",
          description: error,
        },
      });
      setHasError(true);
      setErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const countdown = async () => {
    while (timer > 0) {
      setTimer((prev) => prev - 1);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  };

  const resendCode = async () => {
    setTimer(120);
    countdown();
    clearError();

    try {
      // await useAuthStore.getState().sendSMSCode(user?.mobile!);
      setToast({
        showToast: true,
        toastObj: {
          type: "success",
          description: "Code sent!",
        },
      });
    } catch (error: any) {
      setToast({
        showToast: true,
        toastObj: {
          type: "error",
          description: error,
        },
      });
      setHasError(true);
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    countdown();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <h4 className="text-left text-gray-500 text-sm mb-6">
        Check your SMS for your confirmation code.
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

        {timer === 0 && (
          <button onClick={resendCode} className="action-norm action-log w-max">
            <span>Resend Code</span>
          </button>
        )}

        {timer > 0 && (
          <button className="action-norm action-log w-max">
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
