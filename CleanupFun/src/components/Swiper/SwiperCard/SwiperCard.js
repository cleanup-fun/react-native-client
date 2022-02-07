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

export function SwiperCard({ fileItem, active }){
  const fileuri = fileItem.fileuri;
  logger.log(fileItem);

  const baseFileName = fileuri.indexOf("?") > -1 ? (
    fileuri.split("?")[0]
  ) : (
    fileuri
  );

  const mimetype = mime.lookup(baseFileName);
  logger.log("mimetype:", mimetype);

  return (
    <SwiperCardContainer
     fileItem={fileItem}
     mimetype={mimetype}
    >
      {
        textTest.test(mimetype) ? (
          <TextItem
            fileuri={fileuri}
            active={active}
          />
        ) : videoTest.test(mimetype) ? (
          <VideoItem
            fileuri={fileuri}
            active={active}
          />
        ) : audioTest.test(mimetype) ? (
          <AudioItem
            fileuri={fileuri}
            active={active}
          />
        ) : imageTest.test(mimetype) ? (
          <ImageItem
            fileuri={fileuri}
            active={active}
          />
        ) : (
          <NoDisplayItem />
        )
      }
    </SwiperCardContainer>
  );
}
