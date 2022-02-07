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

// fileItems is FileItemsAbstract see /src/database/file-items-abstract.js
export function AdSwiperSwitcher({ fileItemsObject, onExit }){
  const navigator = useNavigator();

  const [loaded, setLoaded] = useState(false);
  const [showAd, setShowAd] = useState(true);
  const [fileItems, setFileItems] = useState([]);
  useEffect(()=>{
    setShowAd(true);
    setLoaded(true);
  }, [fileItemsObject])

  if(!loaded){
    return (
      <PleaseWait />
    )
  }

  if(showAd){
    return (
      <Advertisement
        onFinish={async ()=>{
          setShowAd(false);
          setLoaded(false);

          try {
            const nextTen = await fileItemsObject.getNextTen()
            setFileItems(nextTen);
            setLoaded(true);
          }catch(e){
            if(/user canceled the document picker/.test(e.message)){
              return onExit();
            }
            Alert.alert(
              "Error",
              e.message,
              [
                {
                  text: "OK",
                  onPress: () => {
                    logger.log("OK Pressed");
                    onExit();
                  }
                },
              ]
            );
          }
        }}
      />
    );
  }

  return (
    <Swiper
      fileItems={fileItems}

      onSwipedRight={(index)=>{
        // right good, will save
        fileItemsObject.updateFileStatus(fileItems[index].fileuri, false);
        var newCards = [...fileItems];
        newCards[index].shouldStore = false;
        // hopefully it doesn't reset the cards
        setFileItems(newCards);
      }}

      onSwipedLeft={(index)=>{
        // left bad, will store
        fileItemsObject.updateFileStatus(fileItems[index].fileuri, true);
        var newCards = [...fileItems];
        newCards[index].shouldStore = true;
        // hopefully it doesn't reset the cards
        setFileItems(newCards);
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
