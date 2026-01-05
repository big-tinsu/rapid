"use client";

import { useState, useEffect } from "react";
import Error from "@/components/error/Error";
import Loading from "@/components/loading/Loading";
import { IconEyeVisibility, IconEyeVisibilityOff } from "@/components/icons";
import { useAuth } from "@/contexts/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "../Modal";
import EnterEmailCode from "./EnterEmailCode";
import { toastAtom } from "@/global-state/toast.atom";
import { useSetRecoilState } from "@/libs/recoil";

export default function LoginWithEmail() {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");

  const [loading, setLoading] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [otpModal, setOtpModal] = useState(false);

  const { login } = useAuth();
  const setToast = useSetRecoilState(toastAtom);

  // Move sessionStorage access to useEffect to ensure it only runs client-side
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== "undefined") {
      const savedEmail = sessionStorage.getItem("email") || "";
      setEmail(savedEmail);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    setOtpModal(false);
    if (!email || !password) {
      setToast({
        showToast: true,
        toastObj: {
          type: "warning",
          description: "Please fill all fields",
        },
      });
      return;
    }

    setLoading(true);
    setHasError(false);
    setDisabledButton(true);

    try {
      const response = await login({
        to: email,
        password,
      });

      if (!response.isVerified) {
        setOtpModal(true);
        return;
      }
      setToast({
        showToast: true,
        toastObj: {
          type: "success",
          description: "Successfully logged in",
        },
      });

      if (typeof window !== "undefined") {
        sessionStorage.removeItem("email");
        window.location.href = redirectPath || "/";
      }
    } catch (error: any) {
      setHasError(true);
      setErrorMessage(error.message || error);
      if (error.message.includes("account is not activated")) {
        // await useAuthStore.getState().resendEmailCode({ email });
        setOtpModal(true);
      }
    } finally {
      setLoading(false);
      setDisabledButton(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="mx-auto w-full max-w-[350px] md:max-w-[500px]"
    >
      {navigating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg flex flex-col items-center">
            <Loading />
            <p className="mt-2">Redirecting to dashboard...</p>
          </div>
        </div>
      )}

      <div className="form-group">
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input
          required
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          type="email"
          placeholder="e.g user@example.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <div className="relative">
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          <div
            className="w-6 absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <IconEyeVisibility />
            ) : (
              <IconEyeVisibilityOff />
            )}
          </div>
        </div>
      </div>

      {hasError && <Error message={errorMessage} />}

      <button
        onClick={handleLogin}
        className={`action-norm action-log ${loading ? "!bg-opacity-80" : ""}`}
        disabled={
          disabledButton || loading || navigating || !email || !password
        }
      >
        {loading ? <Loading /> : <span>Login</span>}
      </button>

      <p className="text-[#faa100] p-5">
        <a href="/auth/forgot-password">Forgot password?</a>
      </p>

      {otpModal && (
        <Modal title="Verify Email To Login" onClose={() => setOtpModal(false)}>
          <EnterEmailCode
            fromRegistration={false}
            email={email}
            onReload={() => {}}
            onClose={() => setOtpModal(false)}
            onSuccess={() => {
              if (typeof window !== "undefined") {
                sessionStorage.removeItem("email");
                window.location.href = redirectPath || "/";
              }
            }}
          />
        </Modal>
      )}
    </form>
  );
}
