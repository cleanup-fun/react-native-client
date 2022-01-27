
import React from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";

export function TrackInfo({ track }){
  const {
    topSection,
    trackArtBox,
    trackArt,
    trackDesc,
    trackTitle,
    trackSubtitle,
  } = styles;

  const artImg = track.artwork || `https://picsum.photos/150/200/?random=${Math.random()}`;

  return (
    <View style={topSection}>
      <View style={trackArtBox}>
        <Image style={trackArt} source={{ uri: artImg }} />
      </View>
      <View style={trackDesc}>
        <View>
          <Text style={trackTitle}>{track.title}</Text>
        </View>
        <View>
          <Text style={trackSubtitle}>
            {track.artist || track.album || "unknown"}
          </Text>
        </View>
      </View>
    </View>
  );
}
