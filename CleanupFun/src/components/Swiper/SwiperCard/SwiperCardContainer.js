import { UNDEFINED } from "cleanupfun/src/constants";

import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/components/Swiper/SwiperCardContainer.js";
const logger = new KeyedLogger(FILE_NAME);

import React, { useState } from "react";
import { Card } from "react-native-card-stack-swiper";
import {
  Image,
  TouchableOpacity,
  View,
} from "react-native";

import { TranslateableMoment } from "../Reused/TranslatableMoment";

import { openFile, viewFile } from "cleanupfun/src/global-vars/file-handler";
import RNFS from "react-native-fs";

import { styles } from "../styles";

import { translateKey } from "cleanupfun/src/global-vars/translation/translate.js";

import { SwiperCardInfo } from "./SwiperCardInfo";

export function SwiperCardContainer({ fileItem, mimetype, children }){
  const [cardHeight, setCardHeight] = useState(null);
  const [infoHeight, setInfoHeight] = useState(null);
  const [openHeight, setOpenHeight] = useState(null);
  const styleList = [styles.card].concat([
    (
      fileItem.shouldStore === UNDEFINED ? styles.untouchedCard :
      fileItem.shouldStore === false ? styles.savedCard :
      fileItem.shouldStore === true ? styles.toStoreCard :
      styles.shouldntHappenCard
    )
  ]);

  const fileuri = fileItem.fileuri;
  logger.log(fileuri);

  return (
    <View
      onLayout={(event) => {
        setCardHeight(event.nativeEvent.layout.height);
      }}
    >
    <Card
      style={styleList}
    >
      {
        cardHeight === null ? null :
        infoHeight === null ? null :
        openHeight === null ? null :
        (
          <View
            style={{
              position: "absolute",
              top: openHeight / 2,
              height: cardHeight - ((openHeight / 2) + (infoHeight / 4)),
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            { children }
          </View>
        )
      }
      <TouchableOpacity
        onLayout={(event) => {
          setOpenHeight(event.nativeEvent.layout.height);
        }}
        style={[
          styles.button,
          styles.grey,
          {
            position: "absolute",
            alignSelf: "center",
            top: 0
          }
        ]}
        onPress={async () => {
          try {
            logger.log("originialFileUri:", fileItem.originialFileUri);
            await openFile(
              fileuri,
              mimetype,
            );
            logger.log("successful open");
          }catch(e){
            logger.error("failed open:", e);
          }
        }}
      >
        <Image
          source={require("cleanupfun/assets/open-file.png")}
          style={{
            height: 62,
            width: 62,
            resizeMode: "contain",
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
        }}
        onLayout={(event) => {
          setInfoHeight(event.nativeEvent.layout.height);
        }}
      >
        <SwiperCardInfo fileItem={fileItem} />
      </View>
    </Card>
    </View>
  );
}
