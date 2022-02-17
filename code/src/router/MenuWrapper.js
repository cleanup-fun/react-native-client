import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/pages/PaymentPage.js"
const logger = new KeyedLogger(FILE_NAME)

import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { useLocation } from "react-router-native";
import { useNavigator, useHistory } from "../global-vars/navigator";

import Hamburger from 'react-native-hamburger';

import { PATH_MAIN_MENU } from "./route-constants";

import { routeItems } from "./route-constants";


function MenuWrapper({ children }){
  const navigate = useNavigator();
  const history = useHistory();
  const { pathname } = useLocation();

  logger.log("current path:", pathname)
  logger.log("history:", history);
  return (
    <View style={{flex: 1}}>
      {
        (pathname === PATH_MAIN_MENU && history.length === 0) ? (
          null
        ) : (
          <View style={{ "flexDirection": "row", alignItems: "center" }}>
            <Hamburger
              active={pathname === PATH_MAIN_MENU}
              onPress={()=>{
                if(pathname === PATH_MAIN_MENU){
                  logger.log("go back")
                  navigate.back()
                } else {
                  logger.log("go to main menu");
                  navigate(PATH_MAIN_MENU)
                }
              }}
            />
            <Text style={{ flexGrow: 1, textAlign: "center" }}>{routeItems[pathname]?.title || "Cleanup Fun"}</Text>
            <MuteButton />
          </View>
        )
      }
      <View style={{flexGrow:1}}>{ children }</View>
    </View>
  );
}

export { MenuWrapper };
