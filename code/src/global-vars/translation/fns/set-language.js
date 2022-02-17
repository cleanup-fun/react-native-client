import { I18nManager } from "react-native";
import { resolveConfig, resolveUnloadedLang, updateConfig } from "./resolve";

export async function setLanguage(i18next, lang){
  // If we already have the resource, no need to go searching for it
  // we lazy load the translations. I don't know how big a single transaltion file is going to be
  // As a result we don't want to over burden the user by loading every single language
  // it may be a good idea to remove translations not in use, even enUS
  // but we can leave that for later
  if(i18next.hasResourceBundle(lang, "translations")){
    return i18next.changeLanguage(lang);
  }
  const translationConfig = await resolveConfig(i18next);

  // Since we aren't loading all the resources at once
  // we should check if it exists locally before retrieving it from the web
  var resource = await resolveUnloadedLang(lang);
  translationConfig.availLangs.push({
    lang: resource.lang,
    rtl: resource.rtl,
  });
  translationConfig.lang = lang;

  // just in case rtl is not set, we set it to false
  I18nManager.forceRTL(resource.rtl || false);
  await Promise.all([
    i18next.addResourceBundle(
      resource.lang, "translations", resource.translations, true, true,
    ),
    updateConfig(translationConfig),
  ]);
  return i18next.changeLanguage(resource.lang);
}
