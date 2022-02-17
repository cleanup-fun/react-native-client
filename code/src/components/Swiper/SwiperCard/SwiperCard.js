import React from "react";
import { SwiperCardContainer } from "./SwiperCardContainer";
import * as mime from "react-native-mime-types";

import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/components/Swiper/SwiperCard.js";
const logger = new KeyedLogger(FILE_NAME);

import {
  NoDisplayItem,
  TextItem,
  VideoItem,
  AudioItem,
  ImageItem,
} from "./ItemTypes";

const textTest = /^text\//;
const videoTest = /^video\//;
const audioTest = /^audio\//;
const imageTest = /^image\//;

export function SwiperCard({ fileItem, index }){
  const fileuri = fileItem.fileuri;
  logger.log(fileItem);
  logger.log(index);

  const baseFileName = fileuri.indexOf("?") > -1 ? (
    fileuri.split("?")[0]
  ) : (
    fileuri
  );

  const mimetype = mime.lookup(baseFileName);
  logger.log("mimetype:", mimetype);

  return (
    <SwiperCardContainer
     index={index}
     fileItem={fileItem}
     mimetype={mimetype}
    >
      {
        textTest.test(mimetype) ? (
          <TextItem
            fileuri={fileuri}
            index={index}
          />
        ) : videoTest.test(mimetype) ? (
          <VideoItem
            fileuri={fileuri}
            index={index}
          />
        ) : audioTest.test(mimetype) ? (
          <AudioItem
            fileuri={fileuri}
            index={index}
          />
        ) : imageTest.test(mimetype) ? (
          <ImageItem
            fileuri={fileuri}
            index={index}
          />
        ) : (
          <NoDisplayItem />
        )
      }
    </SwiperCardContainer>
  );
}
