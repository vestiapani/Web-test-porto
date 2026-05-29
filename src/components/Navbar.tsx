"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// Tambahkan User, Code2, Send, dan ShieldCheck untuk ikon menu
import { Menu, X, User, Code2, Send, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Data array untuk menu agar lebih rapi saat di-map
  const navItems = [
    {
      title: "Tentang Saya",
      href: "aboutme",
      icon: User,
      desc: "Kenali saya lebih dekat",
    },
    {
      title: "Karya Terbaru",
      href: "projects",
      icon: Code2,
      desc: "Eksplorasi portofolio",
    },
    {
      title: "Kontak Saya",
      href: "contact",
      icon: Send,
      desc: "Mari berkolaborasi bersama",
    },
  ];

  return (
    // GLASS NAV
    <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-lg text-gray-900 shadow-sm border-b border-white/20 selection:bg-[#f187a6] selection:text-white">
      <div className="w-full px-6 md:px-12 lg:px-16 py-4 flex justify-between items-center relative z-10 h-[73px]">
        {/* LOGO SECTION */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition hover:opacity-90 group"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="Vestiapani Logo"
            width={35}
            height={35}
            className="rounded-full bg-white/60 p-0.5 border border-white/20 shadow-sm group-hover:scale-105 transition-transform"
          />
          <span className="font-bold text-xl tracking-wider text-gray-950 group-hover:text-[#f187a6] transition-colors">
            VESTIAPANI
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-10 font-semibold">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={`/#${item.href}`}
              className="hover:text-[#f187a6] transition-colors text-sm text-gray-800 tracking-wide"
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Burger Button (Mobile) */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-950 hover:text-[#f187a6] p-1.5 rounded-lg hover:bg-white/20 transition active:scale-95"
        >
          {isMenuOpen ? (
            <X size={26} strokeWidth={2.5} />
          ) : (
            <Menu size={26} strokeWidth={2.5} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed left-0 right-0 top-[73px] h-[calc(100vh-73px)] z-40 bg-gray-950/20 backdrop-blur-sm md:hidden transition-opacity"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Mobile Menu Drawer (GLASS) - Desain Baru Premium */}
      <div
        className={`fixed top-[73px] right-0 z-40 w-full max-w-[320px] h-[calc(100vh-73px)] bg-white/40 backdrop-blur-3xl border-l border-white/40 p-6 shadow-2xl transition-transform duration-500 ease-out md:hidden flex flex-col justify-between overflow-y-auto ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Mini Header di Menu Mobile */}
          <div className="mb-8 pb-6 border-b border-white/20">
            <span className="text-xs font-black tracking-widest text-[#f187a6] uppercase mb-2 block">
              Menu Navigasi
            </span>
            <h3 className="text-2xl font-extrabold text-gray-950 tracking-tight">
              Eksplorasi Web
            </h3>
          </div>

          {/* Links Navigasi (Glass Cards) */}
          <div className="flex flex-col gap-3">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={`/#${item.href}`}
                onClick={toggleMenu}
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/70 bg-white/30 transition-all duration-300 border border-white/30 shadow-sm group hover:scale-[1.02] active:scale-95"
              >
                <div className="p-3 bg-white/70 rounded-xl text-gray-400 group-hover:text-[#f187a6] group-hover:bg-white shadow-inner transition-colors">
                  <item.icon size={22} strokeWidth={2} />
                </div>
                <div>
                  <div className="text-base font-bold text-gray-900 group-hover:text-[#f187a6] transition-colors">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium mt-0.5">
                    {item.desc}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
