import React from "react";
import {
  Image,
} from "react-native";

import { styles } from "../../styles";

export function ImageItem({ fileuri }){
  console.log("displaying image:", fileuri);
  return (
    <Image
      style={[styles.swiperCardItem, { resizeMode: "contain" }]}
      source={{ uri: fileuri }}
    />
  );
}
