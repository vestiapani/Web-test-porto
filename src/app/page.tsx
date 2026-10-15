"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/context/LanguageContext";
import SplashScreen from "@/components/SplashScreen";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";
import ProjectCard, { ProjectItem } from "@/components/ProjectCard";
import projectsData from "@/data/projects.json";
import {
  Github,
  Mail,
  Sparkles,
  Heart,
  Palette,
  Code2,
  MoonStar,
  ArrowUpRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stickyIcons = [
  <Palette key="palette" className="text-pink-300 mb-3 md:mb-4" size={28} />,
  <Heart key="heart" className="text-rose-300 mb-3 md:mb-4" size={28} />,
  <Sparkles key="sparkles" className="text-pink-300 mb-3 md:mb-4" size={28} />,
];

const capColors: ("pink" | "cyan" | "purple")[] = [
  "pink",
  "cyan",
  "purple",
  "pink",
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const mizukiRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { t } = useLanguage();

  useGSAP(
    () => {
      ScrollTrigger.config({ ignoreMobileResize: true });
      const [t1, t2, t3] = textRefs.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * 2.5,
          pin: true,
          anticipatePin: 1,
          scrub: 0.2,
          fastScrollEnd: true,
          preventOverlaps: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.set([t2, t3], { opacity: 0, y: 50 });
      gsap.set(deviceRef.current, { rotation: 15, scale: 0.85, y: 50 });

      tl.to(t1, { opacity: 0, y: -50, duration: 1 })
        .to(
          deviceRef.current,
          { rotation: 0, scale: 1.05, y: 0, duration: 2 },
          "<",
        )
        .to(t2, { opacity: 1, y: 0, duration: 1 }, "<0.5")
        .to(t2, { opacity: 0, y: -50, duration: 1 })
        .to(
          deviceRef.current,
          { rotation: -15, scale: 0.85, y: -50, duration: 2 },
          "<",
        )
        .to(t3, { opacity: 1, y: 0, duration: 1 }, "<0.5");

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
    },
    { scope: containerRef },
  );

  return (
    <main className="min-h-svh bg-[#fffafd] text-pink-950 selection:bg-pink-300 selection:text-pink-950 font-sans">
      <SplashScreen />

      {/* 1. HERO SECTION */}
      <section
        className="
          relative min-h-svh flex flex-col justify-between
          px-5 md:px-14 pt-24 md:pt-28 pb-8 md:pb-10 overflow-hidden z-10
        "
        id="home"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#fbcfe8_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-60 -z-10" />

        <div
          className="hidden lg:block absolute top-28 right-14 text-pink-900/8 text-8xl font-black tracking-widest select-none pointer-events-none -z-10"
          style={{ writingMode: "vertical-rl" }}
        >
          フロントエンド
        </div>

        {/* Top Editorial Metadata Bar */}
        <div className="container mx-auto max-w-6xl flex items-center justify-between gap-2 border-b border-pink-950/10 pb-3 md:pb-4 font-mono text-[10px] md:text-[11px] tracking-[0.2em] text-pink-900/60 uppercase">
          <span className="truncate">{t.hero.eyebrow}</span>
          <span className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            <span className="hidden sm:inline">{t.hero.metaStatus}</span>
            <span className="sm:hidden">AVAILABLE</span>
          </span>
        </div>

        {/* Center Hero Focal Point */}
        <div className="container mx-auto max-w-6xl my-auto py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            <div className="lg:col-span-8 flex flex-col items-start gap-2 md:gap-3">
              <Reveal color="pink">
                <h1 className="text-display-hero font-bold text-pink-950">
                  {t.hero.title1}
                </h1>
              </Reveal>
              <Reveal color="cyan" delay={0.12}>
                <span className="text-display-hero font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-[#f48fb1] block">
                  {t.hero.title2}
                </span>
              </Reveal>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start justify-between border-l-2 border-[#ffb7c5] pl-4 md:pl-6">
              <Reveal color="purple" delay={0.2}>
                <p className="text-sm sm:text-base md:text-lg text-pink-900/80 leading-relaxed mb-6 md:mb-8">
                  {t.hero.desc}
                </p>
              </Reveal>

              <div className="flex flex-wrap items-center gap-3 md:gap-4 w-full sm:w-auto">
                <Magnetic strength={0.3}>
                  <a
                    href="#projects"
                    className="
                      group inline-flex items-center justify-center gap-2.5
                      px-5 md:px-6 py-3 md:py-3.5 rounded-full bg-[#1a1116]
                      text-pink-100 font-syncopate text-[11px] font-bold
                      tracking-[0.2em] uppercase hover:bg-pink-500
                      hover:text-white transition-colors
                    "
                  >
                    <span>{t.hero.btn1}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </Magnetic>

                <Magnetic strength={0.3}>
                  <a
                    href="#contact"
                    className="
                      inline-flex items-center justify-center gap-2
                      px-5 py-3 md:py-3.5 rounded-full bg-white/90
                      border border-pink-200 text-pink-900 font-syncopate
                      text-[11px] font-bold tracking-[0.2em] uppercase
                      hover:border-pink-500 transition-colors
                    "
                  >
                    <span>{t.hero.btn2}</span>
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="container mx-auto max-w-6xl flex items-end justify-between font-mono text-xs text-pink-900/50">
          <div className="hidden md:flex flex-col gap-1 tracking-wider">
            <span>{t.hero.metaRole}</span>
            <span>LOC // INDONESIA (UTC+7)</span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <span className="text-[10px] font-syncopate tracking-[0.3em] uppercase text-pink-800">
              {t.hero.scroll}
            </span>
            <div className="w-[1px] h-8 md:h-10 bg-pink-200 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-pink-500 animate-[bounce_2s_infinite]" />
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE PEMBATAS 1 */}
      <Marquee items={t.marquee.top} direction={-1} baseVelocity={2} />

      {/* 2. SECTION ABOUT ME & JOURNEY */}
      <section
        id="about"
        className="relative py-20 md:py-32 px-5 md:px-14 overflow-hidden z-20"
      >
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero-bg.png"
            alt="Celerates Backdrop"
            fill
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#fffafd] via-pink-100/20 to-[#fffafd]" />
        </div>

        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between border-b border-pink-950/15 pb-3 md:pb-4 mb-8 md:mb-14 font-mono text-[10px] md:text-xs tracking-[0.2em] text-pink-900/60 uppercase">
            <span>{t.about.index}</span>
            <span className="hidden sm:inline">IVAN WIRAHADI PERMANA</span>
          </div>

          <div className="relative rounded-2xl md:rounded-3xl bg-white/75 backdrop-blur-xl border border-pink-100/90 shadow-[0_20px_50px_rgba(255,183,197,0.15)] p-6 sm:p-8 md:p-14 overflow-hidden">
            <h2
              className="hidden lg:block font-syncopate font-bold text-[12rem] text-[#ffb7c5]/15 absolute top-1/2 right-2 -translate-y-1/2 select-none pointer-events-none leading-none"
              style={{ writingMode: "vertical-rl" }}
            >
              PANI
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              {/* Kiri: Avatar Celerates */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative flex items-center justify-center min-h-[220px] md:min-h-[280px] w-full">
                  <div className="w-44 h-44 md:w-64 md:h-64 rounded-full border-2 border-dashed border-[#ffb7c5]/70 animate-float absolute" />

                  <Sparkles
                    size={22}
                    className="text-[#ffb7c5] absolute top-4 left-6 md:left-8 -rotate-12"
                  />
                  <MoonStar
                    size={20}
                    className="text-[#e2d1f9] absolute bottom-6 right-6 md:right-8 rotate-12"
                  />

                  <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 md:border-[6px] border-white shadow-xl z-10">
                    <Image
                      src="/images/avatar.png"
                      alt="Ivan Wirahadi Permana"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="absolute top-4 right-2 md:right-4 z-20 px-3 py-1.5 rounded-full bg-white/90 border border-pink-100 shadow-xs flex items-center gap-1.5 rotate-6">
                    <Heart
                      size={11}
                      className="text-[#f48fb1] fill-[#f48fb1]"
                    />
                    <span className="font-syncopate font-bold text-[9px] md:text-[10px] tracking-wider text-pink-950">
                      FRONTEND
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-2 md:left-4 z-20 px-3 py-1.5 rounded-full bg-white/90 border border-cyan-100 shadow-xs flex items-center gap-1.5 -rotate-6">
                    <Code2 size={13} className="text-sky-500" />
                    <span className="font-syncopate font-bold text-[9px] md:text-[10px] tracking-wider text-pink-950">
                      CREATIVE
                    </span>
                  </div>
                </div>

                {/* Fokus & Minat */}
                <div className="w-full mt-4 pt-5 border-t border-pink-950/10">
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-pink-900/50 block mb-3">
                    // {t.about.interestsTitle}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-pink-950/80">
                    {t.about.interests.map((interest) => (
                      <div key={interest} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" />
                        <span className="truncate">{interest}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Kanan: Narasi & Journey */}
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-200/60 font-syncopate text-[10px] tracking-[0.25em] text-pink-900 mb-3">
                  {t.about.badge}
                </span>

                <div className="mb-4">
                  <Reveal color="pink">
                    <h3 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight text-pink-950 leading-snug">
                      {t.about.headline}
                    </h3>
                  </Reveal>
                </div>

                <Reveal color="cyan" delay={0.1} width="full">
                  <p className="text-sm sm:text-base md:text-lg text-pink-950/75 leading-relaxed mb-7">
                    {t.about.bio}
                  </p>
                </Reveal>

                <h4 className="font-syncopate text-[11px] tracking-[0.25em] uppercase text-pink-900/60 mb-4 flex items-center gap-2">
                  <Sparkles size={14} className="text-[#f48fb1]" />
                  <span>{t.about.journeyTitle}</span>
                </h4>

                <div className="flex flex-col gap-5 border-l-2 border-[#ffb7c5] pl-5">
                  {t.about.journey.map((item, idx) => (
                    <Reveal
                      key={idx}
                      color={item.dot === "cyan" ? "cyan" : "pink"}
                      delay={idx * 0.1}
                      width="full"
                    >
                      <div className="relative">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <span className="font-bold text-pink-950 text-sm md:text-base">
                            {item.role}
                          </span>
                          <span className="font-mono text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 rounded bg-pink-50/80 border border-pink-100 text-pink-900/70">
                            {item.date}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-pink-900/65">
                          {item.place}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION STICKY */}
      <div className="bg-[#1a1116] w-full">
        <div
          ref={containerRef}
          className="relative text-white w-full h-svh overflow-hidden"
          style={{ willChange: "transform" }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(244,114,182,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(244,114,182,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div
            className="hidden lg:block absolute top-1/4 left-12 text-pink-500/10 text-[10rem] font-black tracking-widest select-none pointer-events-none"
            style={{ writingMode: "vertical-rl" }}
          >
            ビジュアル
          </div>

          <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center w-full h-full px-5 md:px-20 z-10 gap-6 md:gap-0">
            <div className="relative w-full h-[180px] md:h-full md:absolute md:inset-0 z-20 pointer-events-none flex items-center justify-center">
              {t.sticky.map((item, idx) => {
                const isRight = idx === 1;
                return (
                  <div
                    key={idx}
                    ref={(el) => {
                      textRefs.current[idx] = el;
                    }}
                    className={`absolute max-w-sm text-center flex flex-col items-center w-full px-2 md:px-0 ${
                      isRight
                        ? "md:right-24 md:left-auto md:text-right md:items-end"
                        : "md:left-24 md:right-auto md:text-left md:items-start"
                    }`}
                  >
                    {stickyIcons[idx]}
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 md:mb-4 tracking-tight text-pink-100">
                      {item.title}
                    </h2>
                    <p className="text-pink-200/75 text-sm md:text-lg leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div
              ref={deviceRef}
              style={{ willChange: "transform", backfaceVisibility: "hidden" }}
              className="relative z-10 w-[210px] h-[290px] sm:w-[240px] sm:h-[340px] md:w-[320px] md:h-[460px] flex items-center justify-center"
            >
              <div
                ref={mizukiRef}
                style={{ willChange: "transform" }}
                className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(244,114,182,0.3)]"
              >
                <Image
                  src="/images/Mizuki.png"
                  alt="Akiyama Mizuki"
                  fill
                  sizes="(max-width: 768px) 240px, 320px"
                  className="object-cover object-top"
                  onLoad={() => ScrollTrigger.refresh()}
                />
                <div className="anime-particle absolute top-6 left-6 w-16 h-16 bg-pink-400/50 rounded-full blur-lg md:blur-xl" />
                <div className="anime-particle absolute bottom-10 right-6 w-20 h-20 bg-rose-300/50 rounded-full blur-lg md:blur-xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1116]/90 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SECTION: CAPABILITIES */}
      <section
        className="py-20 md:py-36 px-5 md:px-14 bg-[#fffafd] relative z-20 overflow-hidden"
        id="capabilities"
      >
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex items-center justify-between border-b border-pink-950/15 pb-3 md:pb-4 mb-8 md:mb-14 font-mono text-[10px] md:text-xs tracking-[0.2em] text-pink-900/60 uppercase">
            <span>{t.capabilities.index}</span>
            <span>{t.capabilities.label}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <p className="font-syncopate text-xs tracking-[0.35em] uppercase text-[#f48fb1] font-bold mb-3">
                {t.capabilities.label}
              </p>
              <div className="mb-5">
                <Reveal color="pink">
                  <h2 className="text-display-section font-bold text-pink-950">
                    {t.capabilities.headline}
                  </h2>
                </Reveal>
              </div>
              <Reveal color="cyan" delay={0.1} width="full">
                <p className="text-pink-900/75 text-sm md:text-lg leading-relaxed border-l-2 border-[#ffb7c5] pl-4 md:pl-5">
                  {t.capabilities.quote}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7 divide-y divide-pink-950/10 border-t border-b border-pink-950/10">
              {t.capabilities.list.map((cap, idx) => {
                const barColor = capColors[idx % capColors.length];
                return (
                  <div key={cap.num} className="py-6 md:py-8 group">
                    <div className="flex items-baseline justify-between gap-4 mb-2.5">
                      <Reveal color={barColor}>
                        <h3 className="text-xl md:text-3xl font-bold text-pink-950 group-hover:text-pink-600 transition-colors">
                          {cap.title}
                        </h3>
                      </Reveal>
                      <span className="font-syncopate text-xs md:text-sm font-bold text-pink-400 shrink-0">
                        /{cap.num}
                      </span>
                    </div>

                    <Reveal color={barColor} delay={0.08} width="full">
                      <p className="text-pink-950/75 text-sm md:text-base leading-relaxed mb-3.5">
                        {cap.desc}
                      </p>
                    </Reveal>

                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] md:text-xs">
                      <span className="text-pink-600 font-medium">
                        {cap.tools}
                      </span>
                      <span className="text-pink-900/45 uppercase tracking-wider">
                        [{cap.appliedIn}]
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE PEMBATAS 2 */}
      <Marquee items={t.marquee.bottom} direction={1} baseVelocity={2} />

      {/* 5. SECTION: SELECTED WORKS */}
      <section
        className="py-20 md:py-36 px-5 md:px-14 bg-[#fffafd] relative z-20 overflow-hidden"
        id="projects"
      >
        <div
          className="hidden lg:block absolute top-1/4 left-0 -translate-x-1/4 text-pink-900/5 text-[12rem] font-black tracking-widest select-none pointer-events-none -z-10"
          style={{ writingMode: "vertical-rl" }}
        >
          プロジェクト
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex items-center justify-between border-b border-pink-950/15 pb-3 md:pb-4 mb-8 md:mb-10 font-mono text-[10px] md:text-xs tracking-[0.2em] text-pink-900/60 uppercase">
            <span>{t.projects.index}</span>
            <span>INDEX // 01 — 03</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-3">
            <Reveal color="pink">
              <h2 className="text-display-section font-bold text-pink-950">
                {t.projects.title}
              </h2>
            </Reveal>
            <p className="font-mono text-[11px] md:text-xs tracking-[0.2em] uppercase text-pink-900/55">
              {t.projects.subtitle}
            </p>
          </div>

          <ProjectCard projects={projectsData as ProjectItem[]} />
        </div>
      </section>

      {/* 6. SECTION: CONTACT */}
      <section
        className="py-24 md:py-32 px-5 md:px-14 bg-white border-t border-pink-100 relative z-20 overflow-hidden"
        id="contact"
      >
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex items-center justify-between border-b border-pink-950/15 pb-3 md:pb-4 mb-10 md:mb-16 font-mono text-[10px] md:text-xs tracking-[0.2em] text-pink-900/60 uppercase">
            <span>{t.contact.index}</span>
            <span>EOF // 2026</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
            <div className="lg:col-span-8">
              <div className="mb-4 md:mb-6">
                <Reveal color="pink">
                  <h2 className="text-display-hero font-bold text-pink-950">
                    {t.contact.title}
                  </h2>
                </Reveal>
              </div>
              <Reveal color="cyan" delay={0.1}>
                <p className="text-pink-900/75 text-base sm:text-lg md:text-2xl max-w-xl leading-relaxed">
                  {t.contact.desc}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 lg:items-end">
              <Magnetic strength={0.3}>
                <a
                  href="mailto:ivan131335@gmail.com"
                  className="
                    w-full sm:w-auto inline-flex items-center justify-center
                    gap-3 px-7 py-4 md:px-8 md:py-5 bg-pink-500 text-white
                    rounded-full font-syncopate text-xs font-bold
                    tracking-[0.2em] uppercase shadow-lg shadow-pink-500/25
                    hover:bg-pink-600 transition-colors
                  "
                >
                  <Mail size={18} />
                  <span>{t.contact.btn}</span>
                  <ArrowUpRight size={16} />
                </a>
              </Magnetic>

              <Magnetic strength={0.3}>
                <a
                  href="https://github.com/vestiapani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-full sm:w-auto inline-flex items-center justify-center
                    gap-3 px-7 py-4 md:px-8 bg-pink-50 border border-pink-200
                    rounded-full text-pink-950 font-syncopate text-xs
                    font-bold tracking-[0.2em] uppercase hover:bg-pink-100
                    transition-colors
                  "
                >
                  <Github size={18} />
                  <span>{t.contact.githubBtn}</span>
                  <ArrowUpRight size={16} />
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-20">
        <Footer />
      </div>
    </main>
  );
}