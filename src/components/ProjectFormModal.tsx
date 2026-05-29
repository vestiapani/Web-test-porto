"use client";

import { useState, useRef, useEffect } from "react";
import { addProject, updateProject } from "../app/admin/actions";
import { X, CheckCircle, AlertCircle, Edit, UploadCloud } from "lucide-react";
import { Project } from "../models/types";

interface ProjectFormModalProps {
  onClose: () => void;
  projectToEdit?: Project | null;
}

export default function ProjectFormModal({
  onClose,
  projectToEdit,
}: ProjectFormModalProps) {
  const isEdit = !!projectToEdit;
  const formRef = useRef<HTMLFormElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // EFEK PENGUNCI SCROLL BACKGROUND
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  async function onSubmit(formData: FormData) {
    setIsSubmitting(true);
    setNotification(null);

    let result;
    if (isEdit && projectToEdit) {
      result = await updateProject(projectToEdit.id, formData);
    } else {
      result = await addProject(formData);
    }

    if (result.success) {
      setNotification({
        type: "success",
        message: `Proyek berhasil ${isEdit ? "diperbarui" : "ditambahkan"}!`,
      });
      if (!isEdit) formRef.current?.reset();
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setNotification({
        type: "error",
        message: result.message || "Terjadi kesalahan sistem.",
      });
    }
    setIsSubmitting(false);
  }

  const defaultStack = projectToEdit?.tech_stack?.join(", ") || "";

  return (
    // Overlay transparan
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-gray-950/40 backdrop-blur-sm transition-opacity duration-300">
      {notification && (
        <div
          className={`fixed top-8 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 px-6 py-3 rounded-full shadow-lg border backdrop-blur-md animate-in slide-in-from-top-10 fade-in duration-300 ${notification.type === "success" ? "bg-[#f187a6] text-white border-[#f187a6]" : "bg-red-500/90 text-white border-red-400"}`}
        >
          {notification.type === "success" ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span className="font-medium text-sm">{notification.message}</span>
        </div>
      )}

      {/* PERBAIKAN CSS FORM:
        1. overflow-x-hidden -> Mengunci agar tidak bisa digeser ke samping
        2. [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -> Menyembunyikan wujud scrollbar vertikal 
      */}
      <form
        ref={formRef}
        action={onSubmit}
        className="relative bg-white/10 border border-white/20 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-xl shadow-2xl shadow-black/10 w-full max-w-2xl flex flex-col animate-in zoom-in-95 fade-in duration-500 max-h-[95vh] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 transition p-2 rounded-lg hover:bg-white/20 bg-white/10 z-20"
        >
          <X size={22} />
        </button>

        {/* Blob dekoratif ini yang sebelumnya bikin bocor ke samping */}
        <div className="absolute top-[-30%] right-[-30%] w-[120%] h-[120%] bg-pink-100/10 rounded-full blur-[10rem] -z-10 pointer-events-none animation-delay-2000"></div>

        <h1 className="text-3xl font-extrabold text-gray-950 mb-8 tracking-tight flex items-center gap-3 relative z-10">
          {isEdit ? (
            <Edit className="text-[#f187a6]" />
          ) : (
            <X size={26} className="text-[#f187a6] rotate-45" />
          )}
          {isEdit ? "Edit Proyek" : "Tambah Proyek"}
        </h1>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-8 relative z-10">
          <div className="space-y-1.5 col-span-full group">
            <label className="text-sm font-semibold text-gray-800 tracking-wider group-focus-within:text-[#f187a6]">
              Judul Proyek
            </label>
            <input
              name="title"
              type="text"
              placeholder="Nama Proyek Anda"
              required
              defaultValue={projectToEdit?.title || ""}
              className="w-full px-5 py-3.5 bg-white/60 border border-white/30 rounded-2xl text-gray-950 focus:border-[#f187a6] focus:bg-white/80 focus:ring-4 focus:ring-[#f187a6]/10 transition-all outline-none placeholder:text-gray-400 shadow-inner"
            />
          </div>

          <div className="space-y-1.5 col-span-full group">
            <label className="text-sm font-semibold text-gray-800 tracking-wider group-focus-within:text-[#f187a6]">
              Deskripsi
            </label>
            <textarea
              name="description"
              placeholder="Ceritakan detail proyek ini..."
              rows={3}
              defaultValue={projectToEdit?.description || ""}
              className="w-full px-5 py-3.5 bg-white/60 border border-white/30 rounded-2xl text-gray-950 focus:border-[#f187a6] focus:bg-white/80 focus:ring-4 focus:ring-[#f187a6]/10 transition-all outline-none placeholder:text-gray-400 shadow-inner resize-none"
            ></textarea>
          </div>

          {/* INPUT GAMBAR (UPLOAD FILE) */}
          <div className="space-y-1.5 col-span-full group">
            <label className="text-sm font-semibold text-gray-800 tracking-wider group-focus-within:text-[#f187a6]">
              Upload Gambar (Preview)
            </label>

            {isEdit && (
              <input
                type="hidden"
                name="existing_image_url"
                value={projectToEdit?.image_url || ""}
              />
            )}

            <div className="relative w-full">
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div
                className={`w-full px-5 py-3.5 bg-white/60 border border-dashed rounded-2xl text-gray-500 transition-all flex items-center justify-center gap-2 ${fileName ? "border-[#f187a6] text-[#f187a6] bg-[#f187a6]/10" : "border-gray-400/50 hover:bg-white/80"}`}
              >
                <UploadCloud size={20} />
                <span className="font-medium truncate max-w-[200px]">
                  {fileName
                    ? fileName
                    : isEdit && projectToEdit?.image_url
                      ? "Ganti Gambar Proyek"
                      : "Pilih File Gambar..."}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 group col-span-full">
            <label className="text-sm font-semibold text-gray-800 tracking-wider group-focus-within:text-[#f187a6]">
              Tech Stack (Pisahkan Koma)
            </label>
            <input
              name="tech_stack"
              type="text"
              placeholder="Next.js, TS, Supabase"
              defaultValue={defaultStack}
              className="w-full px-5 py-3.5 bg-white/60 border border-white/30 rounded-2xl text-gray-950 focus:border-[#f187a6] focus:bg-white/80 focus:ring-4 focus:ring-[#f187a6]/10 transition-all outline-none placeholder:text-gray-400 shadow-inner"
            />
          </div>

          <div className="space-y-1.5 group">
            <label className="text-sm font-semibold text-gray-800 tracking-wider group-focus-within:text-[#f187a6]">
              GitHub URL
            </label>
            <input
              name="github_url"
              type="url"
              placeholder="https://github..."
              defaultValue={projectToEdit?.github_url || ""}
              className="w-full px-5 py-3.5 bg-white/60 border border-white/30 rounded-2xl text-gray-950 focus:border-[#f187a6] focus:bg-white/80 focus:ring-4 focus:ring-[#f187a6]/10 transition-all outline-none placeholder:text-gray-400 shadow-inner"
            />
          </div>

          <div className="space-y-1.5 group">
            <label className="text-sm font-semibold text-gray-800 tracking-wider group-focus-within:text-[#f187a6]">
              Live Demo URL
            </label>
            <input
              name="live_url"
              type="url"
              placeholder="https://vestia..."
              defaultValue={projectToEdit?.live_url || ""}
              className="w-full px-5 py-3.5 bg-white/60 border border-white/30 rounded-2xl text-gray-950 focus:border-[#f187a6] focus:bg-white/80 focus:ring-4 focus:ring-[#f187a6]/10 transition-all outline-none placeholder:text-gray-400 shadow-inner"
            />
          </div>
        </div>

        <div className="w-full flex flex-col-reverse md:flex-row gap-3 relative z-10 pt-6 border-t border-white/10 mt-auto">
          <button
            type="button"
            onClick={onClose}
            className="w-full md:w-1/3 flex items-center justify-center bg-white/60 text-[#b18597] border border-white/20 px-8 py-3.5 rounded-2xl font-semibold hover:bg-[#ffe9e9] transition shadow-inner"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-2/3 flex items-center justify-center bg-gray-950 text-white px-8 py-3.5 rounded-2xl font-semibold hover:bg-gray-800 transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:bg-gray-400 disabled:hover:translate-y-0"
          >
            {isSubmitting
              ? "Mengunggah Data..."
              : isEdit
                ? "Simpan Perubahan"
                : "Simpan Proyek Baru"}
          </button>
        </div>
      </form>
    </div>
  );
}
