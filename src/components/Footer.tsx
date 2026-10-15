"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white pt-8 pb-16 px-4 text-center">
      <div className="container mx-auto max-w-4xl flex flex-col items-center justify-center text-pink-900/50 text-sm font-medium">
        <div className="flex gap-2 mb-6 opacity-60">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-300"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-pink-300"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-pink-300"></span>
        </div>

        <p className="mb-2">{t.footer.designedBy}</p>
        <p>
          &copy; {new Date().getFullYear()} {t.footer.rights}
        </p>

        <div className="mt-8 text-[10px] font-syncopate tracking-[0.3em] text-pink-900/35 flex flex-col items-center gap-1.5 select-none pointer-events-none">
          <span>{t.footer.sub}</span>
          <span className="font-mono">SYSTEM_HALTED // パニ</span>
        </div>
      </div>
    </footer>
  );
}
