import React, { useState, useEffect } from "react";

import { Alert } from "react-native";

import { PleaseWait } from "./PleaseWait";
import { Swiper } from "./Swiper/Swiper";
import { Advertisement } from "./Advertisement/Advertisement";

// fileItems is FileItemsAbstract see /src/database/file-items-abstract.js
function AdSwiperSwitcher({ fileItemsObject }){
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
            Alert.alert(
              "Error",
              e.message,
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
          }
        }}
      />
    )
  }

  return (
    <Swiper
      fileItems={fileItems}

      onSwipedRight={(index)=>{
        // right good, will save
        fileItemsObject.updateFileStatus(fileItems[index].fileuri, false)
        var newCards = [...fileItems];
        newCards[index].shouldStore = false;
        // hopefully it doesn't reset the cards
        setFileItems(newCards);
      }}

      onSwipedLeft={(index)=>{
        // left bad, will store
        fileItemsObject.updateFileStatus(fileItems[index].fileuri, true)
        var newCards = [...fileItems];
        newCards[index].shouldStore = true;
        // hopefully it doesn't reset the cards
        setFileItems(newCards);
      }}

      onLoadMoreCards={()=>{
        setShowAd(true);
      }}
      onNoMoreFiles={()=>{
        console.log("Finished");
        throw new Error("all done");
      }}
    />
  )


}


export { AdSwiperSwitcher };
