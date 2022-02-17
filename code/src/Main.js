import "./polyfills";

import { SafeAreaView } from "react-native";
import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/Main.js"
const logger = new KeyedLogger(FILE_NAME)

console.log("================================")
console.log("================================")
console.log("================================")
logger.log("test log")
logger.info("test info")
logger.warn("test warn")
logger.error("test error")

import React, { useEffect, useState } from "react";

import { DEFAULT_LANG } from "./global-vars/constants";
import { UserContextProvider } from "./global-vars/user";
import { LanguageContextProvider, initializeI18Next } from "./global-vars/translation";
import { IapContextProvider, setupIap } from "./global-vars/iap";
import { MutedContextProvider, setupTrackPlayer } from "./global-vars/sound";
import { NavigatorContextProvider } from "./global-vars/navigator";

import { AppRoutes } from "./router/AppRoutes";
import { MenuWrapper } from "./router/MenuWrapper";
import { PATH_MAIN_MENU } from "./router/route-constants";

import { clearTmpDir } from "./global-vars/file-handler";

export function Main(){
  const [ready, setReady] = useState(false);
  useEffect(()=>{
    Promise.all([
      setupIap(),
      setupTrackPlayer(),
      clearTmpDir(),
      initializeI18Next(DEFAULT_LANG),
    ]).then(()=>{
      setReady(true);
    });
  }, []);
  if(!ready) return null;
  return (
    <SafeAreaView style={{ width: "100%", height: "100%" }}>
      <UserContextProvider>
      <LanguageContextProvider defaultLang={DEFAULT_LANG}>
      <IapContextProvider>
      <MutedContextProvider>
      <NavigatorContextProvider
        component={MenuWrapper}
        location={PATH_MAIN_MENU}
      >
        <MenuWrapper>
          <AppRoutes />
        </MenuWrapper>
      </NavigatorContextProvider>
      </MutedContextProvider>
      </IapContextProvider>
      </LanguageContextProvider>
      </UserContextProvider>
    </SafeAreaView>
  );
}
