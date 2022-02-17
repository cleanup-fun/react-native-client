import { Config } from "react-native-config";
import pkg from "cleanupfun/package.json";
import React, { useState, useEffect, createContext, useContext } from "react";

import { removeItem, replaceItem } from "../utils/array";

import Iaphub from "react-native-iaphub";
import { UserContext } from "./user";

export const IapContext = createContext();

export function IapContextProvider({ children }){
  const user = useContext(UserContext);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [pendingPurchases, setPendingPurchases] = useState([]);
  const [activeProducts, setActiveProducts] = useState([]);
  const [productsForSale, setProductsForSale] = useState([]);

  // useEffect(()=>{
  //   setupIap().then(()=>{
  //     setIapHubInit(true);
  //   });
  // }, []);

  useEffect(()=>{
    // if(!iapHubInit) return;
    const ls = [
      user.listenToSignIn(()=>{
        console.log("user in inapp purchases:", user);
        if(!user || !user.id){
          console.log("no user in iap");
          return;
        }
        Iaphub.setUserId(user.iaphubId);
        setUserLoggedIn(true);
      }, true),
      user.listenToSignOut(()=>{
        Iaphub.setUserId("-");
        setUserLoggedIn(false);
      }, true),
    ];
    return ()=>(
      ls.map((l)=>(l()))
    );
  }, [user]);
  useEffect(()=>{
    if(!userLoggedIn){
      setActiveProducts([]);
      setProductsForSale([]);
      return;
    }
    function l(){
      Iaphub.getActiveProducts().then((ps)=>{
        setActiveProducts(ps);
      });
      Iaphub.getProductsForSale().then((ps)=>{
        setProductsForSale(ps);
      });
    }
    Iaphub.addEventListener("onUserUpdate", l);
    l();
    return ()=>{
      Iaphub.removeEventListener("onUserUpdate", l);
    };
  }, [userLoggedIn]);

  return (
    <IapContext.Provider value={
      !userLoggedIn ? {
        pendingPurchases: [],
        activeProducts: [],
        productsForSale: [],
        buy: async ()=>{},
      } : {
        pendingPurchases: [...pendingPurchases],
        activeProducts: [...activeProducts],
        productsForSale: [...productsForSale],
        buy: (product, delay)=>{
          if(typeof delay !== "number") delay = 4 * 1000;
          return buy(product, delay, pendingPurchases, setPendingPurchases);
        },
      }
    }>
      { children }
    </IapContext.Provider>
  );
}

export async function setupIap(){
  await Iaphub.init({

    // The app id is available on the settings page of your app
    appId: Config.IAP_HUB_APPID,

    // The (client) api key is available on the settings page of your app
    apiKey: Config.IAP_HUB_APIKEY,

    // App environment (production by default, other environments must be created on the IAPHUB dashboard)
    environment: getEnv(),
  });

  await Iaphub.setDeviceParams({
    appVersion: pkg.version,
  });
}

const skuTestFactory = (sku)=>(
  (oP)=>(oP.sku === sku)
);

export function buy(product, delay, pendingPurchases, setPendingPurchases){
  const sku = product.sku;
  const skuTest = skuTestFactory(sku);
  if(pendingPurchases.some(skuTest)){
    throw new Error("Already Purchasing this product");
  }
  function updateOrRemove(status, result){
    if(delay === 0){
      removeItem(pendingPurchases, skuTest);
      setPendingPurchases(pendingPurchases);
      return;
    }
    replaceItem(
      pendingPurchases, {
        ...product,
        purchaseStatus: status,
        result: result,
      }, skuTest,
    );
    setPendingPurchases(pendingPurchases);
    setTimeout(()=>{
      removeItem(pendingPurchases, skuTest);
      setPendingPurchases(pendingPurchases);
    }, delay);
  }

  setPendingPurchases(
    pendingPurchases.concat([{ ...product, purchaseStatus: 0 }]),
  );
  const p = Iaphub.buy(sku);
  p.then((transaction)=>{
    updateOrRemove(1,
      transaction.webhookStatus === "failed" ? (
        IAP_BUY_RESULTS.WEBHOOK_FAILED
      ) : (
        IAP_BUY_RESULTS.NO_ISSUE
      ),
    );
  }, (err)=>{
    updateOrRemove(-1,
      err.code in IAP_ERROR_MAP ? IAP_ERROR_MAP[err.code] : UNKNOWN_ERROR,
    );
  });
  return p;
}

export const IAP_BUY_RESULTS = {
  NO_ISSUE: "NO_ISSUE",
  WEBHOOK_FAILED: "WEBHOOK_FAILED",
  USER_CANCELED: "user_cancelled",
  ALREADY_OWN: "product_already_owned",
  DEFERRED_PAYMENT: "deferred_payment",
  REC_VAL_FAIL: "receipt_validation_failed",
  REC_REQ_FAIL: "receipt_request_failed",
  HAVE_SUB: "cross_platform_conflict",
  USR_CONF: "user_conflict",
};

const UNKNOWN_ERROR = "UNKOWN";

const IAP_ERROR_MAP = {
  user_cancelled: "USER_CANCELED",
  product_already_owned: "ALREADY_OWN",
  deferred_payment: "DEFERRED_PAYMENT",
  receipt_validation_failed: "REC_VAL_FAIL",
  receipt_request_failed: "REC_REQ_FAIL",
  cross_platform_conflict: "HAVE_SUB",
  user_conflict: "USR_CONF",
};

function getEnv(){
  switch(Config.ENV){
    case "dev": return "development";
    case "stage": return "staging";
    case "prod": return "production";
    default: {
      throw new Error("invalid env set: " + Config.ENV);
    }
  }
}
