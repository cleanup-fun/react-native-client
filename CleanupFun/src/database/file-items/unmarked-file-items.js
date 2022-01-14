import { UNDEFINED, SAFE_MAX_NUMBER_VALUE, LOAD_INCRMENTS } from "cleanupfun/src/constants";

import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/database/file-items/unmarked-file-items";
const logger = new KeyedLogger(FILE_NAME);

import { PermissionsAndroid, Platform } from "react-native";
import { FileItemsAbstract } from "./file-items-abstract";
import CameraRoll from "@react-native-community/cameraroll";

import { getFakeDB } from "../storage/fake/fakeDB";

const DEFAULT_SORTORDER = "asc";



async function checkHasPermission() {
  if(Platform.OS !== "android"){
    return Promise.resolve(true);
  }
  const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

class UnmarkedFileItems extends FileItemsAbstract {
  lastOffset = 0;
  sortOrder = DEFAULT_SORTORDER;
  constructor(){
    super();
  }

  async getAllPictures(){
    var totalPictureArray = []
    var hasNextPage = true
    do{
      var tempPictureList = await CameraRoll.getPhotos({
        first: SAFE_MAX_NUMBER_VALUE,
        groupTypes: "SavedPhotos",
        assetType: "Photos",
      })
      totalPictureArray = totalPictureArray.concat(tempPictureList.edges);
      hasNextPage = tempPictureList.has_next_page;
    }while(hasNextPage);

    return totalPictureArray;
  }

  async getNextTen(){
    const hasPermission = await checkHasPermission();
    if(!hasPermission){
      throw new Error("Don't have permission to read external storage")
    }
    const [db, photos] = await Promise.all([
      getFakeDB(),
      this.getAllPictures()
    ]);

    if(photos.length <= this.lastOffset){
      logger.log("no more photos available");
      return [];
    }

    const nextTenItems = [];

    async function checkIsItemMarked(fileuri){
      return await db.hasItem("fileuri", fileuri);
    }
    logger.log("last is oldest?", photos[photos.length - 1].node.timestamp < photos[0].node.timestamp)

    if(this.sortOrder === "asc"){
      var currentIndex = photos.length - 1 - this.lastOffset;
      var currentFile;
      var currentFilePath;
      var currentFileName;
      while(nextTenItems.length < 10 && currentIndex >= 0){
        currentFile = photos[currentIndex].node;
        logger.log("currentFile:", currentFile)
        currentFilePath = currentFile.image.uri;
        currentFileName = currentFilePath.split(/(\\|\/)/g).pop();

        const isItemMarked = await checkIsItemMarked(currentFilePath);
        if(!isItemMarked){
          nextTenItems.push({
            filename: currentFileName,
            fileuri: currentFilePath,
            markedTimestamp: currentFile.timestamp,
            shouldStore: UNDEFINED
          })
        }
        currentIndex--;
        this.lastOffset++
      }
    }else{
      var currentIndex = this.lastOffset;
      var currentFile;
      var currentFilePath;
      while(nextTenItems.length < 10 && currentIndex < photos.length){
        currentFile = photos[currentIndex].node;
        currentFilePath = currentFile.image.uri;
        currentFileName = currentFilePath.split(/(\\|\/)/g).pop();

        const isItemMarked = await checkIsItemMarked(currentFilePath);
        if(!isItemMarked){
          nextTenItems.push({
            filename: currentFileName,
            fileuri: currentFilePath,
            markedTimestamp: 0,
            shouldStore: UNDEFINED
          })
        }
        currentIndex++;
        this.lastOffset++;
      }
    }

    return nextTenItems;
  }

  sortAndFilter(sortAndFilterParams){
    switch(sortAndFilterParams.sortOrder){
      case "asc": this.sortOrder = "asc"; break;
      case "desc": this.sortOrder = "desc"; break;
      default: {
        logger.log("missing or invalid sort order:", sortAndFilterParams.sortOrder)
        this.sortOrder = DEFAULT_SORTORDER;
        break;
      }
    }
  }

}

export { UnmarkedFileItems };
