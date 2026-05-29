import Image from "next/image";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import Silk from "../components/Silk";
import { supabase } from "../lib/supabase";
import {
  Layers3,
  Rocket,
  Code2,
  Terminal,
  Linkedin,
  Mail,
  Send,
  CheckCircle,
  Instagram,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

export const revalidate = 60;

export default async function Home() {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  const skillCategories = [
    {
      title: "Languages",
      icon: Code2,
      skills: ["JavaScript", "TypeScript", "Java", "HTML", "CSS"],
    },
    {
      title: "Frameworks & Libs",
      icon: Layers3,
      skills: ["Next.js", "React", "Spring Boot", "Node.js", "Tailwind CSS"],
    },
    {
      title: "Tools & Others",
      icon: Terminal,
      skills: ["Git", "Supabase", "VSCode", "UI/UX Design", "MySQL", "Figma"],
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/ivan-wirahadi13",
      name: "Linkedin",
    },
    { icon: FaGithub, href: "https://github.com/vestiapani", name: "Github" },
    { icon: Mail, href: "mailto:ivan131335@gmail.com", name: "Email" },
    {
      icon: Instagram,
      href: "https://instagram.com/vestiapani",
      name: "Instagram",
    },
  ];

  return (
    <main className="relative min-h-screen font-sans overflow-x-hidden selection:bg-white selection:text-gray-950">
      {/* ========================================= */}
      {/* FANCY SHADER BACKGROUND (SILK) */}
      {/* ========================================= */}
      <div className="fixed inset-0 z-10 w-full h-full">
        <Silk
          speed={5}
          scale={1}
          color="#ff2994"
          noiseIntensity={1.5}
          rotation={0}
        />
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
      </div>

      <Navbar />

      {/* ========================================= */}
      {/* HERO SECTION - DENGAN ROUNDED */}
      {/* ========================================= */}
      <section className="relative z-10 px-4 md:px-8 pt-8 first:pt-0">
        <div className="relative flex flex-col items-center justify-center min-h-[90vh] text-center overflow-hidden rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/5 selection:bg-white selection:text-gray-950">
          <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-white/10 rounded-full blur-[10rem] -z-10 animate-blob"></div>
          <div className="absolute bottom-[-20%] right-[-20%] w-[140%] h-[140%] bg-pink-100/10 rounded-full blur-[10rem] -z-10 animate-blob animation-delay-2000"></div>

          <div className="flex flex-col items-center justify-center py-20 px-6 md:px-12 lg:px-24 w-full">
            <h4 className="text-[#b18597] font-semibold tracking-[0.3em] uppercase mb-5 text-sm cursor-default">
              SOFTWARE DEVELOPER & IT ENTHUSIAST
            </h4>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-950 tracking-tight mb-7 leading-tight max-w-4xl mx-auto cursor-default">
              Membangun Pengalaman <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f187a6] to-[#b18597]">
                Digital Elegan & Cepat.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-800 max-w-2xl mx-auto mb-12 leading-relaxed cursor-default">
              Dari ide kompleks menjadi interface yang bersih dan performa yang
              cepat. Fokus pada teknologi web modern, efisiensi, dan UX yang
              mulus.
            </p>
            <div className="flex gap-4 justify-center flex-wrap relative z-10">
              <a
                href="#projects"
                className="bg-gray-950 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-gray-800 transition shadow-sm"
              >
                Daftar Project Saya
              </a>
              <a
                href="#aboutme"
                className="bg-white/60 text-[#b18597] border border-white/20 px-8 py-3.5 rounded-full font-semibold hover:bg-[#ffe9e9] transition backdrop-blur-sm shadow-inner"
              >
                Tentang Saya
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* SKILLS SECTION - DENGAN ROUNDED */}
      {/* ========================================= */}
      <section id="aboutme" className="relative z-10 px-4 md:px-8 pt-8">
        <div className="relative py-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-lg shadow-black/5 overflow-hidden selection:bg-white selection:text-gray-950">
          <div className="absolute top-[-30%] right-[-30%] w-[150%] h-[150%] bg-pink-100/10 rounded-full blur-[10rem] -z-10 animate-blob animation-delay-4000"></div>

          <div className="px-6 md:px-12 lg:px-24 w-full">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-950 cursor-default">
              Inti <span className="text-[#f187a6]">Tech Stack</span> Saya
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {skillCategories.map((cat, i) => (
                <div
                  key={i}
                  className="bg-white/10 border border-white/10 p-8 rounded-2xl shadow-sm hover:shadow-md transition backdrop-blur-md"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3.5 bg-white/40 rounded-xl text-[#f187a6] backdrop-blur-sm border border-white/10 shadow-inner">
                      <cat.icon size={26} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 cursor-default">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-1.5 bg-white/30 border border-white/10 text-gray-700 text-sm font-medium rounded-full backdrop-blur-sm hover:bg-[#fff0f0] hover:text-[#b18597] transition cursor-default shadow-inner"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* PROJECTS SECTION - DENGAN ROUNDED */}
      {/* ========================================= */}
      <section id="projects" className="relative z-10 px-4 md:px-8 pt-8">
        <div className="relative py-24 bg-white/5 border border-white/10 rounded-[2rem] shadow-inner shadow-black/5 overflow-hidden selection:bg-white selection:text-gray-950">
          <div className="absolute bottom-[-30%] left-[-30%] w-[150%] h-[150%] bg-pink-100/10 rounded-full blur-[10rem] -z-10 animate-blob"></div>

          <div className="px-6 md:px-12 lg:px-24 w-full">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-950 cursor-default">
              Daftar <span className="text-[#f187a6]">Project</span> Saya
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {projects?.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  techStack={project.tech_stack || []}
                  imageUrl={project.image_url}
                  githubUrl={project.github_url}
                  liveUrl={project.live_url}
                  
                />
              ))}
              {(!projects || projects.length === 0) && (
                <p className="col-span-full text-center text-gray-700 py-16 bg-white/10 backdrop-blur-sm rounded-xl border border-dashed border-white/20 shadow-inner shadow-black/5 cursor-default">
                  Belum ada project yang ditambahkan. Silakan login ke
                  Dashboard.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* FOOTER - DENGAN ROUNDED */}
      {/* ========================================= */}
      <footer id="contact" className="relative z-10 px-4 md:px-8 pt-8 pb-8">
        <div className="relative bg-gray-950/30 backdrop-blur-sm border border-white/10 rounded-[2rem] shadow-2xl transition overflow-hidden selection:bg-white selection:text-gray-950">
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-pink-100/10 rounded-full blur-[10rem] -z-10 animate-blob"></div>

          <div className="px-6 md:px-12 lg:px-24 py-10 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10 mb-12 border-b border-white/10 pb-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Image
                    src="/icon.png"
                    alt="Vestiapani Logo"
                    width={45}
                    height={45}
                    className="rounded-full bg-white p-0.5 border border-white/20 shadow-inner"
                  />
                  <h3 className="text-3xl font-extrabold tracking-wider text-white">
                    Vestiapani
                  </h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed max-w-md mb-8">
                  Mari buat sesuatu yang luar biasa bersama. Saya selalu terbuka
                  untuk ide kompleks atau kontribusi proyek baru.
                </p>

                <div className="flex gap-4 flex-wrap">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target={link.name !== "Email" ? "_blank" : undefined}
                      rel="noreferrer"
                      className="text-gray-400 hover:text-white hover:scale-110 transition p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md shadow-inner shadow-black/5 hover:bg-[#f187a6] group"
                    >
                      <link.icon size={22} className="group-hover:text-white" />
                      <span className="sr-only">{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-3xl p-10 backdrop-blur-sm shadow-xl shadow-black/10 flex flex-col items-center justify-center text-center">
                <CheckCircle
                  size={48}
                  strokeWidth={1}
                  className="mb-6 text-[#f187a6]"
                />
                <h4 className="text-2xl font-bold text-white mb-4 cursor-default relative">
                  Siap untuk Mulai?
                  <div className="absolute top-[-30%] left-[-30%] w-[150%] h-[150%] bg-pink-100/10 rounded-full blur-[10rem] -z-10 animate-blob animation-delay-4000"></div>
                </h4>
                <p className="text-gray-200 mb-8 max-w-sm cursor-default">
                  Dapatkan ide Anda terwujud dengan sentuhan pengalaman digital
                  elegan & cepat.
                </p>
                <a
                  href="mailto:ivan13135@gmail.com"
                  className="inline-flex items-center gap-3 bg-white text-[#f187a6] px-8 py-3.5 rounded-full font-semibold hover:bg-[#fff0f0] transition shadow-lg group"
                >
                  Hubungi Lewat Email{" "}
                  <Send
                    size={20}
                    className="group-hover:translate-x-1 transition"
                  />
                </a>
              </div>
            </div>

            <p className="text-sm text-gray-500 pt-8 text-center cursor-default">
              &copy; {new Date().getFullYear()} Vestiapani. All rights reserved.{" "}
              <br /> Design Inspired by Glassmorphism. Background Shader from
              React Bits. Icons from Lucide.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
