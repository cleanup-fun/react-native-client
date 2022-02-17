
import React, { useRef, useContext, useEffect } from "react";
import { Platform } from "react-native";
import Video from "react-native-video";
import { MutedContext } from "cleanupfun/src/global-vars/sound";

import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/components/Swiper/SwiperCard/ItemTypes/Video.js";
const logger = new KeyedLogger(FILE_NAME);

import {
  useActiveItem,
} from "../../ActiveItemContext";

import { styles } from "../../styles";

const isFile = /^\//;

export function VideoItem({ fileuri, index }){
  const [activeItem] = useActiveItem();
  const active = index === activeItem;
  logger.log("video uri:", fileuri, active);
  const player = useRef();
  const [muted] = useContext(MutedContext);
  useEffect(()=>{
    if(!active){
      player.current.seek(0);
    }
  }, [player, active]);
  if(Platform.OS === "ios"){
    fileuri = fileuri.replace(/ /g, "%20");
  } else if(Platform.OS === "android"){
    if(isFile.test(fileuri)){
      fileuri = "file:/" + fileuri;
    }
  }
  logger.log("active:", fileuri);
  return (
    <Video
      source={{ uri: fileuri }}
      ref={player}
      autoplay={true}
      paused={!active}
      controls={true}
      muted={muted}
      style={styles.swiperCardItem}
      onEnd={()=>{
        player.current.seek(0);
      }}
      onError={(e)=>{
        logger.error("on error: ", e);
      }}
    />
  );
}
