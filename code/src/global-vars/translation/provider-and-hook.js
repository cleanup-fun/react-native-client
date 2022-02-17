import React from "react";
import { useContext, useState, useEffect, useMemo } from "react";
import { createInstance as createI18next } from "i18next";
import { useTranslation, I18nextProvider } from "react-i18next";
import { initializeI18Next } from "./fns/initialize-i18next";
import { setLanguage } from "./fns/set-language";
import { resolveSelectableLanguages } from "./fns/resolve";

import { translateText, translateTimestamp } from "./translators";

import { LanguageContext, DEFAULT_CONTEXT_VALUE } from "./context";

export function useTranslate(){
  return useContext(LanguageContext);
}

export function LanguageContextProviderAttempt({ defaultLang, children }){
  // Didn't work out because it wanted a suspend component
  // And I initialize too late to make it so that i18n has the no suspend config
  // Thus, this didn't work out
  const i18n = useMemo(()=>(createI18next()), []);
  const [prep, setPrep] = useState(0);
  const [languages, setLanguages] = useState(false);

  useEffect(()=>{
    if(prep) return;
    setPrep(1);
    resolveSelectableLanguages().then(async (foundLangauges)=>{
      setLanguages(foundLangauges);
      await initializeI18Next(i18n, defaultLang);
      setPrep(2);
    });
  }, [prep, defaultLang, i18n]);
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageContextProviderChild
        defaultLang={defaultLang}
        languages={languages}
      >{ children }</LanguageContextProviderChild>
    </I18nextProvider>
  );
}

export function LanguageContextProvider({ defaultLang, children }){
  const { t, i18n } = useTranslation("translations");
  const [curLang, setCurLang] = useState();
  const [changingLangs, setChangingLangs] = useState(true);

  const [languages, setLanguages] = useState(false);

  useEffect(()=>{
    resolveSelectableLanguages().then(async (foundLangauges)=>{
      setLanguages(foundLangauges);
      setChangingLangs(false);
    });
  }, []);

  useEffect(()=>{
    if(!i18n || !i18n.on) return;
    const l = ()=>{
      setCurLang(i18n.resolvedLanguage);
      setChangingLangs(false);
    };
    i18n.on("languageChanged", l);
    return ()=>(i18n.off("languageChanged", l));
  }, [i18n]);

  return (
    <LanguageContext.Provider
      value={!i18n || !i18n.on ? DEFAULT_CONTEXT_VALUE  : {
        i18n,
        currentLanguage: i18n.resolvedLanguage,
        t: (path, options)=>{
          if(changingLangs) return "";
          return translateText(t, path, options);
        },
        tTimestamp: (timestamp, path, options)=>{
          if(changingLangs) return "";
          return translateTimestamp(t, timestamp, path, options);
        },
        tDateTime: (datetime, path, options)=>{
          if(changingLangs) return "";
          return translateTimestamp(t, datetime.getTime(), path, options);
        },
        isChangingLanguage: curLang && changingLangs,
        availableLanguages: languages,
        setLanguage: async (newLangauge)=>{
          setChangingLangs(true);
          try {
            await setLanguage(
              i18n,
              (
                typeof newLangauge === "string" ? newLangauge :
                newLangauge.lang ? newLangauge.lang :
                defaultLang.lang
              ),
            );
          }catch(e){
            // If the new language can't be set then it should just go
            // back to the default
            // We'll let the event listener do the updating of changing langs
            setChangingLangs(false);
          }
        },
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
