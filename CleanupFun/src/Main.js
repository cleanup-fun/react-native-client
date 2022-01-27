import { SafeAreaView } from "react-native";
import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/Main.js"
const logger = new KeyedLogger(FILE_NAME)

console.log("================================")
console.log("================================")
console.log("================================")
logger.log("test log")
logger.info("test info")
logger.warn("test warn")
logger.error("test error")


import React, { useEffect } from "react";

import { LanguageContextProvider } from "./global-vars/translation/translate";
import { MutedContextProvider } from "./global-vars/muted";
import { NativeRouter } from "react-router-native";

import TrackPlayer, { RepeatMode, Capability } from "react-native-track-player";

import { AppRoutes } from "./router/AppRoutes";
import { MenuWrapper } from "./router/MenuWrapper";
import { PATH_MAIN_MENU } from "./router/route-constants";

import { clearTmpDir } from "./global-vars/file-handler";

TrackPlayer.registerPlaybackService(() => (
  ()=>{
    TrackPlayer.addEventListener("remote-play", () => TrackPlayer.play());
    TrackPlayer.addEventListener("remote-pause", () => TrackPlayer.pause());
    TrackPlayer.addEventListener("remote-stop", () => {
      logger.log("remote stop");
      TrackPlayer.stop();
    });
  }
));

export function Main(){
  useEffect(()=>{
    Promise.all([
      setupTrackPlayer(),
      clearTmpDir(),
    ]);
  }, []);
  return (
    <SafeAreaView style={{ width: "100%", height: "100%" }}>
      <MutedContextProvider>
      <LanguageContextProvider>
      <NativeRouter component={MenuWrapper} location={PATH_MAIN_MENU}>
        <MenuWrapper>
          <AppRoutes />
        </MenuWrapper>
      </NativeRouter>
      </LanguageContextProvider>
      </MutedContextProvider>
    </SafeAreaView>
  );
}

async function setupTrackPlayer(){
  // if app was relaunched and music was already playing, we don't setup again.
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if(currentTrack !== null){
    return;
  }

  await TrackPlayer.setupPlayer({});
  await TrackPlayer.updateOptions({
    stopWithApp: false,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.Stop,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
  });

  TrackPlayer.setRepeatMode(RepeatMode.Track);
}
