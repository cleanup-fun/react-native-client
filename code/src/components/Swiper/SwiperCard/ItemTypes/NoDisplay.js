import React from "react";

import { Text } from "react-native";

import { translateKey } from "cleanupfun/src/global-vars/translation/translate.js";

export function NoDisplayItem({ style, fileuri }){
  return (
    <Text
      style={{
        width: "100%",
        textAlign: "center"
      }}
    >{translateKey("SWIPER_CARD_NO_DISPLAY_ITEM")}</Text>
  );
}
