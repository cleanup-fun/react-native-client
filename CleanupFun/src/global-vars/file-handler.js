import { Platform } from "react-native";
import FileOpener from "react-native-file-opener";
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";

import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/global-vars/file-handler.js";
const logger = new KeyedLogger(FILE_NAME);

const isAsset = /^assets-library:\/\/asset\/asset/;
const iosIdExt = /.*\?id=(.*)&ext=(.*)$/;
const isVideo = /^video\//;
const isImage = /^image\//;

const CREATE_PROMISES = [];
var DELETE_PROMISE = Promise.resolve();

const TMP_DIR = RNFS.TemporaryDirectoryPath + "cleanup-fun/";

export function clearTmpDir(){
  if(Platform.OS !== "ios") return Promise.resolve();
  try {
    DELETE_PROMISE = Promise.all(CREATE_PROMISES).then(async ()=>{
      await RNFS.exists(TMP_DIR) && await RNFS.unlink(TMP_DIR);
      await RNFS.mkdir(TMP_DIR);
      CREATE_PROMISES.length = 0;
    });
    return DELETE_PROMISE;
  }catch(e){
    logger.error("error clearing tmp:", e);
  }
}

export const openFile = Platform.OS !== "ios" ? (
  (fileuri, mimetype)=>{
    logger.log("Opening with android");
    return FileOpener.open(
      fileuri,
      mimetype,
    );
  }
) : (
  async (fileuri, mimetype)=>{
    logger.log("Opening with ios");
    if(!isAsset.test(fileuri)){
      return FileOpener.open(
        fileuri,
        mimetype,
      );
    }
    const [, id, ext] = iosIdExt.exec(fileuri);
    const dest = `${TMP_DIR}${id}.${ext}`;
    await ensureFileExists(mimetype, fileuri, dest);
    return FileOpener.open(
      dest,
      mimetype,
    );
  }
);

export const viewFile = Platform.OS !== "ios" ? (
  (fileuri)=>{
    logger.log("viewing with android");

    return FileViewer.open(fileuri);
  }
) : (
  async (fileuri, mimetype)=>{
    logger.log("Viewing with ios");
    if(!isAsset.test(fileuri)){
      return FileViewer.open(fileuri);
    }
    const [, id, ext] = iosIdExt.exec(fileuri);
    const dest = `${TMP_DIR}${id}.${ext}`;
    await ensureFileExists(mimetype, fileuri, dest);
    return FileViewer.open(dest);
  }
);

async function ensureFileExists(mimetype, fileuri, dest){
  const exists = await RNFS.exists(dest);
  if(!exists){
    if(isImage.test(mimetype)){
      await handleCreatePromise(()=>(
        RNFS.copyAssetsFileIOS(fileuri, dest, 0, 0)
      ));
    } else if(isVideo.test(mimetype)){
      await handleCreatePromise(()=>(
        RNFS.copyAssetsVideoIOS(fileuri, dest)
      ));
    } else {
      throw new Error("Unable to copy asset");
    }
  }
}

async function handleCreatePromise(fn){
  await DELETE_PROMISE;
  const p = fn();
  CREATE_PROMISES.push(p);
  return p;
}

// thanks
// https://stackoverflow.com/questions/56293685/javascript-filter-array-with-mutation
// may need it in the future
function mutationFilter(arr, cb){
  for(let l = arr.length - 1; l >= 0; l -= 1){
    if(!cb(arr[l])) return arr.splice(l, 1);
  }
}
