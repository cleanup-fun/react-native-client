import React, { useContext, useState, useEffect } from "react";

import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/components/Swiper/SwiperCard/ItemTypes/Audio/SeekPausePlay";
const logger = new KeyedLogger(FILE_NAME);

import { TouchableOpacity, View, Image } from "react-native";
import TrackPlayer, { State as TrackPlayerState, useProgress } from "react-native-track-player";
import { styles } from "./styles";

import { MutedContext } from "cleanupfun/src/global-vars/muted";

export function SeekPausePlay(){
  const {
    buttonsSection,
    buttonsCol,
    playPauseButton,
  } = styles;

  const [muted, setMuted] = useContext(MutedContext);
  const [goBack, setGoBack] = useState(void 0);
  const [goForw, setGoForw] = useState(void 0);
  const { position } = useProgress();

  useEffect(()=>{
    if(!goBack) return;
    TrackPlayer.seekTo(position - 10);
  }, [position, goBack]);
  useEffect(()=>{
    if(!goForw) return;
    TrackPlayer.seekTo(position + 10);
  }, [position, goForw]);

  return (
    <View style={buttonsSection}>
      <View style={[buttonsCol, { alignItems: "flex-end" }]}>
        <TouchableOpacity
            onPressIn={() =>{
              setGoBack(true);
            }}
            onPressOut={()=>{
              setGoBack(false);
            }}
          >
          <Image
            source={require("cleanupfun/assets/audio-player/backward.png")}
            style={{
              height: 18,
              width: 18,
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={buttonsCol}>
        <TouchableOpacity
          onPress={async ()=>{
            const state = await TrackPlayer.getState();
            logger.log(
              "Is Playing?", state,
              TrackPlayerState.Playing,
              TrackPlayerState.Paused,
            );

            if(state === TrackPlayerState.Playing){
              setMuted(true);
            }

            if(state === TrackPlayerState.Paused){
              setMuted(false);
            }
          }}
          style={playPauseButton}
        >
          {
            muted ? (
              <Image
                source={require("cleanupfun/assets/audio-player/play.png")}
                style={{
                  height: 14,
                  width: 14,
                  resizeMode: "contain",
                }}
              />
            ) : (
              <Image
                source={require("cleanupfun/assets/audio-player/pause.png")}
                style={{
                  height: 14,
                  width: 14,
                  resizeMode: "contain",
                }}
              />
            )
          }
        </TouchableOpacity>
      </View>
      <View style={[buttonsCol, { alignItems: "flex-start" }]}>
        <TouchableOpacity
          onPressIn={() =>{
            setGoForw(true);
          }}
          onPressOut={()=>{
            setGoForw(false);
          }}
        >
          <Image
            source={require("cleanupfun/assets/audio-player/forward.png")}
            style={{
              height: 18,
              width: 18,
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
