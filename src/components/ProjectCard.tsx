"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
} from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, BookOpen, X, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";

export interface ProjectItem {
  id: string;
  number: string;
  year: string;
  category: string;
  title: string;
  role: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  caseStudy: {
    challenge: { id: string; en: string };
    approach: { id: string; en: string };
    outcome: { id: string; en: string };
  };
  techStack: string[];
  imageUrl: string;
  link: string;
  accent: "pink" | "cyan" | "purple";
}

const accentMap = {
  pink: {
    surface: "from-[#ffb7c5]/30 via-white to-white",
    border: "border-[#ffb7c5]/80",
    tag: "bg-[#ffb7c5]/20 text-pink-900 border-[#ffb7c5]/50",
    shadow: "shadow-[0_20px_50px_rgba(255,183,197,0.22)]",
  },
  cyan: {
    surface: "from-[#a2e4f5]/30 via-white to-white",
    border: "border-[#a2e4f5]/80",
    tag: "bg-[#a2e4f5]/25 text-sky-950 border-[#a2e4f5]/60",
    shadow: "shadow-[0_20px_50px_rgba(162,228,245,0.22)]",
  },
  purple: {
    surface: "from-[#e2d1f9]/35 via-white to-white",
    border: "border-[#e2d1f9]/80",
    tag: "bg-[#e2d1f9]/30 text-purple-950 border-[#e2d1f9]/60",
    shadow: "shadow-[0_20px_50px_rgba(226,209,249,0.25)]",
  },
};

export default function ProjectCard({ projects }: { projects: ProjectItem[] }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const { lang, t } = useLanguage();

  const pullY = useMotionValue(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({
    active: false,
    fromHeader: false,
    startY: 0,
    startTime: 0,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedIdx !== null) {
      pullY.set(0);
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("overflow");
    }
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [selectedIdx, pullY]);

  const activeCase = selectedIdx !== null ? projects[selectedIdx] : null;

  const handleNextProject = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx + 1) % projects.length);
  };

  const startPull = (clientY: number, fromHeader = false) => {
    const atTop = !scrollRef.current || scrollRef.current.scrollTop <= 0;
    dragState.current = {
      active: fromHeader || atTop,
      fromHeader,
      startY: clientY,
      startTime: Date.now(),
    };
  };

  const movePull = (
    clientY: number,
    touchEvent?: React.TouchEvent<HTMLDivElement>,
  ) => {
    const scrollEl = scrollRef.current;
    const atTop = !scrollEl || scrollEl.scrollTop <= 0;

    if (!dragState.current.active && atTop && !dragState.current.fromHeader) {
      dragState.current = {
        active: true,
        fromHeader: false,
        startY: clientY,
        startTime: Date.now(),
      };
    }

    if (!dragState.current.active) return;

    if (!dragState.current.fromHeader && !atTop) {
      dragState.current.active = false;
      pullY.set(0);
      return;
    }

    const deltaY = clientY - dragState.current.startY;

    if (deltaY > 0) {
      if (touchEvent?.cancelable) {
        touchEvent.preventDefault();
      }
      pullY.set(deltaY * 0.85);
    } else {
      pullY.set(0);
    }
  };

  const endPull = () => {
    if (!dragState.current.active) return;
    dragState.current.active = false;

    const currentPull = pullY.get();
    const elapsed = Math.max(1, Date.now() - dragState.current.startTime);
    const velocity = currentPull / elapsed;

    if (currentPull > 80 || (currentPull > 30 && velocity > 0.45)) {
      setSelectedIdx(null);
    } else {
      animate(pullY, 0, {
        type: "spring",
        stiffness: 400,
        damping: 35,
      });
    }
  };

  return (
    <>
      {/* DAFTAR PROYEK ASIMETRIS */}
      <div className="flex flex-col gap-16 md:gap-28">
        {projects.map((project, idx) => {
          const isEven = idx % 2 === 1;
          const style = accentMap[project.accent] || accentMap.pink;

          return (
            <article
              key={project.id}
              className="
                grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12
                items-center border-t border-pink-950/10 pt-8 md:pt-12
              "
            >
              {/* KOLOM VISUAL */}
              <div
                className={`lg:col-span-7 ${
                  isEven ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <Reveal color={project.accent} width="full">
                  <div
                    onClick={() => setSelectedIdx(idx)}
                    className={`
                      group relative aspect-[16/10] w-full rounded-2xl md:rounded-3xl
                      overflow-hidden border ${style.border} bg-gradient-to-br
                      ${style.surface} ${style.shadow} p-2.5 md:p-5 cursor-pointer
                    `}
                  >
                    <div className="flex items-center justify-between px-2 pb-2 font-mono text-[10px] md:text-[11px] tracking-widest text-pink-950/60">
                      <span>
                        [{project.number}] // {project.category}
                      </span>
                      <span>{project.year}</span>
                    </div>

                    <div className="relative w-full h-[calc(100%-24px)] rounded-xl md:rounded-2xl overflow-hidden bg-pink-950/5">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="hidden md:flex absolute inset-0 bg-pink-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
                        <span className="px-5 py-2.5 rounded-full bg-white/95 text-pink-950 font-syncopate text-xs font-bold tracking-widest uppercase shadow-lg">
                          {t.projects.caseStudyBtn}
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* KOLOM TEKS & METADATA */}
              <div
                className={`lg:col-span-5 flex flex-col ${
                  isEven ? "lg:order-1 lg:pr-4" : "lg:order-2 lg:pl-4"
                }`}
              >
                <div className="flex items-baseline justify-between mb-2 md:mb-4">
                  <span className="font-syncopate text-3xl md:text-6xl font-bold text-pink-950/15 leading-none select-none">
                    {project.number}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-pink-600 font-semibold">
                    {project.year} — {project.category}
                  </span>
                </div>

                <Reveal color={project.accent} delay={0.05}>
                  <h3 className="text-2xl md:text-5xl font-bold text-pink-950 tracking-tight mb-2">
                    {project.title}
                  </h3>
                </Reveal>

                <p className="font-mono text-[11px] tracking-wider uppercase text-pink-900/55 mb-3 md:mb-5">
                  {t.projects.labels.role}: {project.role[lang]}
                </p>

                <Reveal color={project.accent} delay={0.1} width="full">
                  <p className="text-pink-950/75 text-sm md:text-lg leading-relaxed mb-5 md:mb-6">
                    {project.description[lang]}
                  </p>
                </Reveal>

                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-6 md:mb-8">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className={`
                        px-2.5 py-1 rounded-md border font-mono
                        text-[10px] md:text-[11px] tracking-wider uppercase
                        ${style.tag}
                      `}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3">
                  <Magnetic strength={0.25}>
                    <button
                      type="button"
                      onClick={() => setSelectedIdx(idx)}
                      className="
                        w-full sm:w-auto inline-flex items-center justify-center
                        gap-2 px-4 md:px-6 py-3 md:py-3.5 rounded-full
                        bg-[#1a1116] text-pink-100 font-syncopate
                        text-[10px] md:text-[11px] font-bold tracking-[0.15em]
                        uppercase hover:bg-pink-600 hover:text-white
                        transition-colors cursor-pointer
                      "
                    >
                      <BookOpen size={14} />
                      <span>{t.projects.caseStudyBtn}</span>
                    </button>
                  </Magnetic>

                  <Magnetic strength={0.25}>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        w-full sm:w-auto inline-flex items-center justify-center
                        gap-2 px-4 md:px-6 py-3 md:py-3.5 rounded-full
                        bg-white border border-pink-200 text-pink-950
                        font-syncopate text-[10px] md:text-[11px] font-bold
                        tracking-[0.15em] uppercase hover:border-pink-500
                        hover:text-pink-600 transition-colors
                      "
                    >
                      <span>{t.projects.visitBtn}</span>
                      <ArrowUpRight size={15} />
                    </a>
                  </Magnetic>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* PORTAL MODAL / BOTTOM SHEET KE DOCUMENT.BODY */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeCase && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="
                  fixed inset-0 z-[999] bg-[#1a1116]/75 backdrop-blur-sm
                  flex items-end md:items-center justify-center md:p-6
                "
                onClick={() => setSelectedIdx(null)}
              >
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-4xl flex justify-center"
                >
                  <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="case-study-title"
                    style={{ y: pullY }}
                    className="
                      relative w-full max-h-[88dvh] md:max-h-[90vh]
                      flex flex-col rounded-t-3xl md:rounded-3xl
                      bg-[#fffafd] text-pink-950 border border-pink-200
                      shadow-2xl overflow-hidden
                    "
                  >
                    {/* 1. STICKY HEADER BAR */}
                    <div
                      onTouchStart={(e) =>
                        startPull(e.touches[0].clientY, true)
                      }
                      onTouchMove={(e) => movePull(e.touches[0].clientY, e)}
                      onTouchEnd={endPull}
                      onMouseDown={(e) => startPull(e.clientY, true)}
                      onMouseMove={(e) => {
                        if (e.buttons === 1) movePull(e.clientY);
                      }}
                      onMouseUp={endPull}
                      className="
                        sticky top-0 z-30 bg-[#fffafd]/95 backdrop-blur-md
                        border-b border-pink-950/10 px-5 pt-3 pb-3.5
                        md:px-10 md:py-5 shrink-0 touch-none select-none
                        cursor-grab active:cursor-grabbing md:cursor-default
                      "
                    >
                      <div className="w-12 h-1.5 rounded-full bg-pink-950/25 mx-auto mb-3 md:hidden" />

                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-pink-600 truncate">
                          [{activeCase.number}] // {activeCase.category}
                        </span>

                        <button
                          type="button"
                          onClick={() => setSelectedIdx(null)}
                          className="
                            hidden md:inline-flex items-center gap-1.5
                            px-3.5 py-1.5 rounded-full bg-pink-100 text-pink-950
                            font-mono text-xs font-bold uppercase tracking-wider
                            hover:bg-pink-200 transition-colors cursor-pointer shrink-0
                          "
                        >
                          <X size={15} />
                          <span>{t.projects.closeBtn}</span>
                        </button>
                      </div>
                    </div>

                    {/* 2. AREA KONTEN SCROLLABLE */}
                    <div
                      ref={scrollRef}
                      onTouchStart={(e) =>
                        startPull(e.touches[0].clientY, false)
                      }
                      onTouchMove={(e) => movePull(e.touches[0].clientY, e)}
                      onTouchEnd={endPull}
                      className="
                        overflow-y-auto overscroll-y-none
                        px-5 py-6 md:px-10 md:py-8 space-y-6 md:space-y-8
                      "
                    >
                      <div>
                        <h2
                          id="case-study-title"
                          className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-pink-950 mb-2"
                        >
                          {activeCase.title}
                        </h2>
                        <p className="font-mono text-[11px] text-pink-600 uppercase tracking-wider mb-3">
                          {activeCase.role[lang]} · {activeCase.year}
                        </p>
                        <p className="text-sm md:text-lg text-pink-950/75 leading-relaxed">
                          {activeCase.description[lang]}
                        </p>
                      </div>

                      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-pink-200 bg-pink-950/5">
                        <Image
                          src={activeCase.imageUrl}
                          alt={activeCase.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        <div className="pl-4 border-l-4 border-[#ffb7c5] md:p-5 md:rounded-2xl md:bg-white md:border md:border-pink-100">
                          <span className="font-syncopate text-[10px] tracking-[0.2em] uppercase text-pink-500 font-bold block mb-1.5">
                            01 // {t.projects.labels.challenge}
                          </span>
                          <p className="text-xs md:text-sm text-pink-950/80 leading-relaxed">
                            {activeCase.caseStudy.challenge[lang]}
                          </p>
                        </div>

                        <div className="pl-4 border-l-4 border-[#a2e4f5] md:p-5 md:rounded-2xl md:bg-white md:border md:border-pink-100">
                          <span className="font-syncopate text-[10px] tracking-[0.2em] uppercase text-sky-500 font-bold block mb-1.5">
                            02 // {t.projects.labels.approach}
                          </span>
                          <p className="text-xs md:text-sm text-pink-950/80 leading-relaxed">
                            {activeCase.caseStudy.approach[lang]}
                          </p>
                        </div>

                        <div className="pl-4 border-l-4 border-[#e2d1f9] md:p-5 md:rounded-2xl md:bg-white md:border md:border-pink-100">
                          <span className="font-syncopate text-[10px] tracking-[0.2em] uppercase text-purple-500 font-bold block mb-1.5">
                            03 // {t.projects.labels.outcome}
                          </span>
                          <p className="text-xs md:text-sm text-pink-950/80 leading-relaxed">
                            {activeCase.caseStudy.outcome[lang]}
                          </p>
                        </div>
                      </div>

                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-pink-900/50 block mb-2">
                          // {t.projects.labels.tech}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeCase.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-md bg-pink-50 border border-pink-200/70 font-mono text-[11px] text-pink-900"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 3. STICKY BOTTOM ACTION BAR */}
                    <div className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-pink-950/10 px-5 py-3.5 md:px-10 md:py-4 shrink-0 flex items-center justify-between gap-3">
                      <a
                        href={activeCase.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          flex-1 md:flex-initial inline-flex items-center justify-center
                          gap-2 px-5 py-3 rounded-full bg-pink-500 text-white
                          font-syncopate text-[10px] md:text-xs font-bold
                          tracking-widest uppercase hover:bg-pink-600 transition-colors
                        "
                      >
                        <span>{t.projects.visitBtn}</span>
                        <ArrowUpRight size={15} />
                      </a>

                      <button
                        type="button"
                        onClick={handleNextProject}
                        className="
                          flex-1 md:flex-initial inline-flex items-center justify-center
                          gap-2 px-5 py-3 rounded-full bg-[#1a1116] text-pink-100
                          font-syncopate text-[10px] md:text-xs font-bold
                          tracking-widest uppercase hover:bg-pink-950 transition-colors
                          cursor-pointer
                        "
                      >
                        <span>{t.projects.nextProject}</span>
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
