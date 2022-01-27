import { UNDEFINED, NEEDS_TO_BE_IMP, LOAD_INCRMENTS } from "cleanupfun/src/constants";

import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/database/file-items/unmarked-file-items";
const logger = new KeyedLogger(FILE_NAME);

import { PermissionsAndroid, Platform } from "react-native";
import { FileItemsAbstract } from "./file-items-abstract";

import { getFakeDB } from "../storage/fake/fakeDB";

const DEFAULT_SORTORDER = "asc";

export class UnmarkedFileItems extends FileItemsAbstract {
  constructor(){
    super();
    this.lastOffset = 0;
    this.sortOrder = DEFAULT_SORTORDER;
    this.cachedFiles = [];
  }

  getFiles(){
    throw new Error(NEEDS_TO_BE_IMP);
  }

  getFileInfo(file){
    logger.log(file);
    throw new Error(NEEDS_TO_BE_IMP);
  }

  async getCachedOrRetrieve(){
    if(this.lastOffset === 0){
      this.cachedFiles = await this.getFiles();
    }
    return this.cachedFiles;
  }

  async getNextTen(){
    const hasPermission = await checkHasPermission();
    if(!hasPermission){
      throw new Error("Don't have permission to read external storage")
    }
    const [db, files] = await Promise.all([
      getFakeDB(),
      this.getCachedOrRetrieve()
    ]);

    if(files.length <= this.lastOffset){
      logger.log("no more photos available");
      return [];
    }

    const nextTenItems = [];

    if(this.sortOrder === "asc"){
      var currentIndex = files.length - 1 - this.lastOffset;
      while(nextTenItems.length < 10 && currentIndex >= 0){
        checkAndAddFile(
          db,
          this.getFileInfo(files[currentIndex]),
          nextTenItems,
        );
        currentIndex--;
        this.lastOffset++;
      }
    }else{
      var currentIndex = this.lastOffset;
      while(nextTenItems.length < 10 && currentIndex < files.length){
        checkAndAddFile(
          db,
          this.getFileInfo(files[currentIndex]),
          nextTenItems,
        );
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

async function checkIsItemMarked(db, fileuri){
  return await db.hasItem("fileuri", fileuri);
}

async function checkAndAddFile(db, currentFile, nextItems){
  const {
    filePath,
    originalFilePath,
    filename,
    timestamp,
  } = currentFile;
  logger.log("currentFile:", filePath);
  logger.log("platform os:", Platform.OS);

  const isItemMarked = await checkIsItemMarked(db, filePath);
  if(!isItemMarked){
    nextItems.push({
      filename: filename,
      fileuri: filePath,
      originalFilePath: originalFilePath,
      markedTimestamp: timestamp,
      shouldStore: UNDEFINED,
    });
  }
}
