import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/components/Swiper/SwiperCard/ItemTypes/Audio";
const logger = new KeyedLogger(FILE_NAME);

import React, { useEffect, useState, useContext, useRef } from "react";
import { View } from "react-native";
import TrackPlayer from "react-native-track-player";
import { addTrack } from "./utils/addTrack";
import { stopTrackPlayer, skipTrackPlayer } from "./utils/stopskip";

import { usePrevious }  from "cleanupfun/src/utils/usePrevious";
import { styles as audioStyles } from "./styles";
import { styles as swiperStyles } from "../../../styles";

import { MutedContext } from "cleanupfun/src/global-vars/muted";

import { PositionSlider } from "./PositionSlider";
import { SeekPausePlay } from "./SeekPausePlay";

/*
Thank you
https://medium.com/@bharat.tiwari/creating-an-audio-player-in-react-native-2628c4262db4

*/

export function AudioItemEmpty(){
  useEffect(()=>{
    TrackPlayer.getQueue().then((q)=>{
      logger.log("queue:", q);
    });
  }, []);
  return null;
}

export function AudioItem({ fileuri, active }){

  const prevActiveRef = useRef(false);
  const [muted] = useContext(MutedContext);
  const [itemIndex, setItemIndex] = useState(null);

  // Used to add the track on mount
  // And remove the track on unmount
  useEffect(() => {
    if(itemIndex !== null) return;

    // If you wan't to understand the track object, here
    // https://react-native-track-player.js.org/documentation/#track-object
    addTrack({
      id: fileuri,
      url: fileuri,
      title: fileuri.split("/").pop(),
      artist: "Unknown",
    }).then((index)=>{
      setItemIndex(index);
    });
  }, [fileuri, itemIndex]);

  useEffect(()=>{
    // When the component unloads, we we are the track player, we stop
    // This should be handled by trackplayer.destroy() but it might not
    // particularly when the swiper gets a new set of file items
    // I believe listening to the fileitems update was causing issues
    return ()=>{
      if(itemIndex === null) return;
      if(active) TrackPlayer.stop();
    };
  }, [itemIndex, active]);

  useEffect(()=>{
    // Whenever mute is triggered we want to pause the current item
    logger.log("attempting to play");

    // if we don't have an item index, we can't compare against the currentTrack
    if(itemIndex === null) return logger.log("item index not set yet");

    const prevActive = prevActiveRef.current;

    // If we are still inactive or active
    if(prevActive === active){
      // If we are inactive, we shouldn't have control
      if(!active) return logger.log("was and is inactive");

      if(muted){
        // if the context is muted, we should pause
        logger.log("is active and should pause");
        TrackPlayer.pause();
      } else {
        // Else play
        logger.log("is active and should play");
        TrackPlayer.play();
      }
      return;
    }

    if(prevActive){
      // if we used to be active then we should stop the current player
      logger.log("used to be active but now should stop");
      stopTrackPlayer();
    } else {
      // Otherwise we should skip to our index and play
      logger.log("used to be inactive but now should skip and play");
      skipTrackPlayer(itemIndex, muted);
    }

    prevActiveRef.current = active;

  }, [active, itemIndex, muted]);

  return (
    <View style={[swiperStyles.swiperCardItem, { justifyContent: "center" }]}>
      <PositionSlider />
      <SeekPausePlay />
    </View>
  );
}
