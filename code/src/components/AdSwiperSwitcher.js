import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/components/AdSwiperSwitcher.js";
const logger = new KeyedLogger(FILE_NAME);

import React, { useState, useEffect } from "react";

import { useNavigator } from "cleanupfun/src/global-vars/navigator";
import { PATH_MAIN_MENU } from "cleanupfun/src/router/route-constants";

import { Alert } from "react-native";

import { PleaseWait } from "./PleaseWait";
import { Swiper } from "./Swiper/Swiper";
import { Advertisement } from "./Advertisement/Advertisement";
import { useFileItems } from "../database/file-items/FileItemsContext";

// fileItems is FileItemsAbstract see /src/database/file-items-abstract.js
export function AdSwiperSwitcher({ onExit }){
  const navigate = useNavigator();

  const [loaded, setLoaded] = useState(false);
  const [showAd, setShowAd] = useState(true);
  const [activeItems, setActiveItems] = useState(void 0);
  const { fileItems, fileItemsObject, updateFileStatus } = useFileItems();
  // console.log("file items object:", typeof fileItemsObject);
  useEffect(()=>{
    if(!fileItemsObject) return console.log("no fileItems object");
    setShowAd(true);
    setLoaded(true);
    const el = (e)=>{
      Alert.alert(
        "Error",
        e.message || e.toString(),
        [{
          text: "OK",
          onPress: () => {
            logger.log("OK Pressed");
            onExit();
          }
        }]
      );
    };
    fileItemsObject.on("error", el);
    return ()=>(fileItemsObject.off("error", el));
  }, [fileItemsObject, onExit]);

  useEffect(()=>{
    if(showAd) return;
    if(fileItems === activeItems) return;
    setActiveItems(fileItems);
    setLoaded(true);
  }, [showAd, fileItems, activeItems]);

  if(!loaded){
    return (
      <PleaseWait />
    );
  }

  if(showAd){
    return (
      <Advertisement
        onFinish={async ()=>{
          setShowAd(false);
          setLoaded(false);

          try {
            await fileItemsObject.step();
          }catch(e){
            if(/user canceled the document picker/.test(e.message)){
              return onExit();
            }
          }
        }}
      />
    );
  }

  return (
    <Swiper
      fileItems={activeItems}

      onSwipedRight={(index)=>{
        // right good, will save
        updateFileStatus(fileItems[index].fileuri, false);
      }}

      onSwipedLeft={(index)=>{
        // left bad, will store
        updateFileStatus(fileItems[index].fileuri, true);
      }}

      onLoadMoreCards={()=>{
        setShowAd(true);
      }}
      onNoMoreFiles={()=>{
        logger.log("Finished");
        navigator.to(PATH_MAIN_MENU);
      }}
    />
  );
}
