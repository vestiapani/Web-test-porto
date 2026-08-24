"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { dict } from "@/data/dictionaries";

type Language = "id" | "en";
type ContextType = {
  lang: Language;
  toggleLang: () => void;
  t: typeof dict.id;
};

const LanguageContext = createContext<ContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("id");
  const t = dict[lang];

  const toggleLang = () => setLang((prev) => (prev === "id" ? "en" : "id"));

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage harus di dalam LanguageProvider");
  return context;
};
