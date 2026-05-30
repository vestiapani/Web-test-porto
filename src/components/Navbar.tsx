"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, Code2, Send } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Mencegah scroll saat menu mobile terbuka (opsional untuk desain ini, tapi bagus untuk UX)
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
    // GLASS NAV UTAMA
    <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-lg text-gray-900 shadow-sm border-b border-white/20 selection:bg-[#f187a6] selection:text-white">
      <div className="w-full px-6 md:px-12 lg:px-16 flex justify-between items-center relative z-20 h-[73px]">
        {/* LOGO SECTION */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition hover:opacity-90 group"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src="/icon.png"
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

      {/* --- Overlay Background Samar (opsional agar fokus ke menu) --- */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 top-[73px] bg-gray-900/10 backdrop-blur-sm z-10 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* --- DESAIN MOBILE MENU (Dropdown Simpel & Elegan) --- */}
      <div
        className={`absolute top-full left-0 w-full bg-white/60 backdrop-blur-xl border-b border-white/40 shadow-xl transition-all duration-300 ease-in-out md:hidden z-20 overflow-hidden origin-top ${
          isMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-2">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={`/#${item.href}`}
              onClick={toggleMenu}
              className="flex items-center gap-4 py-4 border-b border-white/30 last:border-0 group"
            >
              {/* Ikon Box Minimalis */}
              <div className="p-2.5 bg-white/40 rounded-xl text-gray-500 group-hover:text-[#f187a6] group-hover:bg-white/70 shadow-sm transition-all duration-300">
                <item.icon size={20} strokeWidth={2.5} />
              </div>

              {/* Teks Navigasi */}
              <div className="flex flex-col">
                <span className="text-base font-bold text-gray-900 group-hover:text-[#f187a6] transition-colors">
                  {item.title}
                </span>
                <span className="text-xs text-gray-500 font-medium mt-0.5">
                  {item.desc}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
