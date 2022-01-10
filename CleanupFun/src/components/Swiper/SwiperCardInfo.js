import { UNDEFINED } from "../../CONSTANTS";

import { logger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "SwiperCardInfo"

import React from "react";
import { Card } from 'react-native-card-stack-swiper';
import {
  Text,
} from 'react-native';

import { TranslateableMoment } from "../Reused/TranslateableMoment";

import { styles } from "./styles";

import { translateKey } from "../../global-vars/translation/translate";

function SwiperCard({fileItem}){
  const styleList = [styles.card].concat([
    (
      fileItem.shouldStore === UNDEFINED ? styles.untouchedCard :
      fileItem.shouldStore === false ? styles.savedCard :
      fileItem.shouldStore === true ? styles.toStoreCard :
      styles.shouldntHappenCard
    )
  ])

  logger.log(FILE_NAME, "styleList:", styleList);

  return (
    <Card
      style={styleList}
    >
      <Text>{translateKey("SWIPERCARD_FILE_NAME")}: {fileItem.filename}</Text>
      <Text>{translateKey("SWIPERCARD_FILE_URI")}: {fileItem.fileuri}</Text>
      <Text>{translateKey("SWIPERCARD_MARKED_TIMESTAMP")}: <TranslateableMoment timestamp={fileItem.markedTimestamp} /></Text>
      <Text>{translateKey("SWIPERCARD_STORED_STATUS")}: {fileItem.shouldStore === UNDEFINED ? "New" : fileItem.shouldStore === true ? "Should Store" : "Saved"}</Text>
    </Card>
  )
}

export { SwiperCard };
