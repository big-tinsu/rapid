"use client";

import { useEffect, useState } from "react";

export const Dots = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const frames = ["", ".", "..", "...", "...."];
    let i = 0;
    const interval = setInterval(() => {
      setDots(frames[i]);
      i = (i + 1) % frames.length;
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return <span className="ml-1">{dots}</span>;
};
