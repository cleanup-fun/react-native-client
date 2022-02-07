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


import React, { useEffect } from "react";

import { UserContextProvider } from "./global-vars/user";
import { LanguageContextProvider } from "./global-vars/translation/translate";
import { IapContextProvider, setupIap } from "./global-vars/iap";
import { MutedContextProvider, setupTrackPlayer } from "./global-vars/sound";
import { NativeRouter } from "react-router-native";

import { AppRoutes } from "./router/AppRoutes";
import { MenuWrapper } from "./router/MenuWrapper";
import { PATH_MAIN_MENU } from "./router/route-constants";

import { clearTmpDir } from "./global-vars/file-handler";

export function Main(){
  useEffect(()=>{
    Promise.all([
      setupIap(),
      setupTrackPlayer(),
      clearTmpDir(),
    ]);
  }, []);
  return (
    <SafeAreaView style={{ width: "100%", height: "100%" }}>
      <UserContextProvider>
      <LanguageContextProvider>
      <IapContextProvider>
      <MutedContextProvider>
      <NativeRouter component={MenuWrapper} location={PATH_MAIN_MENU}>
        <MenuWrapper>
          <AppRoutes />
        </MenuWrapper>
      </NativeRouter>
      </MutedContextProvider>
      </IapContextProvider>
      </LanguageContextProvider>
      </UserContextProvider>
    </SafeAreaView>
  );
}
