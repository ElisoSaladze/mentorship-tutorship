import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Language, Translations, translations } from "../i18n/translations";


type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};

type Props = {
  children: ReactNode;
};

const LanguageProvider = ({ children }: Props) => {
  // Get language from localStorage or default to Georgian
  const storedLanguage = localStorage.getItem("language") as Language | null;
  const [language, setLanguageState] = useState<Language>(storedLanguage || "ka");

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
