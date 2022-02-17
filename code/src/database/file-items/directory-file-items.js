
import { SAFE_MAX_NUMBER_VALUE } from "cleanupfun/src/global-vars/constants";

import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/database/file-items/directory-file-items";
const logger = new KeyedLogger(FILE_NAME);

import { UnmarkedFileItems } from "./unmarked-file-items";
import DocumentPicker from "react-native-document-picker";
import RNFS from "react-native-fs";

const DEFAULT_SORTORDER = "asc";

export const ERROR_TOO_MANY_FILES = "Too many files found";

export class DirectoryFileItems extends UnmarkedFileItems {
  constructor(){
    super();
    this.lastOffset = 0;
    this.sortOrder = DEFAULT_SORTORDER;
    this.recursive = true;
  }

  setRecursive(newRecursive){
    this.recursive = newRecursive;
  }

  getFiles(){
    if(this.recursive){
      return this.getFilesRecursive();
    } else {
      return this.getFilesShallow();
    }
  }

  async getFilesRecursive(){
    var totalFileArray = [];
    const dirsToRead = [await userSelectsDir()];
    logger.log(dirsToRead);
    while(dirsToRead.length){
      const promises = [];
      while(dirsToRead.length){
        const dir = dirsToRead.pop();
        promises.push(
          Promise.resolve().then(async ()=>{
            const dirContents = await RNFS.readDir(dir);
            dirContents.forEach((item)=>{
              if(totalFileArray.length === SAFE_MAX_NUMBER_VALUE){
                throw new Error(ERROR_TOO_MANY_FILES);
              }
              if(item.isDirectory()) dirsToRead.push(item.path);
              else totalFileArray.push({
                filePath: item.path,
                originalFilePath: item.path,
                fileName: item.name,
                timestamp: item.mtime,
              });
            });
          }),
        );
      }
      await Promise.all(promises);
    }

    return totalFileArray;
  }

  async getFilesShallow(){
    const pathToDir = await userSelectsDir();
    const dirContents = await RNFS.readDir(pathToDir);
    var totalFileArray = [];
    dirContents.forEach((item)=>{
      if(item.isFile()) totalFileArray.push({
        filePath: item.path,
        originalFilePath: item.path,
        fileName: item.name,
        timestamp: item.mtime,
      });
    });
    return totalFileArray;
  }

  getFileInfo(file){
    return file;
  }
}

async function userSelectsDir(){
  return decodeURIComponent(
    (await DocumentPicker.pickDirectory()).uri
  );
}
