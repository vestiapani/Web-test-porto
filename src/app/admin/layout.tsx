import AdminSidebar from "../../components/AdminSidebar";
import Silk from "../../components/Silk";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen font-sans selection:bg-[#f187a6] selection:text-white relative overflow-hidden">
      {/* Background Silk Global untuk Admin Area */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
        <Silk
          speed={2} // Diperlambat sedikit agar admin bisa fokus kerja
          scale={1}
          color="#ff2994"
          noiseIntensity={1}
          rotation={0}
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[4px]"></div>
      </div>

      <AdminSidebar />

      <main className="flex-1 overflow-y-auto relative z-10 h-screen">
        {/* Header Mobile (Glass) */}
        <header className="bg-white/20 backdrop-blur-xl border-b border-white/20 p-6 md:hidden sticky top-0 z-30">
          <h1 className="text-xl font-extrabold text-gray-950">Admin Panel</h1>
        </header>

        {/* Padding konten diperbesar */}
        <div className="p-6 md:p-10 lg:p-12">{children}</div>
      </main>
    </div>
  );
}
