"use client";

import { truncateString } from "@/utils/string";
import { useState } from "react";
import styles from "./index.module.css";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  title: string;
  subtitle: string;
  image: string;
  children: React.ReactNode;
  collapsedText: string;
}

export function PromotionItem({
  image,
  title,
  subtitle,
  children,
  collapsedText,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles["promotion"]}>
      <img src={image} alt="image" className="text-[10px]" />

      <div
        className={classNames(styles["promotion-text"], "flex flex-col gap-3")}
      >
        <div className={classNames(styles["title"], "flex flex-col gap-2")}>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm">{subtitle}</p>
        </div>
        <AnimatePresence mode="wait">
          <motion.div 
            key={isExpanded ? "expanded" : "collapsed"}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={classNames(styles["description"])}
          >
            {isExpanded ? children : <p>{truncateString(collapsedText, 45)}</p>}

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-sm"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
