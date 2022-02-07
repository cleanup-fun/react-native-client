import { SAFE_MAX_NUMBER_VALUE } from "cleanupfun/src/constants";

import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/database/file-items/camera-roll-file-items";
const logger = new KeyedLogger(FILE_NAME);

import { Platform } from "react-native";
import { UnmarkedFileItems } from "./unmarked-file-items";
import CameraRoll from "@react-native-community/cameraroll";

const DEFAULT_SORTORDER = "asc";

export class CameraRollFileItems extends UnmarkedFileItems {
  constructor(){
    super();
    this.lastOffset = 0;
    this.sortOrder = DEFAULT_SORTORDER;
  }

  async getFiles(){
    var totalPictureArray = [];
    var hasNextPage = true;
    do{
      var tempPictureList = await CameraRoll.getPhotos({
        first: SAFE_MAX_NUMBER_VALUE,
        groupTypes: "All",
        assetType: "All",
      });
      logger.log(SAFE_MAX_NUMBER_VALUE);
      totalPictureArray = totalPictureArray.concat(tempPictureList.edges);
      hasNextPage = tempPictureList.has_next_page;
    }while(hasNextPage);

    return totalPictureArray;
  }

  getFileInfo(file){
    logger.log(file);
    const currentFile = file.node;
    const originalFilePath = currentFile.image.uri;
    const filePath = Platform.OS === "ios" ? (
      convertLocalIdentifierToAssetLibrary(
        originalFilePath,
        currentFile.image.filename.split(".").pop(),
      )
    ) : (
      originalFilePath
    );
    const filename = filePath.split(/(\\|\/)/g).pop();
    return {
      filePath,
      originalFilePath,
      filename,
      timestamp: currentFile.timestamp
    };
  }
}

function convertLocalIdentifierToAssetLibrary(localIdentifier, ext){
  const hash =  localIdentifier.split("/")[2];
  return `assets-library://asset/asset.${ext}?id=${hash}&ext=${ext}`;
}
