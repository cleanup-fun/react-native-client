
import { UNDEFINED } from "cleanupfun/src/constants";

import React from "react";
import {
  Text,
  View,
} from "react-native";

import { TranslateableMoment } from "../../Reused/TranslatableMoment";

import { styles } from "../styles";

import { translateKey } from "cleanupfun/src/global-vars/translation/translate.js";

export function SwiperCardInfo({ fileItem }){
  return (
    <View
      style={[styles.swiperCardInfo]}
    >
      <Text>{translateKey("SWIPERCARD_FILE_NAME")}: {fileItem.filename}</Text>
      <Text>{translateKey("SWIPERCARD_FILE_URI")}: {fileItem.fileuri}</Text>
      <Text>{translateKey("SWIPERCARD_MARKED_TIMESTAMP")}: <TranslateableMoment timestamp={fileItem.markedTimestamp} /></Text>
      <Text>{translateKey("SWIPERCARD_STORED_STATUS")}: {
        fileItem.shouldStore === UNDEFINED ? translateKey("SWIPER_CARD_STORED_STATUS_NEW") :
        fileItem.shouldStore === true ? translateKey("SWIPER_CARD_STORED_STATUS_STORED") :
        translateKey("SWIPER_CARD_STORED_STATUS_SAVED")
      }</Text>
    </View>
  );
}
