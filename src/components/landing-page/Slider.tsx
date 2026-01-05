"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronLeft, IconChevronRight } from "@/components/icons";
import styles from "./Slider.module.css";

// Import your images - adjust the paths as needed
const SlideImageOne = "/assets/images/sliders/slide1.png";
const SlideImageTwo = "/assets/images/sliders/slide2.png";
const SlideImageThree = "/assets/images/sliders/slide3.png";

export default function Slider() {
  const [activeImageIndex, setActiveImageIndex] = useState(2);
  const slides = [SlideImageOne, SlideImageTwo, SlideImageThree];
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    // Clear existing interval if any
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start new interval
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setActiveImageIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        return newIndex === slides.length ? 0 : newIndex;
      });
    }, 5000);
  };

  const setAsActiveImg = (index: number) => {
    setDirection(index > activeImageIndex ? 1 : -1);
    setActiveImageIndex(index);
    startTimer(); // Restart timer when indicator is clicked
  };

  const prevImage = () => {
    setDirection(-1);
    if (activeImageIndex === 0) {
      setActiveImageIndex(slides.length - 1);
    } else {
      setActiveImageIndex(activeImageIndex - 1);
    }
    startTimer(); // Restart timer when prev button is clicked
  };

  const nextImage = () => {
    setDirection(1);
    if (activeImageIndex === slides.length - 1) {
      setActiveImageIndex(0);
    } else {
      setActiveImageIndex(activeImageIndex + 1);
    }
    startTimer(); // Restart timer when next button is clicked
  };

  useEffect(() => {
    startTimer(); // Start timer on mount

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [slides.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="max-w-[1020px] flex justify-center mx-auto">
      <div className="w-full h-[86px] sm:h-[184px] md:h-[190px] lg:h-[287px] relative flex justify-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeImageIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="flex w-full h-[86px] sm:h-[184px] md:h-[190px] lg:h-[287px] absolute top-0 left-0 bottom-0"
          >
            <img
              src={slides[activeImageIndex]}
              alt="Banner Image"
              className="w-full h-[86px] sm:h-[184px] md:h-[190px] lg:h-[287px] sm:object-contain"
              width={1020}
              height={287}
            />
          </motion.div>
        </AnimatePresence>

        <div className={styles.indicators}>
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`${styles.indicatorWrapper} flex items-center mx-1`}
            >
              <div
                className={`${styles.indicator} ${
                  idx === activeImageIndex ? styles.active : ""
                }`}
                onClick={() => setAsActiveImg(idx)}
              ></div>
            </div>
          ))}
        </div>

        <div className={`${styles.ctrlBtns} relative h-full w-full`}>
          <div onClick={prevImage} className={styles.prevImage}>
            <IconChevronLeft />
          </div>

          <div onClick={nextImage} className={styles.nextImage}>
            <IconChevronRight />
          </div>
        </div>
      </div>
    </section>
  );
}
