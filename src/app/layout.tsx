import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";


const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
    <html lang="id" className={`font-sans ${plusJakarta.variable}`}>
      <body className="antialiased min-h-screen m-0 p-0">{children}</body>
    </html>
  );
}
