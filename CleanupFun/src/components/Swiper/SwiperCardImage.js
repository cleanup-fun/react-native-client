import { UNDEFINED } from "../../CONSTANTS";

import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/components/Swiper/Swiper.js"
const logger = new KeyedLogger(FILE_NAME)

import React from "react";
import { Card } from 'react-native-card-stack-swiper';
import {
  Text,
  Image,
  TouchableOpacity,
  View
} from 'react-native';
import moment from 'moment';
// https://momentjs.com/docs/#/displaying/

import * as mime from 'react-native-mime-types';
import FileOpener from 'react-native-file-opener';
import FileViewer from "react-native-file-viewer";

import { styles } from "./styles";

import { translateKey } from "cleanupfun/src/global-vars/translation/translate.js";

function DisplayDate({ markedTimestamp }){
  var momentTime = moment(markedTimestamp);
  const now = Date.now();
  const WeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  if(now - markedTimestamp < WeekInMilliseconds){
    return momentTime.fromNow();
  }
  return momentTime.format("dddd, MMMM Do YYYY, h:mm:ss a");
}

function SwiperCardImage({fileItem}){
  const styleList = [styles.card].concat([
    (
      fileItem.shouldStore === UNDEFINED ? styles.untouchedCard :
      fileItem.shouldStore === false ? styles.savedCard :
      fileItem.shouldStore === true ? styles.toStoreCard :
      styles.shouldntHappenCard
    )
  ])

  const fileuri = fileItem.fileuri;
  logger.log( fileuri);

  return (
    <Card
      style={styleList}
    >
      <TouchableOpacity
        style={{
          position: 'absolute',
          alignSelf: 'center',
        }}
        onPress={()=>{
          const path = FileViewer.open(fileItem.fileuri) // absolute-path-to-my-local-file.
            .then(() => {
              // success
              logger.log("successfully opened the file")
            })
            .catch((error) => {
              // error
              logger.log("failed to open the file")
            });
        }}
      >
        <Image
          style={[styles.swiperCardImage]}
          source={{ uri: fileuri }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          styles.grey,
          {
            position: 'absolute',
            alignSelf: 'center',
            top: 0
          }
        ]}
        onPress={() => {
          var mimetype = mime.lookup(fileItem.fileuri)
          logger.log("mimetype:", mimetype)
          logger.log("FileOpener:", FileOpener)
          FileOpener.open(
            fileItem.fileuri,
            mimetype
          ).then(()=>{
            logger.log("successful open")
          }, ()=>{
            logger.log("failed open")
          })
        }}
      >
        <Image
          source={require('../../../assets/open-file.png')}
          style={{
            height: 62,
            width: 62,
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
      <View
        style={[styles.swiperCardInfo, ]}
      >
        <Text>{translateKey("SWIPERCARD_FILE_NAME")}: {fileItem.filename}</Text>
        <Text>{translateKey("SWIPERCARD_FILE_URI")}: {fileItem.fileuri}</Text>
        <Text>{translateKey("SWIPERCARD_MARKED_TIMESTAMP")}: <DisplayDate markedTimestamp={fileItem.markedTimestamp} /></Text>
        <Text>{translateKey("SWIPERCARD_STORED_STATUS")}: {fileItem.shouldStore === UNDEFINED ? "New" : fileItem.shouldStore === true ? "Should Store" : "Saved"}</Text>
      </View>
    </Card>
  )
}

export { SwiperCardImage };
