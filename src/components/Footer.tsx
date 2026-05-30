"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Github, Instagram, Linkedin, Send } from "lucide-react";

export default function Footer() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = "ivan131335@gmail.com";
    const subject = `Pesan Portofolio dari ${name}`;
    const body = `Halo Pani,\n\n${message}\n\nSalam,\n${name}`;
    window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <footer id="contact" className="relative w-full pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Kolom Kiri: Branding & Info */}
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
              <Image
                src="/icon.png"
                alt="Vestiapani Logo"
                width={40}
                height={40}
                className="rounded-full bg-white p-0.5 border border-white/40 shadow-sm group-hover:scale-105 transition-transform"
              />
              <span className="font-extrabold text-2xl tracking-wider text-slate-900 group-hover:text-[#f187a6] transition-colors">
                VESTIAPANI
              </span>
            </Link>

            <p className="text-slate-600 font-medium leading-relaxed mb-8 max-w-sm">
              Eksplorasi visual dan kode. Selalu terbuka untuk diskusi tentang
              teknologi, pengembangan web, atau peluang kolaborasi baru.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://github.com/vestiapani"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white/40 border border-white/30 rounded-xl text-slate-600 hover:text-gray-950 hover:bg-white/60 transition-all shadow-sm group backdrop-blur-md"
              >
                <Github
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
              </a>
              <a
                href="https://instagram.com/vestiapani"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white/40 border border-white/30 rounded-xl text-slate-600 hover:text-[#f187a6] hover:bg-[#f187a6]/10 hover:border-[#f187a6]/30 transition-all shadow-sm group backdrop-blur-md"
              >
                <Instagram
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
              </a>
              <a
                href="https://linkedin.com/in/ivan-wirahadi13"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white/40 border border-white/30 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 hover:border-blue-200 transition-all shadow-sm group backdrop-blur-md"
              >
                <Linkedin
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
              </a>
              <a
                href="mailto:ivan131335@gmail.com"
                className="p-3 bg-white/40 border border-white/30 rounded-xl text-slate-600 hover:text-rose-500 hover:bg-rose-50/50 hover:border-rose-200 transition-all shadow-sm group backdrop-blur-md"
              >
                <Mail
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
              </a>
            </div>
          </div>

          {/* Kolom Kanan: Form Kirim Pesan dengan Glassmorphism Ekstrem */}
          <div className="bg-white/10 border border-white/20 p-8 rounded-[2rem] shadow-xl shadow-[#f187a6]/5 backdrop-blur-xl relative overflow-hidden group/form">
            <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-[#f187a6]/10 rounded-full blur-[4rem] pointer-events-none group-hover/form:bg-[#f187a6]/20 transition-colors duration-700"></div>

            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 relative z-10">
              <Mail className="text-[#f187a6]" size={24} />
              Kirim Pesan Langsung
            </h3>

            <form
              onSubmit={handleSendEmail}
              className="flex flex-col gap-4 relative z-10"
            >
              <div className="space-y-1.5 group">
                <label className="text-sm font-bold text-slate-700 tracking-wide group-focus-within:text-[#f187a6] transition-colors">
                  Nama Anda
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama..."
                  className="w-full px-5 py-3.5 bg-white/30 border border-white/40 backdrop-blur-md rounded-2xl text-slate-900 focus:border-[#f187a6] focus:bg-white/50 focus:ring-4 focus:ring-[#f187a6]/20 transition-all outline-none placeholder:text-slate-500 font-medium shadow-sm"
                />
              </div>

              <div className="space-y-1.5 group">
                <label className="text-sm font-bold text-slate-700 tracking-wide group-focus-within:text-[#f187a6] transition-colors">
                  Pesan
                </label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan pesan atau tawaran kolaborasi..."
                  rows={3}
                  className="w-full px-5 py-3.5 bg-white/30 border border-white/40 backdrop-blur-md rounded-2xl text-slate-900 focus:border-[#f187a6] focus:bg-white/50 focus:ring-4 focus:ring-[#f187a6]/20 transition-all outline-none placeholder:text-slate-500 font-medium shadow-sm resize-none"
                ></textarea>
              </div>

              {/* Tombol Submit dengan Transparan Pink Glassmorphism */}
              <button
                type="submit"
                className="mt-4 flex items-center justify-center gap-2 w-full px-8 py-3.5 bg-[#f187a6]/10 backdrop-blur-xl hover:bg-[#f187a6] text-[#f187a6] hover:text-white border border-[#f187a6]/20 hover:border-[#f187a6] rounded-2xl font-bold transition-all shadow-lg shadow-[#f187a6]/5 hover:shadow-2xl hover:shadow-[#f187a6]/20 hover:-translate-y-1 active:translate-y-0 group"
              >
                Kirim via Email
                <Send
                  size={18}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-8 border-t border-white/30 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 font-medium text-sm relative z-10">
          <p>© {new Date().getFullYear()} Vestiapani. Hak Cipta Dilindungi.</p>
          <p>
            Dibuat dengan{" "}
            <span className="text-yellow-500 animate-pulse inline-block">
              TypeScript
            </span>{" "}
            dan Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
