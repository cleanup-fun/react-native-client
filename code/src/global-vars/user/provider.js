import React from "react";
import { Platform, NativeModules } from "react-native";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { getUniqueId } from "react-native-device-info";
import { User } from "./user-class";
import { USER_ASYNC_STORAGE_KEY } from "../constants";
import { fetch, Headers } from "react-native-fetch-api";
import { EventEmitter } from "events";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CLEANUP_FUN_API_ORIGIN, SAFE_MAX_NUMBER_VALUE,
} from "../constants";
import { QueuedResolver } from "../../utils/QueuedResolver";


function UserContextProviderOld({ children, refreshInterval, userPath }){
  userPath = userPath || USER_ASYNC_STORAGE_KEY;
  const qr = useMemo(()=>(new QueuedResolver()), []);
  const emitter = useMemo(()=>(new EventEmitter()), []);
  refreshInterval = Math.min(
    Math.max(refreshInterval || 0, 0),
    SAFE_MAX_NUMBER_VALUE,
  );
  const [token, setToken] = useState(void 0);
  const [info, setInfo] = useState(void 0);
  const [refreshTimeout, setRefreshTimeout] = useState(void 0);

  useEffect(()=>{
    qr.wrap(async ()=>{
      const jwtMaybe = await AsyncStorage.getItem(userPath);
      if(jwtMaybe === null) return;
      const json = JSON.parse(jwtMaybe);
      if(json.token.expiration <= Date.now() + (15 * 1000)) return;
      signInHidden(json);
    });
  }, [qr, signInHidden, userPath]);

  const user = {
    get isLoggedIn(){ return !!token; },
    get iaphubId(){ return !info ? "" : info.iaphubId; },
    get id(){ return !info ? "" : info.userId; },
    get email(){ return !info ? "" : info.email; },
    listenToSignIn(l){
      emitter.on("sign in", l);
      return ()=>(emitter.off("sign in", l));
    },
    listenToSignOut(l){
      emitter.on("sign out", l);
      return ()=>(emitter.off("sign out", l));
    },
    fetch(url, options){
      return this.qr.wrap(()=>{
        return fetchHidden(url, options);
      });
    },
    fetchJSON(url, options){
      return this.qr.wrap(async ()=>{
        return fetchJSONHidden(url, options);
      });
    },
    registerOrForgot({ email }){
      return qr.wrap(async ()=>{
        await signOutHidden();
        return await fetchJSONHidden(
          "/user/register-or-forgot",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              email,
            }),
          },
        );
      });
    },
    resetPassword({ email, code, password, repeatedPassword }){
      return qr.wrap(async ()=>{
        await signOutHidden();
        const json = await fetchJSONHidden(
          "/user/reset-password",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              email, code, password, repeatedPassword,
            }),
          },
        );
        return signInHidden(json);
      });
    },
    login({ email, password }){
      return qr.wrap(async ()=>{
        await signOutHidden();
        console.log("about to log in:", email, password);
        const json = await fetchJSONHidden(
          "/user/login",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              email, password,
            }),
          },
        );
        return signInHidden(json);
      });
    },
    refreshToken: ()=>{
      return refreshToken(info)
    },
    changeName({ name }){
      return qr.wrap(async ()=>{
        return fetchJSONHidden(
          "/user/change-name",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              name,
            }),
          },
        );
      });
    },
    changePassword({ originalPassword, password, repeatedPassword }){
      return qr.wrap(async ()=>{
        return fetchJSONHidden(
          "/user/change-password",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              originalPassword, password, repeatedPassword,
            }),
          },
        );
      });
    },
    signOut(){ return qr.wrap(()=>(signOutHidden())); },
  };

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

class HiddenUser {
  async signIn({ token, info }, reactInfo){
    const { setInfo, emitter, } = reactInfo;
    console.log("signing in:", token, info);
    setInfo(info);
    await this.handleJWT({ token, info });
    emitter.emit("sign in");
    return info;
  }
  async handleJWT({ token, info }, reactInfo){
    const {
      setToken, userPath,
      refreshInterval, setRefreshTimeout
    } = reactInfo;
    setToken(token);
    await AsyncStorage.setItem(userPath, JSON.stringify({
      token: token,
      info: info,
    }));
    const refresh = refreshInterval || (token.expiration - Date.now());
    if(refresh > SAFE_MAX_NUMBER_VALUE) return;
    setRefreshTimeout(setTimeout(()=>{
      this.refreshToken(info, reactInfo);
    }, refresh));
  }
  async refreshToken(info, reactInfo){
    const {
      setToken, userPath,
      refreshInterval, setRefreshTimeout,
      qr, refreshTimeout
    } = reactInfo;
    return qr.wrap(async ()=>{
      clearTimeout(refreshTimeout);
      const token = await fetchJSONHidden(
        "/user/refresh-token",
      );
      return this.handleJWTHidden({ token, info }, reactInfo);
    });
  }

  async fetchJSONHidden(url, options){
    const resp = await fetchHidden(token, url, options);
    console.log("resp came back");
    const json = await resp.json();
    if(resp.status >= 200 && resp.status < 300) return json;
    throw json;
  }

  fetchHidden(url, options){
    url = CLEANUP_FUN_API_ORIGIN + url;
    console.log("about to fetch:", url, options);
    if(!token){
      return fetch(url, options);
    }
    if(!options){
      options = {};
    }
    console.log(token);
    options.headers = new Headers(options.headers);
    options.headers.set("authorization", "Bearer " + token.token);
    return fetch(url, options);
  }
  async signOutHidden(){
    if(!token) return;

    // Done so that we can wrap the external signout
    clearTimeout(refreshTimeout);
    setToken(void 0);
    setInfo(void 0);
    await AsyncStorage.removeItem(userPath);
    emitter.emit("sign out");
  }
}
