"use client";

import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Dots } from "./Dots";

interface OverlayLoaderProps {
  loaderText?: string;
}

export default function OverlayLoader({ loaderText }: OverlayLoaderProps) {
  const [mounted, setMounted] = useState(false);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Make sure we're in the browser
    if (typeof window === "undefined") return;

    // Set portal target element - use dedicated modal-root or fallback to body
    const modalRoot = document.getElementById("modal-root");
    setPortalElement(modalRoot || document.body);
    setMounted(true);

    // Prevent scrolling on body when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = "auto";
      setMounted(false);
    };
  }, []);

  // Don't render anything on server-side or before mounted
  if (!mounted || !portalElement) return null;

  // Modal content
  const modalContent = (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 grid place-items-center bg-black bg-opacity-70 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <span className="flex flex-col items-center justify-center gap-4">
          <FaSpinner className="text-white text-2xl animate-spin" size={45} />
          {loaderText && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-white text-lg font-semibold flex"
            >
              {loaderText}
              <motion.span
                animate={{
                  opacity: [1, 1, 1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Dots />
              </motion.span>
            </motion.p>
          )}
        </span>
      </motion.div>
    </AnimatePresence>
  );

  // Create portal with the stored element
  return createPortal(modalContent, portalElement);
}
