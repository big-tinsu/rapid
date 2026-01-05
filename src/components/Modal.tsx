"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IconClose } from "@/components/icons";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  title?: string;
  children: ReactNode;
  onClose: () => void;
}

// Client-side only component, not rendered during SSR
export default function Modal({ title, children, onClose }: ModalProps) {
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
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="flex flex-col flex-shrink-0 min-w-[350px] max-w-[400px] max-h-[90vh] p-5 bg-white rounded-lg m-4 relative shadow-lg overflow-auto"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">{title}</h3>
            <div className="cursor-pointer" onClick={onClose}>
              <IconClose />
            </div>
          </div>

          <div className="px-2 mt-5 flex flex-col items-center justify-center overflow-y-auto">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  // Create portal with the stored element
  return createPortal(modalContent, portalElement);
}
