import React from "react";
import { createContext, useContext, useState } from "react";
import { Text } from "react-native";
import { enUSTranslation } from "./en-us"

const languages = {
  "en-US": enUSTranslation
}
const LanguageContext = createContext(["en-US", ()=>{}, Object.keys(languages)]);

function setLang(newLang){
  if(!(newLang in languages)){
    throw new Error(`langauge [${newLang}] is not in languages ${JSON.stringify(Object.keys(languages))}`);
  }

}

function translateKey(translationKey){
  const [lang] = useContext(LanguageContext)
  const translations = languages[lang];
  if(!(translationKey in translations)){
    throw new Error(`translationKey [${translationKey}] is not in translations ${JSON.stringify(Object.keys(translations))}`);
  }
  return translations[translationKey];
}

export function useTranslate(){
  const [lang] = useContext(LanguageContext);
  const translations = languages[lang];
  return (translationKey)=>{
    if(!(translationKey in translations)){
      throw new Error(`translationKey [${translationKey}] is not in translations ${JSON.stringify(Object.keys(translations))}`);
    }
    return translations[translationKey];
  };
}

export function TranslatedText({ key }){
  const t = useTranslate();
  return (<Text>{t(key)}</Text>);
}

function LanguageContextProvider({ children }){
  const [currentLang, setCurrentLang] = useState("en-US");
  return (
    <LanguageContext.Provider
      value={[
        currentLang,
        (newLang)=>{
          if(!(newLang in languages)){
            throw new Error(`langauge [${newLang}] is not in languages ${JSON.stringify(Object.keys(languages))}`);
          }
          setCurrentLang(newLang);
        },
        Object.keys(languages),
      ]}
    >
      {children}
    </LanguageContext.Provider>

  )
}

export { translateKey, LanguageContextProvider, LanguageContext, }
