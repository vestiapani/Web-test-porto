"use client";

import { useState } from "react";
import Image from "next/image";
import { deleteProject } from "./actions";
import { Trash2, Edit, PlusCircle, Search, Layers3 } from "lucide-react";
import { Project } from "../../models/types";
import ProjectFormModal from "../../components/ProjectFormModal";

interface AdminDashboardClientProps {
  initialProjects: Project[];
}

export default function AdminDashboardClient({
  initialProjects: projects,
}: AdminDashboardClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const openAddModal = () => {
    setProjectToEdit(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setProjectToEdit(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <ProjectFormModal onClose={closeModal} projectToEdit={projectToEdit} />
      )}

      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* HEADER SECTION DASHBOARD */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/20 backdrop-blur-2xl p-8 rounded-[2rem] shadow-xl shadow-black/5 border border-white/40 relative overflow-hidden">
          {/* Dekorasi Blob Kecil */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#f187a6]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
              Manajemen Konten
            </h1>
            <p className="text-slate-600 font-medium leading-relaxed">
              Mengelola{" "}
              <span className="text-[#f187a6] font-bold text-lg px-1">
                {projects?.length || 0}
              </span>{" "}
              portofolio aktif Anda.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="relative z-10 flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900/80 backdrop-blur-xl hover:bg-slate-800 text-white border border-slate-700/50 rounded-2xl font-bold transition-all shadow-lg hover:shadow-2xl hover:shadow-slate-900/20 hover:-translate-y-1 active:translate-y-0"
          >
            <PlusCircle size={20} />
            Tambah Proyek
          </button>
        </div>

        {/* TABEL PROYEK */}
        <div className="bg-white/20 backdrop-blur-2xl rounded-[2rem] shadow-xl shadow-black/5 border border-white/40 overflow-hidden">
          {/* Search Bar */}
          <div className="p-6 md:p-8 border-b border-white/30 flex justify-between items-center bg-white/30">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Daftar Konten
            </h2>
            <div className="relative hidden md:block">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                placeholder="Cari proyek..."
                className="pl-12 pr-4 py-3.5 bg-white/30 border border-white/40 backdrop-blur-md rounded-2xl text-slate-900 focus:border-[#f187a6] focus:bg-white/50 focus:ring-4 focus:ring-[#f187a6]/20 transition-all outline-none placeholder:text-slate-500 font-medium shadow-sm w-80"
              />
            </div>
          </div>

          <div className="overflow-x-auto h-[60vh] overflow-y-auto">
            <table className="w-full text-left border-collapse sticky top-0">
              <thead>
                <tr className="border-b border-white/30 text-xs text-slate-500 uppercase tracking-widest bg-white/40 backdrop-blur-md sticky top-0 z-20 shadow-sm">
                  <th className="p-6 font-bold min-w-[300px]">
                    Info & Preview
                  </th>
                  <th className="p-6 font-bold min-w-[200px]">Tech Stack</th>
                  <th className="p-6 font-bold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/20 relative z-10">
                {projects?.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-white/30 transition-colors group/row"
                  >
                    <td className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white/30 border border-white/40 shadow-sm">
                          {project.image_url ? (
                            <Image
                              src={project.image_url}
                              alt={project.title}
                              fill
                              className="object-cover group-hover/row:scale-110 transition-transform duration-500"
                              sizes="96px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs bg-slate-900/5 font-semibold">
                              No Img
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-extrabold text-slate-900 text-base mb-1 group-hover/row:text-[#f187a6] transition-colors">
                            {project.title}
                          </div>
                          <div className="text-sm text-slate-600 line-clamp-2 max-w-sm leading-relaxed font-medium">
                            {project.description}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-6">
                      <div className="flex flex-wrap gap-2 max-w-sm">
                        {(project.tech_stack || [])
                          .slice(0, 3)
                          .map((tech: string, i: number) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 bg-white/50 border border-white/60 text-slate-700 text-xs font-bold rounded-xl shadow-sm backdrop-blur-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        {(project.tech_stack || []).length > 3 && (
                          <span className="px-3 py-1.5 bg-white/30 border border-white/30 text-slate-500 text-xs font-bold rounded-xl shadow-sm">
                            +{(project.tech_stack || []).length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-6 text-right whitespace-nowrap">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(project)}
                          className="text-slate-500 hover:text-blue-600 bg-white/30 hover:bg-white/60 transition-all p-2.5 rounded-xl border border-white/40 shadow-sm active:scale-95"
                        >
                          <Edit size={18} strokeWidth={2.5} />
                        </button>
                        <form
                          action={async () => {
                            if (
                              confirm(
                                `Hapus proyek "${project.title}" secara permanen?`,
                              )
                            ) {
                              await deleteProject(project.id);
                            }
                          }}
                          className="inline"
                        >
                          <button
                            type="submit"
                            className="text-slate-500 hover:text-red-600 bg-white/30 hover:bg-white/60 transition-all p-2.5 rounded-xl border border-white/40 shadow-sm active:scale-95"
                          >
                            <Trash2 size={18} strokeWidth={2.5} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}

                {(!projects || projects.length === 0) && (
                  <tr>
                    <td
                      colSpan={3}
                      className="p-20 text-center text-slate-500 bg-white/10"
                    >
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/40 mb-6 shadow-sm border border-white/50">
                        <Layers3
                          size={32}
                          strokeWidth={1.5}
                          className="text-[#f187a6]"
                        />
                      </div>
                      <p className="text-lg font-bold mb-2 text-slate-900">
                        Belum ada portofolio
                      </p>
                      <p className="text-sm font-medium">
                        Klik tombol "Tambah Proyek" di atas untuk memulai
                        pencatatan.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
