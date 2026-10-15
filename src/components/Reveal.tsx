"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type PaletteColor = "pink" | "cyan" | "purple" | "plum";

interface RevealProps {
  children: ReactNode;
  color?: PaletteColor;
  delay?: number;
  className?: string;
  width?: "fit" | "full";
}

const paletteMap: Record<PaletteColor, string> = {
  pink: "bg-[#ffb7c5]",
  cyan: "bg-[#a2e4f5]",
  purple: "bg-[#e2d1f9]",
  plum: "bg-[#1a1116]",
};

export default function Reveal({
  children,
  color = "pink",
  delay = 0,
  className = "",
  width = "fit",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden py-1.5 -my-1 ${
        width === "fit" ? "inline-block" : "block w-full"
      } ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{
          duration: 0.55,
          delay: delay + 0.2,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={{ left: "0%", right: "100%" }}
        animate={
          isInView
            ? {
                left: ["0%", "0%", "100%"],
                right: ["100%", "0%", "0%"],
              }
            : { left: "0%", right: "100%" }
        }
        transition={{
          duration: 0.65,
          delay,
          times: [0, 0.5, 1],
          ease: [0.76, 0, 0.24, 1],
        }}
        className={`
          absolute inset-y-1 z-20 pointer-events-none rounded-xs
          ${paletteMap[color]}
        `}
      />
    </div>
  );
}
