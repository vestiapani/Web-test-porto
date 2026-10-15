import "@/app/globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Plus_Jakarta_Sans, Syncopate } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const syncopate = Syncopate({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-syncopate",
});

export const metadata: Metadata = {
  title: "Vestiapani Portfolio — Ivan Wirahadi Permana",
  description:
    "Frontend Developer building clean, modern, and interactive web experiences.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} ${syncopate.variable} scroll-smooth`}
    >
      <body className="antialiased font-sans">
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
