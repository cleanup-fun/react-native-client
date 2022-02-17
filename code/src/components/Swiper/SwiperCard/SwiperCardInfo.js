
import { UNDEFINED } from "cleanupfun/src/global-vars/constants";

import React from "react";
import {
  Text,
  View,
} from "react-native";

import { styles } from "../styles";

import {
  TranslatedText, TranslatedTimestamp,
  useTranslate
} from "cleanupfun/src/global-vars/translation";

export function SwiperCardInfo({ fileItem }){
  const { t, tTimestamp } = useTranslate();
  const timestamp = fileItem.markedTimestamp;
  return (
    <View
      style={[styles.swiperCardInfo]}
    >
      <Text>{t("SWIPERCARD_FILE_NAME")}: {fileItem.filename}</Text>
      <Text>{t("SWIPERCARD_FILE_URI")}: {fileItem.fileuri}</Text>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TranslatedText tPath="SWIPERCARD_STORED_STATUS" />
        <Text>: </Text>
        <TranslatedTimestamp timestamp={timestamp} />
      </View>
      <Text>{t("SWIPERCARD_STORED_STATUS")}: {
        fileItem.shouldStore === UNDEFINED ? t("SWIPER_CARD_STORED_STATUS_NEW") :
        fileItem.shouldStore === true ? t("SWIPER_CARD_STORED_STATUS_STORED") :
        t("SWIPER_CARD_STORED_STATUS_SAVED")
      }</Text>
    </View>
  );
}
