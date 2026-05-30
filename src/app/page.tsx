import { createClient } from "../lib/supabase-ssr";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import HeroSection from "../components/HeroSection";
import AnimatedBackground from "../components/AnimatedBackground";
import { Project } from "../models/types";
import Footer from "@/components/Footer";
import TechStack from "@/components/TechStack";

export const revalidate = 60;

export default async function Home() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    // 1. Tambahkan bg-slate-50 dan hapus pb-24 dari main agar footer menempel ke bawah
    <main className="relative min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden selection:bg-pink-500 selection:text-white">
      <AnimatedBackground />
      <Navbar />
      <div className="relative z-10 max-w-7xl mx-auto">
        <HeroSection />
      </div>

      <TechStack />

      {/* 2. Tambahkan pb-20 (padding bottom) di sini agar ada jarak napas sebelum Footer */}
      <section
        id="projects"
        className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-20"
      >
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Daftar <span className="text-pink-600">Project</span>
          </h2>
          <p className="text-slate-600 font-medium text-lg max-w-2xl">
            Beberapa eksperimen visual, pengembangan aplikasi, dan eksplorasi
            desain yang telah saya kerjakan.
          </p>
        </div>

        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: Project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description || ""}
                techStack={project.tech_stack || []}
                githubUrl={project.github_url || undefined}
                liveUrl={project.live_url || undefined}
                imageUrl={project.image_url || undefined}
              />
            ))}
          </div>
        ) : (
          <div className="w-full py-20 bg-white/50 border border-white/60 backdrop-blur-xl rounded-[2rem] text-center shadow-sm">
            <p className="text-slate-500 font-medium">
              Belum ada portofolio yang ditambahkan.
            </p>
          </div>
        )}
      </section>

      <section id="footer">
        <Footer />
      </section>
    </main>
  );
}
