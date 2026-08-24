"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/context/LanguageContext";
import SplashScreen from "@/components/SplashScreen";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import projectsData from "@/data/projects.json";
import { Globe, Github, Mail, Sparkles, Heart, Palette } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const mizukiRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  const { t, lang, toggleLang } = useLanguage();

  useEffect(() => {
    const setStableVh = () => {
      document.documentElement.style.setProperty(
        "--vh-fixed",
        `${window.innerHeight}px`,
      );
    };
    setStableVh();
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setStableVh, 200);
    };
    window.addEventListener("orientationchange", setStableVh);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("orientationchange", setStableVh);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          pinType: "transform",
          anticipatePin: 1,
          scrub: 0.5,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      });

      gsap.set([text2Ref.current, text3Ref.current], { opacity: 0, y: 50 });
      gsap.set(deviceRef.current, { rotation: 15, scale: 0.85, y: 50 });

      tl.to(text1Ref.current, { opacity: 0, y: -50, duration: 1 })
        .to(
          deviceRef.current,
          { rotation: 0, scale: 1.05, y: 0, duration: 2 },
          "<",
        )
        .to(text2Ref.current, { opacity: 1, y: 0, duration: 1 }, "<0.5")
        .to(text2Ref.current, { opacity: 0, y: -50, duration: 1 })
        .to(
          deviceRef.current,
          { rotation: -15, scale: 0.85, y: -50, duration: 2 },
          "<",
        )
        .to(text3Ref.current, { opacity: 1, y: 0, duration: 1 }, "<0.5");

      gsap.to(mizukiRef.current, {
        y: 15,
        rotation: 1,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".anime-particle", {
        scale: 1.4,
        opacity: 0.9,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
        ease: "sine.inOut",
      });

      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    },
    { scope: containerRef },
  );

  return (
    <main
      style={{ minHeight: "var(--vh-fixed, 100dvh)" }}
      className="bg-[#fffafd] text-pink-950 selection:bg-pink-300 selection:text-pink-950 font-sans"
    >
      <SplashScreen />

      {/* TOMBOL GANTI BAHASA */}
      <button
        onClick={toggleLang}
        className="fixed top-20 right-4 md:top-8 md:right-12 z-40 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-pink-200/50 text-pink-800 font-bold text-xs tracking-widest shadow-lg shadow-pink-500/10 hover:bg-pink-100 transition-all active:scale-95 flex items-center gap-2"
      >
        <Globe size={14} />
        {lang === "id" ? "ID" : "EN"}
      </button>

      {/* 1. HERO SECTION */}
      <section
        style={{ minHeight: "var(--vh-fixed, 100dvh)" }}
        className="relative flex flex-col items-center justify-center text-center px-4 pt-10 overflow-hidden z-10"
        id="home"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#fbcfe8_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70 -z-10"></div>
        <div className="absolute top-32 left-10 md:left-24 text-pink-300/60 animate-float pointer-events-none -z-10">
          <Sparkles size={36} />
        </div>
        <div className="absolute bottom-40 right-10 md:right-24 text-pink-300/60 text-2xl font-bold animate-float-delayed pointer-events-none -z-10">
          + + +
        </div>
        <div className="hidden md:block absolute top-1/4 right-32 text-pink-200/50 animate-float pointer-events-none -z-10">
          <div className="w-16 h-16 border border-pink-200/50 rounded-full"></div>
        </div>
        <div className="hidden md:flex absolute bottom-12 left-12 flex-col gap-1 text-xs font-mono text-pink-900/40 tracking-wider pointer-events-none -z-10">
          <span>SYS_STATUS: ONLINE</span>
          <span>LOC: ID</span>
        </div>
        <div
          className="absolute top-24 right-8 md:right-16 text-pink-900/10 text-6xl md:text-7xl font-black tracking-widest select-none pointer-events-none -z-10"
          style={{ writingMode: "vertical-rl" }}
        >
          フロントエンド
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-pink-950">
            {t.hero.title1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400">
              {t.hero.title2}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-pink-900/75 max-w-2xl font-medium mb-16 leading-relaxed">
            {t.hero.desc}
          </p>

          <div className="flex items-center gap-8 mb-16">
            <a
              href="#projects"
              className="group flex items-center gap-2 text-pink-800 font-medium tracking-wide transition-colors hover:text-pink-500 focus-visible:ring-2 focus-visible:ring-pink-400 rounded-lg p-1 outline-none"
            >
              <span>{t.hero.btn1}</span>
              <span className="block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <span className="w-1.5 h-1.5 rounded-full bg-pink-300"></span>
            <a
              href="#contact"
              className="group flex items-center gap-2 text-pink-800 font-medium tracking-wide transition-colors hover:text-pink-500 focus-visible:ring-2 focus-visible:ring-pink-400 rounded-lg p-1 outline-none"
            >
              <span>{t.hero.btn2}</span>
              <span className="block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>

          <div className="absolute -bottom-24 flex flex-col items-center gap-3 opacity-60">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-pink-800">
              {t.hero.scroll}
            </span>
            <div className="w-[1px] h-12 bg-pink-200 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-pink-500 animate-[bounce_2s_infinite]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION STICKY (GSAP) */}
      <div className="bg-[#1a1116] w-full">
        <div
          ref={containerRef}
          style={{ willChange: "transform", height: "var(--vh-fixed, 100dvh)" }}
          className="relative text-white w-full overflow-hidden"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(244,114,182,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(244,114,182,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
          <div
            className="absolute top-1/4 left-4 md:left-12 text-pink-500/10 text-8xl md:text-[10rem] font-black tracking-widest select-none pointer-events-none writing-vertical-rl"
            style={{ writingMode: "vertical-rl" }}
          >
            ビジュアル
          </div>
          <div className="absolute top-20 right-10 md:right-24 text-pink-400/20 font-mono text-sm tracking-widest pointer-events-none animate-float">
            [ GSAP_ACTIVE ]
          </div>
          <div className="absolute bottom-20 left-10 md:left-32 text-pink-500/20 text-xl font-bold animate-float-delayed pointer-events-none">
            + + +
          </div>
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#1a1116] to-transparent pointer-events-none z-0"></div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#1a1116] to-transparent pointer-events-none z-0"></div>

          <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center w-full h-full px-4 md:px-20 z-10">
            <div className="relative w-full h-[240px] md:h-full md:absolute md:inset-0 z-20 pointer-events-none flex items-center justify-center">
              <div
                ref={text1Ref}
                className="absolute md:left-24 max-w-sm text-center md:text-left flex flex-col items-center md:items-start w-full px-4 md:px-0"
              >
                <Palette className="text-pink-300 mb-4" size={32} />
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-pink-100">
                  {t.sticky.title1}
                </h2>
                <p className="text-pink-200/70 text-base md:text-lg">
                  {t.sticky.desc1}
                </p>
              </div>

              <div
                ref={text2Ref}
                className="absolute md:right-24 md:left-auto max-w-sm text-center md:text-right flex flex-col items-center md:items-end w-full px-4 md:px-0"
              >
                <Heart className="text-rose-300 mb-4" size={32} />
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-pink-100">
                  {t.sticky.title2}
                </h2>
                <p className="text-pink-200/70 text-base md:text-lg">
                  {t.sticky.desc2}
                </p>
              </div>

              <div
                ref={text3Ref}
                className="absolute md:left-24 md:right-auto max-w-sm text-center md:text-left flex flex-col items-center md:items-start w-full px-4 md:px-0"
              >
                <Sparkles className="text-pink-300 mb-4" size={32} />
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-pink-100">
                  {t.sticky.title3}
                </h2>
                <p className="text-pink-200/70 text-base md:text-lg">
                  {t.sticky.desc3}
                </p>
              </div>
            </div>

            <div
              ref={deviceRef}
              style={{ willChange: "transform", backfaceVisibility: "hidden" }}
              className="relative z-10 w-[240px] h-[340px] md:w-[320px] md:h-[460px] flex items-center justify-center mt-6 md:mt-0"
            >
              <div
                ref={mizukiRef}
                style={{ willChange: "transform" }}
                className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(244,114,182,0.3)]"
              >
                <img
                  src="/images/Mizuki.png"
                  alt="Akiyama Mizuki"
                  className="w-full h-full object-cover object-top"
                />
                <div className="anime-particle absolute top-6 left-6 w-16 h-16 bg-pink-400/50 rounded-full blur-lg md:blur-xl"></div>
                <div className="anime-particle absolute bottom-10 right-6 w-20 h-20 bg-rose-300/50 rounded-full blur-lg md:blur-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1116]/90 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SECTION: SKILLS */}
      <section
        className="py-32 px-4 bg-[#fffafd] relative z-20 overflow-hidden"
        id="skills"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#fbcfe8_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40 -z-10"></div>
        <div className="absolute top-20 right-10 md:right-32 text-pink-300/40 font-mono text-sm tracking-widest -rotate-90 pointer-events-none -z-10">
          SYS.SKILLS_
        </div>
        <div className="absolute bottom-10 left-10 md:left-24 text-pink-200/50 animate-float pointer-events-none -z-10">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-pink-200/50"></div>
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl font-semibold text-pink-950 mb-12 tracking-tight">
            {t.skills.title}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Next.js & React",
              "TypeScript & JavaScript",
              "Tailwind CSS",
              "UI/UX Design & Figma",
              "Node.js & Supabase",
              "REST APIs & MySQL",
              "Git & GitHub",
            ].map((skill) => (
              <div
                key={skill}
                className="px-6 py-3 rounded-full bg-white border border-pink-200 text-pink-800 font-medium shadow-sm transition-all duration-300 hover:shadow-md hover:border-pink-400 cursor-default"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTION: PROJECTS */}
      <section
        className="py-24 px-4 bg-[#fffafd] relative z-20 overflow-hidden"
        id="projects"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#fbcfe8_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40 -z-10"></div>
        <div
          className="absolute top-1/3 left-0 -translate-x-1/4 text-pink-900/5 text-8xl md:text-[12rem] font-black tracking-widest select-none pointer-events-none -z-10"
          style={{ writingMode: "vertical-rl" }}
        >
          プロジェクト
        </div>
        <div className="hidden md:block absolute top-40 right-20 text-pink-300/50 animate-float-delayed pointer-events-none -z-10">
          <Sparkles size={28} />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-4xl font-semibold text-pink-950 mb-12 text-center tracking-tight">
            {t.projects.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData.map((project) => (
              <ProjectCard key={project.id} project={project as any} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. SECTION: CONTACT */}
      <section
        className="py-32 px-4 bg-white border-t border-pink-100 relative z-20 overflow-hidden"
        id="contact"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#fffafd] to-transparent opacity-80 -z-10"></div>
        <div className="absolute bottom-20 left-10 md:left-24 text-pink-200/60 font-bold text-xl animate-float pointer-events-none -z-10">
          + + +
        </div>
        <div className="absolute top-20 right-10 md:right-24 text-pink-900/20 font-mono text-xs tracking-widest pointer-events-none -z-10">
          EOF // 2026
        </div>

        <div className="container mx-auto max-w-2xl text-center relative z-10">
          <h2 className="text-5xl font-bold text-pink-950 mb-6 tracking-tighter">
            {t.contact.title}
          </h2>
          <p className="text-pink-500/80 mb-10 text-xl font-medium">
            {t.contact.desc}
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="mailto:ivan131335@gmail.com"
              className="flex items-center gap-2 px-8 py-4 bg-pink-500 text-white rounded-full font-medium shadow-lg shadow-pink-500/30 transition-all hover:bg-pink-600 hover:scale-105 active:scale-95 focus-visible:ring-4 focus-visible:ring-pink-300 focus-visible:outline-none"
            >
              <Mail size={20} /> {t.contact.btn}
            </a>
            <a
              href="https://github.com/vestiapani"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-14 h-14 bg-pink-50 border border-pink-200 rounded-full text-pink-600 shadow-sm transition-all hover:bg-pink-100 hover:scale-105 active:scale-95 focus-visible:ring-4 focus-visible:ring-pink-300 focus-visible:outline-none"
            >
              <Github size={24} />
            </a>
          </div>
        </div>
      </section>

      <div className="relative z-20">
        <Footer />
      </div>
    </main>
  );
}
