import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/pages/PaymentPage.js"
const logger = new KeyedLogger(FILE_NAME)

import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { useHistory, useParams, useNavigate, Outlet } from "react-router-native";
import { useNavigator } from "../global-vars/navigator";

import Hamburger from 'react-native-hamburger';

import { PATH_MAIN_MENU } from "./route-constants";

import { routeItems } from "./route-constants";

function MenuWrapper({ children }){
  const navigator = useNavigator();

  const currentPath = navigator.currentPath;
  const history = navigator.history;

  logger.log("current path:", currentPath)
  logger.log("history:", history);
  return (
    <View style={{flex: 1}}>
      {
        (currentPath === PATH_MAIN_MENU && history.length === 0) ? (
          null
        ) : (
          <View style={{ "flexDirection": "row", alignItems: "center" }}>
            <Hamburger
              active={currentPath === PATH_MAIN_MENU}
              onPress={()=>{
                if(currentPath === PATH_MAIN_MENU){
                  logger.log("go back")
                  navigator.back()
                } else {
                  logger.log("go to main menu");
                  navigator.to(PATH_MAIN_MENU)
                }
              }}
            />
            <Text style={{ flexGrow: 1, textAlign: "center" }}>{routeItems[currentPath]?.title || "Cleanup Fun"}</Text>
          </View>
        )
      }
      <View style={{flexGrow:1}}>{ children }</View>
    </View>
  );
}

export { MenuWrapper };
