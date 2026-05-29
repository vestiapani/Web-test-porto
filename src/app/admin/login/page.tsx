// src/app/admin/login/page.tsx
import Silk from "../../../components/Silk";
import LoginFormWrapper from "./LoginFormWrapper";

export default function LoginPage() {
  return (
    // selection warna teks glass pink
    <main className="relative flex items-center justify-center min-h-screen w-full font-sans overflow-hidden bg-white selection:bg-[#f187a6] selection:text-white p-6 md:p-10">
      {/* Background Silk Global untuk Login Page */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
        <Silk
          speed={3}
          scale={1.2}
          color="#ff2994"
          noiseIntensity={1}
          rotation={0}
        />
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[3px]"></div>
      </div>

      {/* Panggil Client Wrapper untuk Form & Notifikasi Error */}
      <LoginFormWrapper />
    </main>
  );
}
