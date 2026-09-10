import { useLocales } from "expo-localization";
import React, {createContext, useContext, useState } from "react";

export type LangCode = "en" | "ar" | "ru" | "hi" | "ur";
export const LangContext = createContext<{
  language: LangCode;
  setLanguage: (lang: LangCode) => void;
} | undefined>(undefined);

export function LangContextProvider({children}: {children: React.ReactNode}) {
  const systemLang = useLocales()[0].languageCode ?? "en";
  const initialLanguage: LangCode =
  availableLangs.some(l => l.langCode === systemLang)
    ? (systemLang as LangCode)
    : "en";
  const [language, setLanguage] = useState<LangCode>(
    initialLanguage,
  );
 
  const langSetting ={ language, setLanguage }
  
  return (<LangContext.Provider value={langSetting}>{children}</LangContext.Provider>)
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLang must be used within a LangProvider");
  }
  return context;
}

export const availableLangs: {
  langName: string;
  langCode: "en" | "ar" | "ru" | "hi" | "ur";
}[] = [
  {
    langName: "English",
    langCode: "en",
  },
  {
    langName: "Arabic",
    langCode: "ar",
  },
  {
    langName: "Russian",
    langCode: "ru",
  },
  {
    langName: "Hindi",
    langCode: "hi",
  },
  {
    langName: "Urdu",
    langCode: "ur",
  },
];
