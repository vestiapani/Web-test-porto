import "@/app/globals.css";
import type { Metadata } from "next";
import Navbar from '@/components/Navbar';
import { Plus_Jakarta_Sans } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";


const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Vestiapani Portofolio",
  description:
    "Portofolio Vestiapani.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="antialiased">
        <LanguageProvider>
        <Navbar />
        {children}
        </LanguageProvider>
      </body>
      
    </html>
  );
}
