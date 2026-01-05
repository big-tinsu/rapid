"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { toastAtom } from "@/global-state/toast.atom";
import { useSetRecoilState } from "@/libs/recoil";
import { resetPassword } from "@/actions/auth";

export function ResetPassword() {
  const router = useRouter();
  const setToast = useSetRecoilState(toastAtom);

  const [emailAddress, setEmailAddress] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const email = sessionStorage.getItem("email") || "";
      setEmailAddress(email);

      if (!email) {
        router.push("/auth/forgot-password");
      }
    }
  }, [router]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const passwordsMatch = password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || !password || !confirmPassword) {
      setToast({
        showToast: true,
        toastObj: {
          type: "warning",
          description: "All fields are required!",
        },
      });
      return;
    }

    if (!passwordsMatch) {
      setToast({
        showToast: true,
        toastObj: {
          type: "warning",
          description: "Passwords don't match!",
        },
      });
      return;
    }

    setLoading(true);
    setHasError(false);

    try {
      const response = await resetPassword({
        email: emailAddress,
        newPassword: password,
        otp: otp,
      });

      setToast({
        showToast: true,
        toastObj: {
          type: "success",
          description: response.message || "Password reset successfully!",
        },
      });

      sessionStorage.removeItem("email");
      router.push("/auth/login");
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
        <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
        <p className="text-[var(--bc-text-secondary)]">Enter the code sent to your email</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* OTP Code */}
        <div>
          <label className="block text-sm font-medium text-[var(--bc-text-secondary)] mb-2">
            Verification Code
          </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 bg-[var(--bc-bg-secondary)] border border-[var(--bc-border)] rounded-lg text-white placeholder-[var(--bc-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--bc-accent-green)] focus:border-transparent transition-all tracking-widest text-center text-lg"
            placeholder="Enter code"
            required
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-[var(--bc-text-secondary)] mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--bc-bg-secondary)] border border-[var(--bc-border)] rounded-lg text-white placeholder-[var(--bc-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--bc-accent-green)] focus:border-transparent transition-all pr-12"
              placeholder="Enter new password"
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

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-[var(--bc-text-secondary)] mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-4 py-3 bg-[var(--bc-bg-secondary)] border rounded-lg text-white placeholder-[var(--bc-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--bc-accent-green)] focus:border-transparent transition-all pr-12 ${
                confirmPassword && !passwordsMatch
                  ? "border-red-500"
                  : "border-[var(--bc-border)]"
              }`}
              placeholder="Confirm new password"
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
          {confirmPassword && !passwordsMatch && (
            <p className="text-red-400 text-sm mt-1">Passwords don't match</p>
          )}
        </div>

        {hasError && (
          <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-400 text-sm">{errorMessage}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !otp || !password || !confirmPassword || !passwordsMatch}
          className="w-full py-3 bc-button-primary text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Resetting...
            </span>
          ) : (
            "Reset Password"
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
