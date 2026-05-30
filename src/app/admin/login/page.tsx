import AnimatedBackground from "../../../components/AnimatedBackground";
import LoginFormWrapper from "./LoginFormWrapper";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <main className="relative flex items-center justify-center min-h-screen w-full font-sans overflow-hidden bg-slate-50 selection:bg-[#f187a6] selection:text-white p-6 md:p-10">
      {/* Background animasi global agar senada dengan halaman depan */}
      <AnimatedBackground />

      <Suspense fallback={null}>
        <LoginFormWrapper />
      </Suspense>
    </main>
  );
}
