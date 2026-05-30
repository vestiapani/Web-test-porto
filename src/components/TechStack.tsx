"use client";

import { motion } from "framer-motion";
import {
  Layout,
  Server,
  Database,
  Terminal,
  Code2,
  Blocks,
  Cpu,
  Globe,
  GitBranch,
  MonitorSmartphone,
  Cloud,
} from "lucide-react";

export default function TechStack() {
  const categories = [
    {
      title: "Frontend Development",
      icon: MonitorSmartphone,
      skills: [
        { name: "React", icon: Blocks },
        { name: "TypeScript", icon: Code2 },
        { name: "Tailwind CSS", icon: Layout },
        { name: "HTML & CSS", icon: Globe },
      ],
    },
    {
      title: "Backend & Logic",
      icon: Server,
      skills: [
        { name: "Java", icon: Cpu },
        { name: "PHP", icon: Server },
        { name: "Python", icon: Terminal },
      ],
    },
    {
      title: "Database & Deployment",
      icon: Database,
      skills: [
        { name: "Supabase", icon: Database },
        { name: "Git & GitHub", icon: GitBranch },
        { name: "Vercel & Netlify", icon: Cloud },
      ],
    },
  ];

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-20">
      <div className="mb-14 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-950 tracking-tight mb-4">
          Tech <span className="text-[#f187a6]">Stack</span>
        </h2>
        <p className="text-gray-600 font-medium text-lg max-w-2xl mx-auto">
          Teknologi dan alat yang sering saya gunakan untuk merancang antarmuka
          dan membangun sistem di balik layar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className="flex flex-col bg-white/10 border border-white/20 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-xl shadow-black/5 hover:-translate-y-2 hover:bg-white/20 hover:border-white/40 hover:shadow-2xl hover:shadow-[#f187a6]/10 transition-all duration-500"
          >
            {/* Header Kategori */}
            <div className="flex items-center gap-4 mb-8 border-b border-white/20 pb-6">
              <div className="p-3.5 bg-white/40 border border-white/30 rounded-2xl text-[#f187a6] shadow-sm">
                <category.icon size={26} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-950 tracking-tight">
                {category.title}
              </h3>
            </div>

            {/* List Teknologi */}
            <ul className="flex flex-col gap-4">
              {category.skills.map((skill, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-4 group cursor-default"
                >
                  <div className="p-2.5 bg-white/30 border border-white/40 rounded-xl text-gray-600 group-hover:text-[#f187a6] group-hover:bg-white/80 group-hover:scale-110 transition-all duration-300 shadow-sm">
                    <skill.icon size={18} strokeWidth={2.5} />
                  </div>
                  <span className="font-bold text-gray-800 text-lg group-hover:text-[#f187a6] transition-colors">
                    {skill.name}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
