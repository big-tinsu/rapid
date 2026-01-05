"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Link from "next/link";
import Modal from "@/components/Modal";
import EnterEmailCode from "@/components/auth/EnterEmailCode";
import { RegisterDto } from "@/types/new/auth";
import { register } from "@/actions/auth";
import { toastAtom } from "@/global-state/toast.atom";
import { useSetRecoilState } from "@/libs/recoil";

export function Register() {
  const router = useRouter();
  const setToast = useSetRecoilState(toastAtom);

  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isReferred, setIsReferred] = useState(false);

  // Get referral code from URL
  useEffect(() => {
    if (router.query.code && typeof router.query.code === "string") {
      setReferralCode(router.query.code);
      setIsReferred(true);
    }
  }, [router.query]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !username || !email || !phone || !password) {
      setToast({
        showToast: true,
        toastObj: {
          type: "warning",
          description: "Please fill all required fields",
        },
      });
      return;
    }

    const formattedPhone = phone.replace(/\s+/g, "");

    const data: RegisterDto = {
      email,
      phoneNumber: formattedPhone,
      firstName,
      lastName,
      password,
      username,
    };

    if (referralCode) {
      data.referrerCode = referralCode;
    }

    setLoading(true);
    setHasError(false);

    try {
      await register(data);

      if (typeof window !== "undefined") {
        sessionStorage.setItem("email", email);
      }

      setToast({
        showToast: true,
        toastObj: {
          type: "success",
          description: "Account created! Please verify your email.",
        },
      });

      setShowOtpModal(true);
    } catch (error: any) {
      setHasError(true);
      setErrorMessage(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpModalClose = () => {
    setShowOtpModal(false);
    router.push("/auth/login");
  };

  return (
    <div className="w-full max-w-[400px] mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-[var(--bc-text-secondary)]">Join OneRapidPlay today</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        {/* Name Row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-[var(--bc-text-secondary)] mb-1.5">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2.5 bg-[var(--bc-bg-secondary)] border border-[var(--bc-border)] rounded-lg text-white placeholder-[var(--bc-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--bc-accent-green)] focus:border-transparent transition-all text-sm"
              placeholder="John"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--bc-text-secondary)] mb-1.5">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2.5 bg-[var(--bc-bg-secondary)] border border-[var(--bc-border)] rounded-lg text-white placeholder-[var(--bc-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--bc-accent-green)] focus:border-transparent transition-all text-sm"
              placeholder="Doe"
              required
            />
          </div>
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-[var(--bc-text-secondary)] mb-1.5">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2.5 bg-[var(--bc-bg-secondary)] border border-[var(--bc-border)] rounded-lg text-white placeholder-[var(--bc-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--bc-accent-green)] focus:border-transparent transition-all text-sm"
            placeholder="johndoe"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-[var(--bc-text-secondary)] mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 bg-[var(--bc-bg-secondary)] border border-[var(--bc-border)] rounded-lg text-white placeholder-[var(--bc-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--bc-accent-green)] focus:border-transparent transition-all text-sm"
            placeholder="user@example.com"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-[var(--bc-text-secondary)] mb-1.5">
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2.5 bg-[var(--bc-bg-secondary)] border border-[var(--bc-border)] rounded-lg text-white placeholder-[var(--bc-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--bc-accent-green)] focus:border-transparent transition-all text-sm"
            placeholder="+234 800 000 0000"
            required
          />
        </div>

        {/* Referral Code */}
        <div>
          <label className="block text-sm font-medium text-[var(--bc-text-secondary)] mb-1.5">
            Referral Code <span className="text-[var(--bc-text-secondary)]">(Optional)</span>
          </label>
          <input
            type="text"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            disabled={isReferred}
            className="w-full px-3 py-2.5 bg-[var(--bc-bg-secondary)] border border-[var(--bc-border)] rounded-lg text-white placeholder-[var(--bc-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--bc-accent-green)] focus:border-transparent transition-all text-sm disabled:opacity-50"
            placeholder="Enter referral code"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-[var(--bc-text-secondary)] mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 bg-[var(--bc-bg-secondary)] border border-[var(--bc-border)] rounded-lg text-white placeholder-[var(--bc-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--bc-accent-green)] focus:border-transparent transition-all pr-10 text-sm"
              placeholder="Create a password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--bc-text-secondary)] hover:text-white transition-colors"
            >
              {isPasswordVisible ? (
                <IoEyeOffOutline className="text-lg" />
              ) : (
                <IoEyeOutline className="text-lg" />
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
          disabled={loading || !firstName || !lastName || !username || !email || !phone || !password}
          className="w-full py-3 bc-button-primary text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Creating account...
            </span>
          ) : (
            "Sign Up"
          )}
        </button>

        <div className="text-center pt-4 border-t border-[var(--bc-border)]">
          <p className="text-[var(--bc-text-secondary)] text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-[var(--bc-accent-green)] hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </form>

      {showOtpModal && (
        <Modal title="Verify Your Email" onClose={handleOtpModalClose}>
          <EnterEmailCode
            fromRegistration={true}
            email={email}
            onReload={() => {}}
            onClose={() => setShowOtpModal(false)}
            onSuccess={() => router.push("/auth/login")}
          />
        </Modal>
      )}
    </div>
  );
}
