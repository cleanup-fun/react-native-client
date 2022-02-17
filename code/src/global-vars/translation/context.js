import { createContext } from "react";

export const DEFAULT_CONTEXT_VALUE = {
  currentLanguage: "",
  t: ()=>{ return ""; },
  i18n: void 0,
  isChangingLanguage: true,
  availableLanguages: [],
  setLanguage: ()=>{return Promise.reject("not ready yet");},
};

export const LanguageContext = createContext(DEFAULT_CONTEXT_VALUE);
