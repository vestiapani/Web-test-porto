"use client";

import { login } from "../actions";
import { Lock, Mail, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function LoginFormWrapper() {
  // Gunakan hook Client untuk mendeteksi error=true secara reaktif
  const searchParams = useSearchParams();
  const showError = searchParams.get("error") === "true";

  return (
    <>
      {/* Notifikasi Push (Toast) Melayang di atas jika Error */}
      {showError && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-red-500/90 text-white px-6 py-3 rounded-full shadow-lg shadow-red-500/20 backdrop-blur-md border border-red-400 animate-in slide-in-from-top-10 fade-in duration-300">
          <AlertCircle size={20} />
          <span className="font-medium text-sm">
            Email atau password salah! Akses ditolak.
          </span>
        </div>
      )}

      {/* Login Card Glassmorphism (Z-Index 10) */}
      <form
        action={login}
        className="relative z-10 bg-white/10 border border-white/20 p-10 md:p-14 rounded-[3rem] backdrop-blur-xl shadow-2xl shadow-black/5 w-full max-w-md flex flex-col items-center animate-in zoom-in-95 fade-in duration-500"
      >
        {/* Blob dekoratif di dalam card untuk efek glass ekstra */}
        <div className="absolute top-[-20%] left-[-20%] w-[100%] h-[100%] bg-white/10 rounded-full blur-[5rem] -z-10 pointer-events-none animation-delay-2000"></div>

        <h1 className="text-4xl font-extrabold text-gray-950 mb-3 tracking-tight">
          Admin <span className="text-[#f187a6]">Portal</span>
        </h1>
        <p className="text-gray-700 mb-10 text-center leading-relaxed max-w-sm">
          Masukkan kredensial khusus untuk mengelola portofolio.
        </p>

        <div className="w-full space-y-5 mb-10 relative z-10">
          <div className="relative group">
            <Mail
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f187a6] transition-colors"
              size={20}
            />
            <input
              name="email"
              type="email"
              placeholder="email@vestiapani.dev"
              required
              className="w-full pl-14 pr-5 py-4 bg-white/60 border border-white/30 rounded-2xl text-gray-950 focus:border-[#f187a6] focus:bg-white/80 focus:ring-4 focus:ring-[#f187a6]/10 transition-all outline-none placeholder:text-gray-400 shadow-inner selection:bg-[#f187a6] selection:text-white"
            />
          </div>
          <div className="relative group">
            <Lock
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f187a6] transition-colors"
              size={20}
            />
            <input
              name="password"
              type="password"
              placeholder="•••••••••"
              required
              className="w-full pl-14 pr-5 py-4 bg-white/60 border border-white/30 rounded-2xl text-gray-950 focus:border-[#f187a6] focus:bg-white/80 focus:ring-4 focus:ring-[#f187a6]/10 transition-all outline-none placeholder:text-gray-400 shadow-inner selection:bg-[#f187a6] selection:text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="relative z-10 w-full bg-gray-950 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-all shadow-lg hover:shadow-black/20 hover:-translate-y-0.5 active:translate-y-0 active:translate-y-0 disabled:bg-gray-400"
        >
          Masuk Aman
        </button>
      </form>
    </>
  );
}
