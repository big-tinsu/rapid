"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { toastAtom } from "@/global-state/toast.atom";
import { useSetRecoilState } from "@/libs/recoil";
import { forgotPassword } from "@/actions/auth";

export function ForgotPassword() {
  const router = useRouter();
  const setToast = useSetRecoilState(toastAtom);

  const [emailAddress, setEmailAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailAddress) {
      setToast({
        showToast: true,
        toastObj: {
          type: "warning",
          description: "Email is required!",
        },
      });
      return;
    }

    setLoading(true);
    setHasError(false);

    try {
      const response = await forgotPassword({ email: emailAddress });
      setToast({
        showToast: true,
        toastObj: {
          type: "success",
          description: response.message || "Reset code sent to your email",
        },
      });

      if (typeof window !== "undefined") {
        sessionStorage.setItem("email", emailAddress);
      }

      router.push("/auth/reset-password");
    } catch (error: any) {
      setHasError(true);
      setErrorMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Forgot Password?</h1>
        <p className="text-[var(--bc-text-secondary)]">Enter your email and we'll send you a reset code</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-[var(--bc-text-secondary)] mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className="w-full px-4 py-3 bg-[var(--bc-bg-secondary)] border border-[var(--bc-border)] rounded-lg text-white placeholder-[var(--bc-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--bc-accent-green)] focus:border-transparent transition-all"
            placeholder="user@example.com"
            required
          />
        </div>

        {hasError && (
          <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-400 text-sm">{errorMessage}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !emailAddress}
          className="w-full py-3 bc-button-primary text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending...
            </span>
          ) : (
            "Send Reset Code"
          )}
        </button>

        <div className="text-center pt-4 border-t border-[var(--bc-border)]">
          <p className="text-[var(--bc-text-secondary)] text-sm">
            Remember your password?{" "}
            <Link href="/auth/login" className="text-[var(--bc-accent-green)] hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
