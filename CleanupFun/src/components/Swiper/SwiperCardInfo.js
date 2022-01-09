import { UNDEFINED } from "../../CONSTANTS";

import { logger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "SwiperCardInfo"

import React from "react";
import { Card } from 'react-native-card-stack-swiper';
import {
  Text,
} from 'react-native';
import moment from 'moment';
// https://www.npmjs.com/package/react-moment
// https://momentjs.com/docs/#/displaying/

import { styles } from "./styles";

import { translateKey } from "../../global-vars/translation/translate";

function DisplayDate({ markedTimestamp }){
  var momentTime = moment(markedTimestamp);
  const now = Date.now();
  const WeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  if(now - markedTimestamp < WeekInMilliseconds){
    return momentTime.fromNow();
  }
  return momentTime.format("dddd, MMMM Do YYYY, h:mm:ss a");
}

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
      <Text>{translateKey("SWIPERCARD_MARKED_TIMESTAMP")}: <DisplayDate markedTimestamp={fileItem.markedTimestamp} /></Text>
      <Text>{translateKey("SWIPERCARD_STORED_STATUS")}: {fileItem.shouldStore === UNDEFINED ? "New" : fileItem.shouldStore === true ? "Should Store" : "Saved"}</Text>
    </Card>
  )
}

export { SwiperCard };
