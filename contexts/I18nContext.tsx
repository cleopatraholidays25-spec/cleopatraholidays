import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Language } from '../types';

interface I18nContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Default empty translations, to avoid errors before fetch completes
const defaultTranslations = {
  [Language.EN]: {},
  [Language.AR]: {}
};

export const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const storedLang = localStorage.getItem('language');
    return (storedLang as Language) || Language.EN;
  });

  const [translations, setTranslations] = useState(defaultTranslations);

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const [enResponse, arResponse] = await Promise.all([
          fetch('./locales/en.json'),
          fetch('./locales/ar.json')
        ]);
        if (!enResponse.ok || !arResponse.ok) {
          throw new Error(`Failed to load translation files: ${enResponse.statusText}, ${arResponse.statusText}`);
        }
        const enData = await enResponse.json();
        const arData = await arResponse.json();
        setTranslations({ [Language.EN]: enData, [Language.AR]: arData });
      } catch (error) {
        console.error('Error fetching translations:', error);
      }
    };
    fetchTranslations();
  }, []);

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
