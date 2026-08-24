"use client";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  easeInOut,
} from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { id: "home", label: "Home", href: "#home" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();

    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${targetId}`);
    } else if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "#home");
    }
  };

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-150%", opacity: 1 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: easeInOut }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div
        className="relative flex items-center p-1.5 bg-pink-950/10 backdrop-blur-sm backdrop-saturate-150 border border-pink-300/30 rounded-full shadow-[0_8px_20px_rgba(243,72,152,0.1),inset_0_1px_1px_rgba(255,255,255,0.6)]"
        onMouseLeave={() => setHovered(null)}
      >
        {navLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            onClick={(e) => handleScroll(e, link.id)}
            onMouseEnter={() => setHovered(link.id)}
            className="relative z-10 px-6 py-2.5 rounded-full flex items-center justify-center"
          >
            {/* EFEK LENS & GLASSMORPHISM SAAT DI-HOVER */}
            {hovered === link.id && (
              <motion.div
                layoutId="liquid-slider"
                // Gelembung putih ke-pink-pinkan transparan
                className="absolute inset-0 bg-white/40 backdrop-blur-[20px] backdrop-saturate-150 border border-pink-200/50 rounded-full shadow-[0_4px_12px_rgba(243,72,152,0.15),inset_0_1px_1px_rgba(255,255,255,0.9)]"
                transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
              />
            )}

            {/* EFEK MAGNIFY (Teks membesar pas di-hover) */}
            <motion.span
              animate={{
                scale: hovered === link.id ? 1.15 : 1,
                color: hovered === link.id ? "#4a1c36" : "#f34898",
              }}
              transition={{ duration: 0.2 }}
              className="relative z-10 text-sm font-semibold"
            >
              {link.label}
            </motion.span>
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
