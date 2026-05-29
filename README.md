# 🌐 Vestiapani Portfolio OS — V2

[![Status Proyek](https://img.shields.io/badge/status-aktif-brightgreen)](#)
[![Framework](https://img.shields.io/badge/framework-Next.js%2015-000000?logo=nextdotjs)](https://nextjs.org/)
[![Database & Auth](https://img.shields.io/badge/backend-Supabase-3ECF8E?logo=supabase)](https://supabase.com/)
[![Styling](https://img.shields.io/badge/styling-Tailwind%20CSS-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

Website portofolio personal *full-stack* modern yang dibangun dengan fokus pada performa tinggi, kedalaman estetika visual, dan manajemen konten yang dinamis. Proyek ini mengimplementasikan prinsip desain *Glassmorphism* premium yang dipadukan dengan aksen *interactive 3D shader background*.

---

## ✨ Fitur Utama

- **Premium Glassmorphism UI/UX**: Antarmuka berbasis panel mika transparan dengan optimasi kontras tinggi, memberikan kesan bersih, futuristik, dan profesional.
- **Dynamic 3D Shader Background**: Mengintegrasikan komponen *Silk material shader* bertenaga *WebGl* melalui *React Three Fiber* untuk menghasilkan efek latar belakang sutra yang fluid dan interaktif.
- **Full-Stack CRUD Dashboard**: Panel manajemen admin privat yang tangguh untuk menambahkan, memperbarui, dan menghapus proyek secara *real-time* tanpa perlu menyentuh kode program.
- **Secured Server-Side Authentication**: Proteksi rute admin yang ketat memanfaatkan Next.js Middleware dan proteksi basis data menggunakan Supabase *Row Level Security* (RLS).
- **Self-Hosted Cloud Storage**: Fitur penanganan unggahan berkas (*file upload*) gambar proyek secara mandiri yang terintegrasi langsung dengan Supabase Storage Bucket.
- **Fluid App-Like Responsive Navigation**: Sistem navigasi adaptif ujung-ke-ujung (*full-width*) di desktop yang bertransisi menjadi *fluid drawer navigation menu* interaktif pada perangkat seluler.

---

## 🛠️ Arsitektur Teknologi

Aplikasi ini dibangun menggunakan ekosistem teknologi mutakhir:

- **Core Framework:** Next.js (App Router, Asynchronous Server Components) & React
- **Language:** TypeScript (Type-safe configuration)
- **Styling Engine:** Tailwind CSS & Lucide Icons
- **Graphics Engine:** Three.js & @react-three/fiber
- **Backend-as-a-Service:** Supabase (PostgreSQL, SSR Auth, Blob Storage, RLS Guard)
- **Deployment Platform:** Vercel Production Environment

---

## ⚙️ Langkah Instalasi Lokal

Pastikan Anda telah menginstal **Node.js v18+** dan memiliki akun **Supabase** yang aktif sebelum memulai instalasi.

### 1. Kloning Repositori
```bash
git clone [https://github.com/vestiapani/Web-test-porto.git](https://github.com/vestiapani/Web-test-porto.git)
cd Web-test-porto
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Buat berkas `.env.local` pada direktori utama proyek, lalu lengkapi kredensial Supabase Anda:
```env
NEXT_PUBLIC_SUPABASE_URL=[https://your-project-id.supabase.co](https://your-project-id.supabase.co)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anonymous-key-here
```

### 4. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) pada peramban Anda untuk melihat aplikasi berjalan.

---

## 🔒 Konfigurasi Keamanan Basis Data (SQL)

Tabel `projects` diamankan menggunakan kebijakan Row Level Security (RLS) berikut pada PostgreSQL:

```sql
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Izinkan akses baca data secara publik
CREATE POLICY "Public Read Access" ON projects FOR SELECT USING (true);

-- Batasi operasi mutasi data (CUD) hanya untuk admin terautentikasi
CREATE POLICY "Admin Insert Guard" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin Update Guard" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Delete Guard" ON projects FOR DELETE USING (auth.role() = 'authenticated');
```

---

Didesain dan dikembangkan dengan tingkat ketelitian tinggi oleh **Vestiapani**.  
*Hak Cipta &copy; 2026. Seluruh hak cipta dilindungi undang-undang.*