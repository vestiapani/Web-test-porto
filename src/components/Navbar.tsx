"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  easeInOut,
} from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Globe, Menu, X, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Magnetic from "@/components/Magnetic";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, lang, toggleLang } = useLanguage();

  const navLinks = [
    { id: "home", num: "01", label: t.nav.home, href: "#home" },
    { id: "about", num: "02", label: t.nav.about, href: "#about" },
    {
      id: "capabilities",
      num: "03",
      label: t.nav.capabilities,
      href: "#capabilities",
    },
    { id: "projects", num: "04", label: t.nav.projects, href: "#projects" },
    { id: "contact", num: "05", label: t.nav.contact, href: "#contact" },
  ];

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (!mobileMenuOpen) {
      setHidden(latest > previous && latest > 150);
    }
  });

  useEffect(() => {
    const sectionIds = ["home", "about", "capabilities", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -50% 0px" },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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
    <>
      <motion.header
        variants={{
          visible: { y: "0%", opacity: 1 },
          hidden: { y: "-220%", opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: easeInOut }}
        className="fixed top-4 md:top-6 inset-x-0 z-50 px-4 md:px-0 flex justify-center pointer-events-none"
      >
        {/* DESKTOP NAV PILL */}
        <nav
          aria-label="Desktop Navigation"
          onMouseLeave={() => setHovered(null)}
          className={`
            hidden md:flex items-center gap-1 p-1.5
            bg-white/75 backdrop-blur-xl border border-pink-200/70 rounded-full
            shadow-[0_8px_25px_rgba(244,143,177,0.15)]
            ${hidden ? "pointer-events-none" : "pointer-events-auto"}
          `}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Magnetic key={link.id} strength={0.22}>
                <Link
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.id)}
                  onMouseEnter={() => setHovered(link.id)}
                  className="
                    relative z-10 px-5 py-2 rounded-full flex items-center
                    justify-center gap-1.5 outline-none focus-visible:ring-2
                    focus-visible:ring-pink-400
                  "
                >
                  {hovered === link.id && (
                    <motion.div
                      layoutId="liquid-slider"
                      className="
                        absolute inset-0 bg-pink-100/70 border border-pink-200/80
                        rounded-full
                      "
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.5,
                      }}
                    />
                  )}

                  <span
                    className={`
                      relative z-10 text-sm font-semibold transition-colors
                      ${
                        hovered === link.id || isActive
                          ? "text-pink-950"
                          : "text-pink-900/65"
                      }
                    `}
                  >
                    {link.label}
                  </span>

                  {isActive && (
                    <motion.span
                      layoutId="active-nav-dot"
                      className="relative z-10 w-1.5 h-1.5 rounded-full bg-pink-500"
                    />
                  )}
                </Link>
              </Magnetic>
            );
          })}

          <div className="w-[1px] h-5 bg-pink-950/10 mx-1" />

          <Magnetic strength={0.25}>
            <button
              type="button"
              onClick={toggleLang}
              className="
                px-3.5 py-2 rounded-full bg-pink-950 text-pink-50
                font-mono text-xs font-bold tracking-widest flex items-center
                gap-1.5 hover:bg-pink-600 transition-colors cursor-pointer
              "
            >
              <Globe size={13} className="text-[#ffb7c5]" />
              <span>{lang.toUpperCase()}</span>
            </button>
          </Magnetic>
        </nav>

        {/* MOBILE COMPACT BAR */}
        <div
          className={`
            flex md:hidden items-center justify-between w-full max-w-md
            px-4 py-2.5 rounded-2xl
            bg-white/85 backdrop-blur-xl border border-pink-200/80
            shadow-[0_8px_25px_rgba(26,17,22,0.06)]
            ${hidden ? "pointer-events-none" : "pointer-events-auto"}
          `}
        >
          <a
            href="#home"
            onClick={(e) => handleScroll(e, "home")}
            className="font-syncopate font-bold text-xs tracking-[0.2em] text-pink-950 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-pink-500" />
            <span>PANI</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLang}
              className="
                px-3 py-1.5 rounded-xl bg-pink-50 border border-pink-200/70
                text-pink-950 font-mono text-[11px] font-bold tracking-wider
                flex items-center gap-1 active:scale-95 transition-transform
              "
            >
              <Globe size={12} className="text-pink-500" />
              <span>{lang.toUpperCase()}</span>
            </button>

            <button
              type="button"
              aria-label="Toggle Menu"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="
                p-2 rounded-xl bg-[#1a1116] text-pink-50
                active:scale-95 transition-transform
              "
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE EDITORIAL DRAWER MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="
              fixed inset-0 z-40 md:hidden bg-[#1a1116]/60 backdrop-blur-sm
              pt-20 px-4 pb-6 flex flex-col justify-start
            "
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.nav
              aria-label="Mobile Navigation"
              initial={{ y: -20, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -15, opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="
                w-full max-w-md mx-auto rounded-3xl bg-[#fffafd]
                border border-pink-200 shadow-2xl p-6 overflow-hidden
              "
            >
              <div className="h-1 w-full rounded-full bg-gradient-to-r from-[#ffb7c5] via-[#a2e4f5] to-[#e2d1f9] mb-5" />

              <div className="divide-y divide-pink-950/10">
                {navLinks.map((link, idx) => {
                  const isActive = activeSection === link.id;
                  return (
                    <motion.div
                      key={link.id}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => handleScroll(e, link.id)}
                        className="
                          py-3.5 flex items-center justify-between
                          group active:bg-pink-50/80 rounded-xl px-2
                        "
                      >
                        <div className="flex items-baseline gap-3">
                          <span className="font-mono text-xs text-pink-400">
                            {link.num}
                          </span>
                          <span
                            className={`text-xl font-bold tracking-tight ${
                              isActive ? "text-pink-600" : "text-pink-950"
                            }`}
                          >
                            {link.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {isActive && (
                            <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 font-mono text-[10px] uppercase">
                              Active
                            </span>
                          )}
                          <ArrowUpRight
                            size={18}
                            className="text-pink-950/40 group-hover:text-pink-600"
                          />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-5 pt-4 border-t border-pink-950/10 flex items-center justify-between font-mono text-[10px] tracking-widest text-pink-900/50 uppercase">
                <span>VESTIAPANI // 2026</span>
                <span>STATUS: ONLINE</span>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
