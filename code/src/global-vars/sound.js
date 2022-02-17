import React from "react";
import { createContext, useContext, useState } from "react";

import TrackPlayer, { RepeatMode, Capability } from "react-native-track-player";

export async function setupTrackPlayer(){
  TrackPlayer.registerPlaybackService(() => (
    ()=>{
      TrackPlayer.addEventListener("remote-play", () => TrackPlayer.play());
      TrackPlayer.addEventListener("remote-pause", () => TrackPlayer.pause());
      TrackPlayer.addEventListener("remote-stop", () => TrackPlayer.stop());
    }
  ));

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

const MutedContext = createContext([true, ()=>{}]);

export function useMuted(){
  return useContext(MutedContext);
}

function MutedContextProvider({ children }){
  const [muted, setMuted] = useState(false);
  return (
    <MutedContext.Provider value={[muted, setMuted]}>
      {children}
    </MutedContext.Provider>
  );
}

export { MutedContextProvider, MutedContext };
