// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vestiapani Portofolio",
  description:
    "Software Developer Portfolio focusing on elegant digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      {/* Menambahkan min-h-screen ke body agar background Silk penuh */}
      <body className="antialiased min-h-screen m-0 p-0">{children}</body>
    </html>
  );
}
