"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Modal from "@/components/Modal";
import Loading from "@/components/loading/Loading";
import EnterSMSCode from "@/components/auth/EnterSMSCode";
import { formatCurrency } from "@/utils/currency";
import { useAuth } from "@/contexts/auth-context";
import { Profile as ProfileType } from "@/types/new/auth";
import { toastAtom } from "@/global-state/toast.atom";
import { useSetRecoilState } from "@/libs/recoil";

export function Profile() {
  const setToast = useSetRecoilState(toastAtom);
  const { getWallet, getProfile, wallet } = useAuth();

  const [showEnterSMSCodeModal, setShowEnterSMSCodeModal] = useState(false);
  const [userDetails, setUserDetails] = useState<ProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const handleReload = async () => {
    try {
      await fetchUserDetails();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserDetails = async () => {
    setIsLoading(true);
    try {
      const profile = await getProfile();
      if (profile) {
        setUserDetails(profile);
        setFormData({
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          email: profile.email || "",
          phoneNumber: profile.phoneNumber || "",
        });
      }
      await getWallet();
    } catch (error) {
      console.error("Error fetching user details:", error);
      setToast({
        showToast: true,
        toastObj: {
          type: "error",
          description: "Failed to load profile data",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f23] via-[#161923] to-[#1a1d2a]">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#0f0f23] text-gray-100 py-6 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - User Header + Wallet Cards */}
          <div className="space-y-4">
            {/* Profile Header */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between backdrop-blur-lg shadow-lg">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#faa100] to-[#e89100] text-white font-bold text-lg flex items-center justify-center rounded-xl">
                    {userDetails?.firstName?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0f0f23] ${
                      userDetails?.isActive ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  />
                </div>
                <div>
                  <h1 className="text-base font-semibold text-gray-100">
                    {userDetails?.firstName || userDetails?.lastName
                      ? `${userDetails.firstName} ${userDetails.lastName}`
                      : "User Profile"}
                  </h1>
                  <p className="text-gray-400 text-xs">{userDetails?.email}</p>
                  <span
                    className={`inline-block text-xs mt-0.5 px-2 py-0.5 rounded-md ${
                      userDetails?.isActive
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {userDetails?.isActive ? "Verified" : "Pending"}
                  </span>
                </div>
              </div>
              <Link
                href="/profile/change-password"
                className="text-xs px-3 py-1.5 bg-gradient-to-r from-[#faa100] to-[#e89100] rounded-lg text-white font-medium hover:opacity-90 transition"
              >
                Change Password
              </Link>
            </div>

            {/* Wallet Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-[#faa100] to-[#e89100] rounded-xl p-4">
                <p className="text-xs text-white/80 mb-1">Main Balance</p>
                <h2 className="text-lg font-bold text-white mb-1">
                  {formatCurrency(wallet?.balance || 0)}
                </h2>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-xs text-gray-300 mb-1">Promo Balance</p>
                <h2 className="text-lg font-bold text-white mb-1">
                  {formatCurrency(wallet?.promoBalance || 0)}
                </h2>
                <p className="text-[11px] text-gray-400">Bonus funds</p>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-300 mb-1">Account Status</p>
                <h3 className="text-sm font-semibold text-white">
                  {userDetails?.isActive ? "Verified" : "Pending Verification"}
                </h3>
              </div>
              <span
                className={`w-3 h-3 rounded-full ${
                  userDetails?.isActive ? "bg-green-500" : "bg-yellow-400"
                }`}
              />
            </div>
          </div>

          {/* Right Column - Profile Info */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xl shadow-lg">
            <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-md flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              Profile Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "First Name", value: formData.firstName },
                { label: "Last Name", value: formData.lastName },
                { label: "Email Address", value: formData.email },
                { label: "Phone Number", value: formData.phoneNumber },
              ].map((item, idx) => (
                <div key={idx}>
                  <label className="block text-[11px] text-gray-400 mb-1">
                    {item.label}
                  </label>
                  <input
                    type="text"
                    disabled
                    value={item.value}
                    className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-1.5 text-xs text-white focus:ring-1 focus:ring-[#faa100]/40 disabled:opacity-70"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showEnterSMSCodeModal && (
        <Modal onClose={() => setShowEnterSMSCodeModal(false)}>
          <EnterSMSCode
            onReload={handleReload}
            onClose={() => setShowEnterSMSCodeModal(false)}
          />
        </Modal>
      )}
    </>
  );
}
