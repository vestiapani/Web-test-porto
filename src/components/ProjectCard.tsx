"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  link: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col bg-white/80 border border-pink-100 backdrop-blur-xl shadow-lg shadow-pink-100/50 rounded-3xl overflow-hidden hover:bg-white transition-colors duration-500"
    >
      <div className="relative w-full h-64 bg-pink-50">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-pink-300 font-mono text-sm">
            [ Placeholder Visual ]
          </div>
        )}
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold text-pink-950 mb-3 tracking-tight">
          {project.title}
        </h3>
        <p className="text-gray-600 text-base mb-6 flex-grow leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-700 text-xs tracking-wider font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors mt-auto"
          >
            Lihat Project <ExternalLink size={16} />
          </a>
        )}
      </div>
    </motion.div>
  );
}
