"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-slate-50 pointer-events-none">
      {/* CSS Grid Pattern Halus (Tekstur Modern) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f187a6_1px,transparent_1px),linear-gradient(to_bottom,#f187a6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.07]"></div>

      {/* Blob 1 - Kiri Atas (Pink Terang) */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] max-w-[600px] aspect-square rounded-full bg-pink-300/40 mix-blend-multiply filter blur-[100px] opacity-70"
      />

      {/* Blob 2 - Kanan Atas (Rose/Peach) */}
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-[5%] right-[-5%] w-[45vw] max-w-[500px] aspect-square rounded-full bg-rose-300/40 mix-blend-multiply filter blur-[100px] opacity-70"
      />

      {/* Blob 3 - Bawah Tengah (Fuchsia Lembut) */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute bottom-[-15%] left-[20%] w-[60vw] max-w-[700px] aspect-square rounded-full bg-fuchsia-300/30 mix-blend-multiply filter blur-[120px] opacity-60"
      />
    </div>
  );
}
