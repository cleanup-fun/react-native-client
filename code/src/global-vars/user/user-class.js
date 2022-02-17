import { fetch, Headers } from "react-native-fetch-api";
import { EventEmitter } from "events";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CLEANUP_FUN_API_ORIGIN, SAFE_MAX_NUMBER_VALUE,
} from "../constants";
import { QueuedResolver } from "../../utils/QueuedResolver";

const SYM_HANDLE_JWT = Symbol("handle jwt");
const SYM_SIGN_IN = Symbol("sign in");
const SYM_SIGN_OUT = Symbol("sign out");
const SYM_FETCH = Symbol("fetch");
const SYM_FETCH_JSON = Symbol("fetch json");

export class User extends EventEmitter {
  get isLoggedIn(){
    return !!(this.token);
  }
  get iaphubId(){
    return !(this.info) ? "" : this.info.iaphubId;
  }
  get id(){
    return !(this.info) ? "" : this.info.userId;
  }
  get email(){
    return !(this.info) ? "" : this.info.email;
  }
  constructor(userPath, refreshInterval){
    super();
    this.qr = new QueuedResolver();
    this.userPath = userPath;
    this.refreshInterval = Math.min(
      Math.max(refreshInterval || 0, 0),
      SAFE_MAX_NUMBER_VALUE,
    );
    this.qr.wrap(async ()=>{
      console.log("start constructor");
      const jwtMaybe = await AsyncStorage.getItem(userPath);
      console.log("retrieved jwt", jwtMaybe);
      if(jwtMaybe === null) return;
      const json = JSON.parse(jwtMaybe);
      console.log("parsed jwt", json);
      if(json.token.expiration <= Date.now() + (15 * 1000)) return;
      console.log("token is still good", json);
      this[SYM_SIGN_IN](json);
    });
  }
  listenToSignIn(l, triggerIfSignedIn){
    this.on("sign in", l);
    triggerIfSignedIn && this.isLoggedIn && l();
    return ()=>(this.off("sign in", l));
  }
  listenToSignOut(l, triggerIfSignedOut){
    this.on("sign out", l);
    triggerIfSignedOut && (!this.isLoggedIn) && l();
    return ()=>(this.off("sign out", l));
  }
  async [SYM_FETCH](url, options){
    url = CLEANUP_FUN_API_ORIGIN + url;
    console.log("about to fetch:", url, options);
    if(!this.token){
      throw new Error("in order to fetch, you need to be authenticated");
    }
    if(!options){
      options = {};
    }
    console.log(this.token);
    options.headers = new Headers(options.headers);
    options.headers.set("authorization", "Bearer " + this.token.token);
    return fetch(url, options);
  }
  [SYM_FETCH_JSON](url, options){
    return jsonResponse(this[SYM_FETCH](url, options));
  }
  async fetch(url, options){
    // we only await the promise so that we can make multiple requests at the same time
    // we should only be waiting the user to resolve whether signed in or out
    await this.qr.promise;
    return this[SYM_FETCH](url, options);
  }
  async fetchJSON(url, options){
    // we only await the promise so that we can make multiple requests at the same time
    // we should only be waiting the user to resolve whether signed in or out
    await this.qr.promise;
    return this[SYM_FETCH_JSON](url, options);
  }
  async refreshToken(){
    return this.qr.wrap(async ()=>{
      const token = await this[SYM_FETCH_JSON](
        "/user/refresh-token",
      );
      this[SYM_HANDLE_JWT]({ token });
    });
  }
  registerOrForgot({ email }){
    return this.qr.wrap(async ()=>{
      await this[SYM_SIGN_OUT]();
      return fetchJSON(
        "/user/register-or-forgot", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
    });
  }
  resetPassword({ email, code, password, repeatedPassword }){
    return this.qr.wrap(async ()=>{
      await this[SYM_SIGN_OUT]();
      const json = await fetchJSON(
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
      return this[SYM_SIGN_IN](json);
    });
  }
  login({ email, password }){
    return this.qr.wrap(async ()=>{
      await this[SYM_SIGN_OUT]();
      console.log("about to log in:", email, password);
      const json = await fetchJSON(
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
      return this[SYM_SIGN_IN](json);
    });
  }
  changeName({ name }){
    return this.qr.wrap(async ()=>{
      return this[SYM_FETCH_JSON](
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
  }
  changePassword({ originalPassword, password, repeatedPassword }){
    return this.qr.wrap(async ()=>{
      return this[SYM_FETCH_JSON](
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
  }
  signOut(){
    // perhaps
    return this.qr.wrap(()=>{
      return this[SYM_SIGN_OUT]();
    });
  }
  async [SYM_SIGN_OUT](){
    if(!this.token) return;

    // Done so that we can wrap the external signout
    clearTimeout(this.refreshTimeout);
    this.token = void 0;
    this.info = void 0;
    await AsyncStorage.removeItem(this.userPath);
    this.emit("sign out");
  }
  async [SYM_SIGN_IN]({ token, info }){
    console.log("signing in:", token, info);
    await this[SYM_HANDLE_JWT]({ token, info });
    this.emit("sign in");
    return this.info;
  }
  async [SYM_HANDLE_JWT]({ token, info }){
    this.token = token;
    this.info = info || this.info;
    await AsyncStorage.setItem(this.userPath, JSON.stringify({
      token: this.token,
      info: this.info,
    }));
    const refresh = this.refreshInterval || (token.expiration - Date.now());
    if(refresh > SAFE_MAX_NUMBER_VALUE) return;
    this.refreshTimeout = setTimeout(()=>{
      this.refreshToken();
    }, refresh);
  }
}

async function fetchJSON(url, options){
  return jsonResponse(fetch(url, options));
}

async function jsonResponse(p){
  const resp = await p;
  console.log("resp came back");
  const json = await resp.json();
  if(resp.status >= 200 && resp.status < 300) return json;
  throw json;
}
