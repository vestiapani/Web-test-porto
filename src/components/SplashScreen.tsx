"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";

const steps = [
  { code: "01 // INIT", label: "VESTIAPANI" },
  { code: "02 // SYNC", label: "EDITORIAL UI" },
  { code: "03 // LOAD", label: "CREATIVE DEV" },
  { code: "04 // READY", label: "パニ // 2026" },
];

export default function SplashScreen() {
  const [stepIdx, setStepIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setIsVisible(false);
      return;
    }

    if (stepIdx < steps.length - 1) {
      const timer = setTimeout(() => setStepIdx((prev) => prev + 1), 220);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 320);
      return () => clearTimeout(timer);
    }
  }, [stepIdx, shouldReduceMotion]);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("overflow");
    }
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isVisible]);

  const progress = Math.round(((stepIdx + 1) / steps.length) * 100);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[999] pointer-events-none flex overflow-hidden">
          {/* 4 KOLOM SHUTTER VERTIKAL YANG TERANGKAT BERGANTIAN SAAT EXIT */}
          {[0, 1, 2, 3].map((col) => (
            <motion.div
              key={col}
              initial={{ y: "0%" }}
              exit={{
                y: "-100%",
                transition: {
                  duration: 0.65,
                  delay: col * 0.06,
                  ease: [0.76, 0, 0.24, 1],
                },
              }}
              className="
                relative h-full w-1/4 bg-[#1a1116]
                border-r border-pink-500/10 last:border-r-0
              "
            >
              {/* Garis Aksen Palette di Ujung Bawah Tiap Kolom */}
              <div
                className={`absolute bottom-0 inset-x-0 h-1.5 ${
                  col === 0
                    ? "bg-[#ffb7c5]"
                    : col === 1
                      ? "bg-[#a2e4f5]"
                      : col === 2
                        ? "bg-[#e2d1f9]"
                        : "bg-pink-500"
                }`}
              />
            </motion.div>
          ))}

          {/* KONTEN TENGAH SPLASH SCREEN */}
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              y: -30,
              transition: { duration: 0.3, ease: "easeIn" },
            }}
            className="absolute inset-0 flex flex-col justify-between p-6 md:p-14 text-pink-50"
          >
            {/* Header Kiri-Kanan */}
            <div className="flex items-center justify-between font-mono text-[10px] md:text-xs tracking-[0.25em] text-pink-200/50">
              <span>PORTFOLIO // EDITION 26</span>
              <span>{steps[stepIdx].code}</span>
            </div>

            {/* Centerpiece: Color-Bar Sweep + Dynamic Label */}
            <div className="my-auto max-w-xl w-full mx-auto">
              <div className="flex items-baseline justify-between mb-3">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={steps[stepIdx].label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.15 }}
                    className="font-syncopate text-xl sm:text-3xl md:text-4xl font-bold tracking-wider text-white"
                  >
                    {steps[stepIdx].label}
                  </motion.span>
                </AnimatePresence>

                <span className="font-mono text-xs md:text-sm text-[#ffb7c5] tracking-widest">
                  {String(progress).padStart(3, "0")}%
                </span>
              </div>

              {/* Tri-Color Palette Progress Bar */}
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden p-0.5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#ffb7c5] via-[#a2e4f5] to-[#e2d1f9]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Footer Splash */}
            <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-pink-200/40 uppercase">
              <span>IVAN WIRAHADI PERMANA</span>
              <span>ID // JKT</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
