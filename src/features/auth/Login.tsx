"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/auth-context";
import { toastAtom } from "@/global-state/toast.atom";
import { useSetRecoilState } from "@/libs/recoil";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Link from "next/link";
import Modal from "@/components/Modal";
import EnterEmailCode from "@/components/auth/EnterEmailCode";

export function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const setToast = useSetRecoilState(toastAtom);
  const redirectPath = (router.query.redirect as string) || "/casino";

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [otpModal, setOtpModal] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

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
        window.location.href = redirectPath;
      }
    } catch (error: any) {
      setHasError(true);
      setErrorMessage(error.message || "Login failed");

      if (error.message?.includes("account is not activated")) {
        setOtpModal(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-[var(--bc-text-secondary)]">Sign in to continue to OneRapidPlay</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-[var(--bc-text-secondary)] mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-[var(--bc-bg-secondary)] border border-[var(--bc-border)] rounded-lg text-white placeholder-[var(--bc-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--bc-accent-green)] focus:border-transparent transition-all"
            placeholder="user@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--bc-text-secondary)] mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--bc-bg-secondary)] border border-[var(--bc-border)] rounded-lg text-white placeholder-[var(--bc-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--bc-accent-green)] focus:border-transparent transition-all pr-12"
              placeholder="Enter password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--bc-text-secondary)] hover:text-white transition-colors"
            >
              {isPasswordVisible ? (
                <IoEyeOffOutline className="text-xl" />
              ) : (
                <IoEyeOutline className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {hasError && (
          <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-400 text-sm">{errorMessage}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !email || !password}
          className="w-full py-3 bc-button-primary text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </button>

        <div className="text-center">
          <Link
            href="/auth/forgot-password"
            className="text-[var(--bc-accent-green)] hover:underline text-sm"
          >
            Forgot password?
          </Link>
        </div>

        <div className="text-center pt-4 border-t border-[var(--bc-border)]">
          <p className="text-[var(--bc-text-secondary)] text-sm">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-[var(--bc-accent-green)] hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </form>

      {otpModal && (
        <Modal title="Verify Your Email" onClose={() => setOtpModal(false)}>
          <EnterEmailCode
            fromRegistration={false}
            email={email}
            onReload={() => {}}
            onClose={() => setOtpModal(false)}
            onSuccess={() => {
              if (typeof window !== "undefined") {
                sessionStorage.removeItem("email");
                window.location.href = redirectPath;
              }
            }}
          />
        </Modal>
      )}
    </div>
  );
}
