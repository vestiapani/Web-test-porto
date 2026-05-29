import Image from "next/image";
import { ExternalLink, Image as ImageIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";

type ProjectCardProps = {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
};

export default function ProjectCard({
  title,
  description,
  techStack,
  githubUrl,
  liveUrl,
  imageUrl,
}: ProjectCardProps) {
  return (
    // GLASS CARD: bg-white/10 + backdrop-blur-xl
    <div className="bg-white/10 border border-white/20 rounded-[2rem] p-6 backdrop-blur-xl shadow-lg shadow-black/5 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#f187a6]/15 transition-all duration-500 relative overflow-hidden group flex flex-col h-full">
      {/* Blob Dekoratif Samar di dalam Card */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-100/20 rounded-full blur-2xl pointer-events-none group-hover:bg-[#f187a6]/10 transition-colors duration-500"></div>

      {/* BAGIAN PREVIEW GAMBAR */}
      <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-6 border border-white/20 shadow-inner bg-white/5 flex-shrink-0">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={`Preview of ${title}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Overlay gradient gelap transparan saat di-hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </>
        ) : (
          // Fallback jika tidak ada gambar yang diupload
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2 bg-gray-900/5">
            <ImageIcon size={32} strokeWidth={1.5} className="opacity-40" />
            <span className="text-xs font-semibold uppercase tracking-widest opacity-40">
              No Preview
            </span>
          </div>
        )}
      </div>

      {/* KONTEN TEKS */}
      <h3 className="text-2xl font-bold mb-3 text-gray-950 relative z-10 tracking-tight group-hover:text-[#f187a6] transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-700 mb-6 line-clamp-3 leading-relaxed relative z-10 flex-grow text-sm md:text-base">
        {description}
      </p>

      {/* TECH STACK BADGES */}
      <div className="flex flex-wrap gap-2 mb-6 relative z-10">
        {techStack?.map((tech, idx) => (
          <span
            key={idx}
            className="px-3.5 py-1.5 bg-white/40 border border-white/30 text-gray-800 text-xs font-bold rounded-xl backdrop-blur-md shadow-sm cursor-default hover:bg-[#f187a6] hover:text-white hover:border-[#f187a6] transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* LINK URL (Dibuat menjadi bentuk tombol agar UX lebih baik) */}
      <div className="flex gap-3 relative z-10 pt-4 border-t border-white/20 mt-auto">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 flex-1 bg-white/50 hover:bg-gray-950 text-gray-700 hover:text-white border border-white/30 py-2.5 rounded-xl font-semibold transition-all shadow-sm group/btn"
          >
            <FaGithub
              size={18}
              className="group-hover/btn:scale-110 transition-transform"
            />
            <span className="text-sm">Source Code</span>
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 flex-1 bg-[#f187a6]/10 hover:bg-[#f187a6] text-[#f187a6] hover:text-white border border-[#f187a6]/20 hover:border-[#f187a6] py-2.5 rounded-xl font-semibold transition-all shadow-sm group/btn"
          >
            <ExternalLink
              size={18}
              className="group-hover/btn:scale-110 transition-transform"
            />
            <span className="text-sm">Live Demo</span>
          </a>
        )}
      </div>
    </div>
  );
}
