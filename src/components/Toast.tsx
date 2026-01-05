// src/components/Toast.tsx
"use client";

import { useEffect, useState } from "react";
import {
  FaCheck,
  FaInfo,
  FaExclamationTriangle,
  FaTimes,
} from "react-icons/fa";
import { useRecoilState } from "@/libs/recoil";
import { toastAtom } from "@/global-state/toast.atom";

export default function Toast() {
  const [mounted, setMounted] = useState(false);
  const [{ showToast, toastObj }, setToast] = useRecoilState(toastAtom);

  const toggleToast = () => {
    setToast({ showToast: false, toastObj: { type: "", description: "" } });
  };

  // Only run after mounting on client
  useEffect(() => {
    setMounted(true);

    if (showToast) {
      const timer = setTimeout(() => {
        toggleToast();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showToast, toggleToast]);

  // Don't render anything on server or if toast is not visible
  if (!mounted || !showToast) return null;

  // Determine toast styles based on type
  const bgColor =
    toastObj.type === "success"
      ? "bg-[#47d764]"
      : toastObj.type === "info"
      ? "bg-[#2f86eb]"
      : toastObj.type === "warning"
      ? "bg-[#ffc021]"
      : "bg-[#f73a3a]";

  const textColor =
    toastObj.type === "warning" ? "text-[#201616]" : "text-white";

  // Get appropriate icon
  const ToastIcon = () => {
    switch (toastObj.type) {
      case "success":
        return <FaCheck className={`text-lg font-semibold ${textColor}`} />;
      case "info":
        return <FaInfo className={`text-lg font-semibold ${textColor}`} />;
      case "warning":
        return (
          <FaExclamationTriangle
            className={`text-lg font-semibold ${textColor}`}
          />
        );
      case "error":
      default:
        return <FaTimes className={`text-lg font-semibold ${textColor}`} />;
    }
  };

  return (
    <div className="z-50 fixed top-0 left-0 right-0 flex justify-center mx-auto">
      <div
        className={`w-[70%] sm:w-[60%] md:w-[50%] lg:max-w-[300px] min-h-16 fixed top-2 grid items-center opacity-100 shadow-sm rounded-lg ${bgColor} toast-animation`}
        style={{ zIndex: 100 }}
      >
        <div className="relative py-2 px-3 flex justify-between items-center">
          <div className="flex items-center gap-5">
            <ToastIcon />

            <div className={`flex flex-col gap-0 ${textColor}`}>
              <p className="font-semibold capitalize">{toastObj.type}</p>
              <p className="text-[13px] font-medium">{toastObj.description}</p>
            </div>
          </div>

          <div onClick={toggleToast} className="cursor-pointer">
            <FaTimes
              size={14}
              color={toastObj.type === "warning" ? "#201616" : "#ffffff"}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .toast-animation {
          animation: slideIn 0.5s forwards;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
