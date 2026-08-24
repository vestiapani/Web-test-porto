"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const greetings = ["Halo", "Hello", "Hola", "Bonjour", "こんにちは"];

export default function SplashScreen() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (index < greetings.length - 1) {
      const timer = setTimeout(() => setIndex(index + 1), 350);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 800);
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 2, ease: "easeInOut" } }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#fffafd] text-pink-950 pointer-events-none"
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={greetings[index]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="text-4xl md:text-6xl font-bold tracking-tighter"
            >
              {greetings[index]}
            </motion.h1>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
