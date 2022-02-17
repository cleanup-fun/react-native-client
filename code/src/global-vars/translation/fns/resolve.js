import AsyncStorage from "@react-native-async-storage/async-storage";

import { TRANSLATION_BASE_ASYNC_STORAGE_KEY } from "../../constants";

export async function resolveSelectableLanguages(){
  return [{
    title: "English (USA)",
    flag: "🇺🇸",
    lang: "en-US",
  }];
}

export function getConfig(){
  return AsyncStorage.getItem(
    TRANSLATION_BASE_ASYNC_STORAGE_KEY,
  );
}

export async function resolveConfig(i18next){
  const config = getConfig();
  if(config !== null) return JSON.parse(config);

  return {
    lang: i18next.resolvedLanguage,
    availLangs: i18next.languages.map((i18nLang)=>{
      return {
        lang: i18nLang,
        rtl: i18next.dir(i18nLang),
      };
    }),
  };
}

export function updateConfig(newConfig){
  return AsyncStorage.setItem(
    TRANSLATION_BASE_ASYNC_STORAGE_KEY, JSON.stringify(newConfig),
  );
}

export async function resolveUnloadedLang(lang){
  var resource = await AsyncStorage.getItem(
    TRANSLATION_BASE_ASYNC_STORAGE_KEY + "/" + lang,
  );
  if(!resource) resource = await loadFromGithub(lang);
  if(!resource) throw new Error("translation not found");
}

async function loadFromGithub(){
  // https://stackoverflow.com/questions/18126559/how-can-i-download-a-single-raw-file-from-a-private-github-repo-using-the-comman
  // We may need to use my server as a proxy
  // I don't want clients to know my api key
  // And I don't think this requires oAuth
  // Although perhaps it's a good idea to have users login as a github user
  // This way we can support github and possibly get more translators
  // regardless, we'll leave this empty for now
}
