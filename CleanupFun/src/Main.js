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


import React, {useState} from "react";

import { LanguageContextProvider } from "./global-vars/translation/translate";

import { NativeRouter } from "react-router-native";

import { AppRoutes } from "./router/AppRoutes"
import { MenuWrapper } from "./router/MenuWrapper";
import { PATH_MAIN_MENU, } from "./router/route-constants";

function Main(){
  return (
    <LanguageContextProvider>
      <NativeRouter component={MenuWrapper} location={PATH_MAIN_MENU}>
        <MenuWrapper>
          <AppRoutes />
        </MenuWrapper>
      </NativeRouter>
    </LanguageContextProvider>
  )
}


export { Main }
