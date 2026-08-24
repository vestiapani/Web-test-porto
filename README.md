# 🌸 Vestiapani Portfolio

[![Status Proyek](https://img.shields.io/badge/status-aktif-brightgreen)](#)
[![Framework](https://img.shields.io/badge/framework-Next.js%2015-000000?logo=nextdotjs)](https://nextjs.org/)
[![Styling](https://img.shields.io/badge/styling-Tailwind%20CSS-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Animation](https://img.shields.io/badge/animation-GSAP-88CE02?logo=greensock)](https://gsap.com/)

Website portofolio personal dengan nuansa visual pink/soft aesthetic bernuansa anime, dilengkapi animasi scroll yang immersive menggunakan GSAP ScrollTrigger. Dukungan dwi-bahasa (Indonesia/Inggris) dan tampilan proyek yang dinamis menjadikan situs ini medium presentasi karya yang ekspresif sekaligus profesional.

---

## ✨ Fitur Utama

- **GSAP ScrollTrigger Storytelling**: Section pinned dengan timeline animasi bertahap — teks dan mockup gambar bertransisi secara sinematik mengikuti posisi scroll pengguna.
- **Dwi-Bahasa (ID/EN)**: Sistem toggle bahasa real-time menggunakan React Context, mengubah seluruh konten teks tanpa reload halaman.
- **Desain Estetika Custom**: Dot-grid pattern, elemen dekoratif mengambang (*floating elements*), tipografi vertikal ala Jepang, dan palet warna pink/rose yang konsisten di seluruh section.
- **Galeri Proyek Dinamis**: Daftar proyek dirender dari data terstruktur (`projects.json`), memudahkan penambahan portofolio baru tanpa mengubah komponen.
- **Splash Screen & Footer Kustom**: Pengalaman *loading* awal yang halus serta footer yang konsisten dengan tema keseluruhan.
- **Fully Responsive**: Layout menyesuaikan dari mobile hingga desktop, termasuk penyesuaian arah teks dan ukuran mockup pada section sticky.
- **Aksesibilitas**: Fokus ring pada elemen interaktif (`focus-visible`) untuk navigasi keyboard yang lebih baik.

---

## 🛠️ Arsitektur Teknologi

- **Core Framework:** Next.js (App Router) & React
- **Language:** TypeScript
- **Styling Engine:** Tailwind CSS
- **Animasi:** GSAP + ScrollTrigger + `@gsap/react` (`useGSAP` hook)
- **Ikon:** Lucide React
- **Deployment Platform:** Vercel

---

## 📁 Struktur Proyek

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx          # Halaman utama (hero, sticky scroll, skills, projects, contact)
├── components/
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   ├── ProjectCard.tsx
│   └── SplashScreen.tsx
├── context/
│   └── LanguageContext.tsx   # Provider untuk toggle bahasa ID/EN
└── data/
    ├── dictionaries.ts       # Kamus teks ID/EN
    └── projects.json         # Data proyek yang ditampilkan
```

---

## ⚙️ Langkah Instalasi Lokal

Pastikan Anda telah menginstal **Node.js v18+** sebelum memulai instalasi.

### 1. Kloning Repositori
```bash
git clone https://github.com/vestiapani/Web-test-porto.git
cd Web-test-porto
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) pada peramban Anda untuk melihat aplikasi berjalan.

---

## ✍️ Menambahkan Proyek Baru

Cukup tambahkan entri baru pada `src/data/projects.json` sesuai skema yang sudah ada — komponen `ProjectCard` akan otomatis merender proyek baru tersebut di section **Projects**.

## 🌍 Menambahkan/Mengubah Teks Terjemahan

Semua string teks yang ditampilkan (hero, sticky section, skills, projects, contact) diatur pada `src/data/dictionaries.ts`, dikonsumsi melalui `useLanguage()` dari `LanguageContext`.

---

Didesain dan dikembangkan dengan tingkat ketelitian tinggi oleh **Vestiapani**.
*Hak Cipta &copy; 2026. Seluruh hak cipta dilindungi undang-undang.*