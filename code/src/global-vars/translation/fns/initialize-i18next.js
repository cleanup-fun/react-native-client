import i18nCreator from "i18next";
import { I18nManager } from "react-native";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";

import { getConfig, resolveUnloadedLang } from "./resolve";

export async function initializeI18Next(defaultLang){
  const resources = {
    [defaultLang.lang]: {
      translations: defaultLang.translations,
    },
  };
  var  translationConfig = await getConfig();
  var storedLangs = [
    { lang: defaultLang.lang, rtl: defaultLang.rtl },
  ];

  // We build the default resources from the default lang
  // This is so we don't have to create a seperate default resources file
  var lang;
  var rtl;
  async function setDiscoveredLang(discoveredLang){
    if(discoveredLang === defaultLang.lang){
      lang = defaultLang.lang;
      rtl = defaultLang.rtl;
    } else {
      try {
        var resource = JSON.parse(
          await resolveUnloadedLang(discoveredLang),
        );
        resources[resource.lang] = resource.translations;
        lang = resource.lang;
        rtl = resource.rtl;
      }catch(e){
        // we don't need to worry
        // rn localize should take care of the rest
      }
    }

  }
  if(translationConfig !== null){
    // Try to set it to the language chosen by the user
    translationConfig = JSON.parse(translationConfig);
    storedLangs = translationConfig.availLangs;
    await setDiscoveredLang(translationConfig.lang);
  }
  if(lang === void 0){
    // Try to set it to a language that the device uses
    // Happens when the config is null or we couldn't resolve the chosen language
    const locales = RNLocalize.getLocales();
    if(!locales.some((locale)=>{
      return storedLangs.some((storedLang)=>{
        if(storedLang.lang !== locale) return;
        lang = storedLang.lang;
        rtl = storedLang.rtl;
        return true;
      });
    })){
      const { languageTag } = RNLocalize.findBestAvailableLanguage(
        storedLangs.map((sL)=>(sL.lang)),
      );
      await setDiscoveredLang(languageTag);
    }
  }
  if(lang === void 0){
    // if we couldn't resolve the stored langauge
    // and we couldn't resolve the bestAvailableLanguage
    // we set it to enUS
    lang = defaultLang.lang;
    rtl = defaultLang.rtl;
  }

  // just in case rtl is not set, we set it to false
  I18nManager.forceRTL(rtl || false);
  const i18n = i18nCreator.createInstance();
  await i18n

  // We are no longer initializing react-i18next
  // because we are using the provider
  // we only want to initialize after loading the languages
  .use(initReactI18next)
  .init({
    resources: resources,
    lng: lang,
    fallbackLng: "en-US",
    interpolation: {
      escape: (v)=>(v),
    },
  });
  return i18n;
}
