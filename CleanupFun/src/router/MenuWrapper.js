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

  console.log("current path:", currentPath)
  console.log("history:", history);
  return (
    <View style={{flex: 1}}>
      {
        (currentPath === PATH_MAIN_MENU && history.length === 0) ? (
          null
        ) : (
          <View>
            <Hamburger
              active={currentPath === PATH_MAIN_MENU}
              onPress={()=>{
                if(currentPath === PATH_MAIN_MENU){
                  console.log("go back")
                  navigator.back()
                } else {
                  console.log("go to main menu");
                  navigator.to(PATH_MAIN_MENU)
                }
              }}
            />
            <Text>{routeItems[currentPath]?.title || "Cleanup Fun"}</Text>
          </View>
        )
      }
      <View style={{flexGrow:1}}>{ children }</View>
    </View>
  );
}

export { MenuWrapper };
