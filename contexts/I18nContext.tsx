import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Language } from '../types';

// Import translation files directly for immediate availability
import enTranslations from '../data/en.json';
import arTranslations from '../data/ar.json';

interface I18nContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const storedLang = localStorage.getItem('language');
    return (storedLang as Language) || Language.EN;
  });

  // Initialize translations immediately with imported data
  const [translations, setTranslations] = useState(() => ({
    [Language.EN]: enTranslations,
    [Language.AR]: arTranslations
  }));

  useEffect(() => {
    const root = window.document.documentElement;
    root.lang = language;
    root.dir = language === Language.AR ? 'rtl' : 'ltr';
    localStorage.setItem('language', language);
  }, [language]);

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        return key;
      }
    }
    return String(result) || key;
  }, [language, translations]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};
