import { Platform } from "react-native";
import TrackPlayer from "react-native-track-player";
import { QueuedResolver } from "cleanupfun/src/utils/QueuedResolver";

const queRes = new QueuedResolver();

export async function addTrack(track, index){
  if(Platform.OS === "android") return TrackPlayer.add(track, index);
  if(typeof index === "number"){
    return queRes.wrap(async ()=>{
      await TrackPlayer.add(track, index);
      return index;
    });
  }
  return queRes.wrap(async ()=>{
    const q = await TrackPlayer.getQueue();
    await TrackPlayer.add(track);
    return q.length;
  });
}
