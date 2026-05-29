"use client";

import { useState, useEffect } from "react";
import { signOut } from "../app/admin/actions";
import { LogOut, LayoutDashboard, Globe, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Mengunci scroll body belakang saat menu mobile terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* TOMBOL BURGER KHUSUS MOBILE (Melayang di kanan atas) */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-5 right-6 z-40 p-2.5 bg-white/30 backdrop-blur-md border border-white/40 rounded-xl shadow-lg text-gray-950 hover:bg-white/50 transition-all active:scale-95"
      >
        <Menu size={24} />
      </button>

      {/* OVERLAY GELAP UNTUK MOBILE */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-950/20 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* SIDEBAR (Desktop Fixed & Mobile Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/40 md:bg-white/10 backdrop-blur-3xl md:backdrop-blur-xl border-r border-white/40 md:border-white/20 min-h-screen flex flex-col shadow-2xl md:shadow-xl shadow-black/5 transform transition-transform duration-500 ease-out md:translate-x-0 md:relative ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Logo & Tombol Close (Mobile) */}
        <div className="p-8 border-b border-white/20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/icon.png"
              alt="Logo"
              width={35}
              height={35}
              className="rounded-full bg-white p-0.5 border border-white/30 shadow-sm"
            />
            <h2 className="text-gray-950 font-extrabold text-xl tracking-wider">
              Vestiapani{" "}
              <span className="text-[#f187a6] text-sm align-top">OS</span>
            </h2>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-700 hover:text-gray-950 p-2 bg-white/40 hover:bg-white/60 rounded-xl border border-white/40 transition-all active:scale-95"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Navigasi */}
        <nav className="flex-1 px-4 py-8 space-y-3">
          <Link
            href="/admin"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-5 py-3.5 bg-gray-950 text-white rounded-2xl font-medium shadow-md transition-all hover:bg-gray-800 active:scale-95"
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>

          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-5 py-3.5 text-gray-700 hover:text-gray-950 hover:bg-white/40 rounded-2xl font-medium transition-all active:scale-95"
          >
            <Globe size={20} /> Lihat Website
          </Link>
        </nav>

        {/* Footer Sidebar (Logout) */}
        <div className="p-6 border-t border-white/20">
          <form action={signOut}>
            <button
              type="submit"
              className="flex items-center justify-center gap-3 w-full px-5 py-3.5 bg-red-500/10 text-red-600 hover:bg-red-500/20 border border-red-500/10 rounded-2xl font-medium transition-all active:scale-95"
            >
              <LogOut size={20} /> Keluar Sistem
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
