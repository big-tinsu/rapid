"use client";

import React from "react";
import { motion } from "motion/react";

export default function TableRowLoader() {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <tr key={i} className="w-full mb-4">
          <td colSpan={100}>
            <motion.div
              className="w-full h-6 bg-gray-400/20 rounded-sm"
              animate={{
                background: [
                  "linear-gradient(90deg, rgba(156, 163, 175, 0.2) 0%, rgba(156, 163, 175, 0.4) 50%, rgba(156, 163, 175, 0.2) 100%)",
                  "linear-gradient(90deg, rgba(156, 163, 175, 0.4) 0%, rgba(156, 163, 175, 0.2) 50%, rgba(156, 163, 175, 0.4) 100%)",
                  "linear-gradient(90deg, rgba(156, 163, 175, 0.2) 0%, rgba(156, 163, 175, 0.4) 50%, rgba(156, 163, 175, 0.2) 100%)",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1, // Stagger the animation for each row
              }}
            />
          </td>
        </tr>
      ))}
    </>
  );
}
