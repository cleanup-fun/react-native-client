
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
