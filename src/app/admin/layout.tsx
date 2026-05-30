import AdminSidebar from "../../components/AdminSidebar";
import AnimatedBackground from "../../components/AnimatedBackground";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen font-sans selection:bg-[#f187a6] selection:text-white relative overflow-hidden bg-slate-50">
      {/* Background animasi global agar senada dengan halaman depan */}
      <AnimatedBackground />

      <AdminSidebar />

      <main className="flex-1 overflow-y-auto relative z-10 h-screen">
        {/* Header Mobile (Glass) */}
        <header className="bg-white/20 backdrop-blur-xl border-b border-white/30 p-6 md:hidden sticky top-0 z-30 shadow-sm">
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Admin Panel
          </h1>
        </header>

        {/* Padding konten diperbesar */}
        <div className="p-6 md:p-10 lg:p-12">{children}</div>
      </main>
    </div>
  );
}
