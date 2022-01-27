import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/components/Swiper/SwiperCard/ItemTypes/Audio/PositionSlider";
const logger = new KeyedLogger(FILE_NAME);

import React from "react";
import { Text, View } from "react-native";
import TrackPlayer, { useProgress } from "react-native-track-player";
import Slider from "@react-native-community/slider";
import { styles } from "./styles";

export function PositionSlider(){
  const {
    progrsBarSection,
  } = styles;

  const { position, buffered, duration } = useProgress();

  const displayDuration = Math.floor(
    duration > buffered ? duration : buffered,
  );

  return (
    <View style={progrsBarSection}>
      <Text>{secondsToHHMMSS(Math.floor(position || 0))}</Text>
      <Slider
        style={{ width: "70%", height: 40 }}
        minimumValue={0}
        maximumValue={displayDuration}
        minimumTrackTintColor="#52527a"
        maximumTrackTintColor="#52527a"
        thumbTintColor="#52527a"
        value={position}
        onSlidingComplete={(newPosition)=>{
          TrackPlayer.seekTo(newPosition);
        }}
      />
    <Text>{secondsToHHMMSS(displayDuration)}</Text>
    </View>
  );
}

function secondsToHHMMSS(seconds){
  // credits - https://stackoverflow.com/a/37096512
  seconds = Number(seconds);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);

  const hrs = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : "";
  const mins = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : "00:";
  const scnds = s > 0 ? (s < 10 ? `0${s}` : s) : "00";
  return `${hrs}${mins}${scnds}`;
}
