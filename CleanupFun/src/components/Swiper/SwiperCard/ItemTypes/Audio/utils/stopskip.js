import TrackPlayer from "react-native-track-player";
import { QueuedResolver } from "cleanupfun/src/utils/QueuedResolver";

const queRes = new QueuedResolver();

export function stopTrackPlayer(){
  return queRes.wrap(()=>(
    TrackPlayer.stop()
  ));
}

export function skipTrackPlayer(index, mute){
  return queRes.wrap(async ()=>{
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if(currentTrack !== index){
      await TrackPlayer.skip(index);
    }
    if(mute) return;
    await TrackPlayer.play();
  });
}
