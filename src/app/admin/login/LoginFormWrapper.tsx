"use client";

import { login } from "../actions";
import { Lock, Mail, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function LoginFormWrapper() {
  const searchParams = useSearchParams();
  const showError = searchParams.get("error") === "true";

  return (
    <>
      {showError && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-rose-500/90 text-white px-6 py-3.5 rounded-2xl shadow-xl shadow-rose-500/20 backdrop-blur-md border border-rose-400 animate-in slide-in-from-top-10 fade-in duration-300">
          <AlertCircle size={20} />
          <span className="font-bold text-sm tracking-wide">
            Kredensial tidak valid. Akses ditolak.
          </span>
        </div>
      )}

      {/* Login Card Glassmorphism */}
      <form
        action={login}
        className="relative z-10 bg-white/20 border border-white/40 p-10 md:p-14 rounded-[3rem] backdrop-blur-2xl shadow-2xl shadow-[#f187a6]/5 w-full max-w-md flex flex-col items-center animate-in zoom-in-95 fade-in duration-500"
      >
        <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-[#f187a6]/15 rounded-full blur-[4rem] -z-10 pointer-events-none"></div>

        <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
          Admin <span className="text-[#f187a6]">Portal</span>
        </h1>
        <p className="text-slate-600 mb-10 text-center font-medium leading-relaxed max-w-sm">
          Masukkan kredensial khusus untuk mengakses manajemen portofolio.
        </p>

        <div className="w-full space-y-5 mb-10 relative z-10">
          <div className="relative group">
            <Mail
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#f187a6] transition-colors"
              size={20}
            />
            <input
              name="email"
              type="email"
              placeholder="email@vestiapani.dev"
              required
              className="w-full pl-14 pr-5 py-4 bg-white/30 border border-white/40 backdrop-blur-md rounded-2xl text-slate-900 focus:border-[#f187a6] focus:bg-white/50 focus:ring-4 focus:ring-[#f187a6]/20 transition-all outline-none placeholder:text-slate-500 font-bold shadow-sm"
            />
          </div>
          <div className="relative group">
            <Lock
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#f187a6] transition-colors"
              size={20}
            />
            <input
              name="password"
              type="password"
              placeholder="•••••••••"
              required
              className="w-full pl-14 pr-5 py-4 bg-white/30 border border-white/40 backdrop-blur-md rounded-2xl text-slate-900 focus:border-[#f187a6] focus:bg-white/50 focus:ring-4 focus:ring-[#f187a6]/20 transition-all outline-none placeholder:text-slate-500 font-bold shadow-sm"
            />
          </div>
        </div>

        {/* Tombol Login bergaya Dark Glass */}
        <button
          type="submit"
          className="relative z-10 w-full flex items-center justify-center gap-2 px-8 py-4 bg-slate-900/80 backdrop-blur-xl hover:bg-slate-800 text-white border border-slate-700/50 rounded-2xl font-bold transition-all shadow-lg hover:shadow-2xl hover:shadow-[#f187a6]/20 hover:-translate-y-1 active:translate-y-0 disabled:bg-slate-400 group"
        >
          Masuk Aman
        </button>
      </form>
    </>
  );
}
