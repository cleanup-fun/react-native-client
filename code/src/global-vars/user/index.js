import React from "react";
import { Platform, NativeModules } from "react-native";
import { createContext, useContext, useState } from "react";
import { getUniqueId } from "react-native-device-info";
import { User } from "./user-class";
import { USER_ASYNC_STORAGE_KEY } from "../constants";
/*

Should probably allow the user to login and register
- Saving their language setting

*/
function getDeviceId(){
  switch(Platform.OS){
    case "ios": return NativeModules.SettingsManager.clientUniqueId;
    case "android": return NativeModules.PlatformConstants.fingerprint;
    default: {
      throw new Error("Cannot get the device id for this os");
    }
  }
}

const UserContext = createContext([true, ()=>{}]);

export function useUser(){
  return useContext(UserContext);
}

function UserContextProvider({ children }){
  const [user] = useState(new User(USER_ASYNC_STORAGE_KEY));
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContextProvider, UserContext };
