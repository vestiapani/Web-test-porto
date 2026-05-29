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
  // State untuk kontrol modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const openAddModal = () => {
    setProjectToEdit(null); // Null artinya tambah baru
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setProjectToEdit(project); // Isi data artinya edit
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Tampilkan modal jika state terbuka */}
      {isModalOpen && (
        <ProjectFormModal onClose={closeModal} projectToEdit={projectToEdit} />
      )}

      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* HEADER SECTION DASHBOARD */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] shadow-lg shadow-black/5 border border-white/20 relative overflow-hidden">
          {/* Dekorasi Blob Kecil */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <h1 className="text-3xl font-extrabold text-gray-950 mb-1">
              Manajemen Konten
            </h1>
            <p className="text-gray-700 font-medium leading-relaxed">
              Mengelola{" "}
              <span className="text-[#f187a6] font-bold text-lg">
                {projects?.length || 0}
              </span>{" "}
              portofolio aktif Anda.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="relative z-10 flex items-center gap-3 bg-gray-950 text-white px-6 py-3.5 rounded-2xl font-semibold hover:bg-gray-800 transition shadow-md hover:-translate-y-0.5 active:translate-y-0"
          >
            <PlusCircle size={20} />
            Tambah Proyek
          </button>
        </div>

        {/* TABEL PROYEK */}
        <div className="bg-white/10 backdrop-blur-xl rounded-[2rem] shadow-lg shadow-black/5 border border-white/20 overflow-hidden">
          {/* Search Bar */}
          <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center bg-white/20">
            <h2 className="text-xl font-bold text-gray-950">Daftar Konten</h2>
            <div className="relative hidden md:block">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Cari proyek..."
                className="pl-12 pr-4 py-3.5 bg-white/50 border border-white/30 rounded-xl text-sm w-80 focus:border-[#f187a6] focus:bg-white/70 focus:ring-4 focus:ring-[#f187a6]/10 transition-all outline-none text-gray-900 placeholder:text-gray-500 shadow-inner"
              />
            </div>
          </div>

          <div className="overflow-x-auto h-[60vh] overflow-y-auto">
            <table className="w-full text-left border-collapse sticky top-0">
              <thead>
                <tr className="border-b border-white/10 text-xs text-gray-600 uppercase tracking-widest bg-white/5 backdrop-blur-sm sticky top-0 z-20 shadow-inner">
                  <th className="p-6 font-bold min-w-[300px]">
                    Info & Preview
                  </th>
                  <th className="p-6 font-bold min-w-[200px]">Tech Stack</th>
                  <th className="p-6 font-bold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 relative z-10">
                {projects?.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-white/20 transition-colors"
                  >
                    {/* KOLOM INFO & GAMBAR */}
                    <td className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Thumbnail Kecil */}
                        <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-white/20 border border-white/20 shadow-sm">
                          {project.image_url ? (
                            <Image
                              src={project.image_url}
                              alt={project.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="80px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs bg-gray-900/10">
                              No Img
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-gray-950 text-base mb-1">
                            {project.title}
                          </div>
                          <div className="text-sm text-gray-700 line-clamp-2 max-w-sm leading-relaxed">
                            {project.description}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* KOLOM TECH STACK - PERBAIKAN DI SINI */}
                    <td className="p-6">
                      <div className="flex flex-wrap gap-2 max-w-sm">
                        {(project.tech_stack || [])
                          .slice(0, 3)
                          .map((tech: string, i: number) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 bg-[#f187a6] text-white text-xs font-semibold rounded-lg shadow-sm backdrop-blur-sm shadow-black/10"
                            >
                              {tech}
                            </span>
                          ))}
                        {(project.tech_stack || []).length > 3 && (
                          <span className="px-3 py-1.5 bg-white/30 text-gray-600 text-xs font-semibold rounded-lg">
                            +{(project.tech_stack || []).length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* KOLOM AKSI */}
                    <td className="p-6 text-right whitespace-nowrap">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(project)}
                          className="text-gray-600 hover:text-blue-600 hover:bg-white/40 transition p-2.5 rounded-xl border border-transparent hover:border-white/30 shadow-sm active:translate-y-0 hover:-translate-y-0.5"
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
                            className="text-gray-600 hover:text-red-600 hover:bg-white/40 transition p-2.5 rounded-xl border border-transparent hover:border-white/30 shadow-sm active:translate-y-0 hover:-translate-y-0.5"
                          >
                            <Trash2 size={18} strokeWidth={2.5} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}

                {/* STATE KOSONG */}
                {(!projects || projects.length === 0) && (
                  <tr>
                    <td
                      colSpan={3}
                      className="p-20 text-center text-gray-600 bg-white/5"
                    >
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-6 shadow-inner border border-white/20">
                        <Layers3
                          size={32}
                          strokeWidth={1.5}
                          className="text-[#f187a6]"
                        />
                      </div>
                      <p className="text-lg font-medium mb-2 leading-relaxed">
                        Belum ada portofolio
                      </p>
                      <p className="text-sm">
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
