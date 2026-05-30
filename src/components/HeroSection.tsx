"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="aboutme"
      className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col items-center justify-center text-center min-h-[90vh]"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl px-6 relative z-10"
      >
        {/* Badge Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 border border-white/30 backdrop-blur-md shadow-sm mb-8"
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f187a6] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f187a6]"></span>
          </span>
          <span className="text-xs font-bold tracking-wide text-gray-800 uppercase">
            Available for new projects
          </span>
        </motion.div>

        {/* Headline Utama: Diubah menjadi pernyataan visi yang kuat */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-950 tracking-tight mb-6 leading-tight">
          Merajut Ide Menjadi <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f187a6] to-pink-400">
            Realita Digital.
          </span>
        </h1>

        {/* Deskripsi Profile: Perkenalan yang lebih mengalir dan rapi */}
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
          Halo, saya <strong>Pani</strong>. Seorang mahasiswa Teknik Informatika
          di Universitas Pancasila yang berfokus pada pengembangan web modern. 
          Saya adalah salah satu dari Co-Founder MangCoder Organization.
          Saya senang mengeksplorasi batas antara desain interface yang
          interaktif dan logika pemrograman untuk menciptakan pengalaman digital
          yang elegan.
        </p>

        {/* Tombol Native Tailwind dengan Efek Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Tombol 1 */}
          <Link
            href="#projects"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white/50 backdrop-blur-xl hover:bg-gray-950 text-gray-800 hover:text-white border border-white/30 rounded-2xl font-bold transition-all shadow-lg hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 w-full sm:w-auto group"
          >
            Lihat Project Saya{" "}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>

          {/* Tombol 2 */}
          <a
            href="#footer"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-[#f187a6]/10 backdrop-blur-xl hover:bg-[#f187a6] text-[#f187a6] hover:text-white border border-[#f187a6]/20 hover:border-[#f187a6] rounded-2xl font-bold transition-all shadow-lg shadow-[#f187a6]/5 hover:shadow-2xl hover:shadow-[#f187a6]/20 hover:-translate-y-1 active:translate-y-0 w-full sm:w-auto group"
          >
            Kontak saya{" "}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
