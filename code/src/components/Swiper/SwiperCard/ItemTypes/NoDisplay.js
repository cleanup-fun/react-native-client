import React from "react";

import { Text } from "react-native";

import { TranslatedText } from "cleanupfun/src/global-vars/translation";

export function NoDisplayItem({ style, fileuri }){
  return (
    <TranslatedText
      style={{
        width: "100%",
        textAlign: "center"
      }}
      tPath="SWIPER_CARD_NO_DISPLAY_ITEM"
    />
  );
}
