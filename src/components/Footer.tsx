export default function Footer() {
  return (
    <footer className="bg-white pt-8 pb-16 px-4 text-center">
      <div className="container mx-auto max-w-4xl flex flex-col items-center justify-center text-pink-900/50 text-sm font-medium">
        {/* Ornamen pemisah */}
        <div className="flex gap-2 mb-6 opacity-60">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-300"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-pink-300"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-pink-300"></span>
        </div>

        {/* Teks Utama */}
        <p className="mb-2">
          Didesain dengan presisi dan kesederhanaan oleh Pani.
        </p>
        <p>&copy; {new Date().getFullYear()} Hak Cipta Dilindungi.</p>
        <div className="mt-8 text-[10px] font-mono tracking-widest text-pink-900/30 flex flex-col items-center gap-1 select-none pointer-events-none">
          <span>SYSTEM_HALTED</span>
          <span>パニ // PORTFOLIO</span>
        </div>
      </div>
    </footer>
  );
}
