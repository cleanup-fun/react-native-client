import React from "react";
import { Platform, NativeModules } from "react-native";
import { createContext, useState } from "react";

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

function UserContextProvider({ children }){
  const [user, setUser] = useState({
    id: getDeviceId(),
  });
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContextProvider, UserContext };
