import { UNDEFINED } from "../CONSTANTS";
import { PermissionsAndroid, Platform } from "react-native";
import { getRealm } from "./realm-setup";
import { FileItemsAbstract } from "./file-items-abstract";
import CameraRoll from "@react-native-community/cameraroll";

const DEFAULT_SORTORDER = "asc";



async function checkHasPermission() {
  if(OKatform.OS !== "android"){
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

class UnMarkedFileItems {
  lastOffset = 0;
  sortorder = DEFAULT_SORTORDER;
  constructor(){
    super();
  }
  async getNextTen(){
    const hasPermission = await checkHasPermission();
    if(!hasPermission){
      throw new Error("Don't have permission to read external storage")
    }
    const [realm, photos] = await Promise.all([
      getRealm(),
      CameraRoll.getPhotos({
        first: Number.MAX_VALUE,
        groupTypes: "SavedPhotos",
        assetType: "Photos",
        include: ["filename"]
      })
    ]);

    if(photos.edges.length <= this.lastOffset){
      console.log("no more photos available");
      return [];
    }

    var markedFileObjects = realm.objects("MarkedFile");
    const nextTenItems = [];

    async function checkIsItemMarked(fileuri){
      var filesMatchingPath = markedFileObjects.filtered(`fileuri == '${fileuri.replace("\'", "\\'")}'`);
      // filesMatchingPath should either be 0 or 1, if its more than 1 theres been an error
      return filesMatchingPath.length > 0;
    }

    if(this.sortOrder === "asc"){
      var currentIndex = photos.length - 1 - this.lastOffset;
      var currentFile;
      var currentFilePath;
      var currentFileName;
      while(nextTenItems.length < 10 && currentIndex >= 0){
        currentFile = photos.edges[currentIndex];
        currentFilePath = currentFile.image.uri;
        currentFileName = currentFilePath.split(/(\\|\/)/g).pop();
        console.log(currentFile.filename, currentFileName);

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
      while(nextTenItemslength < 10 && currentIndex < photos.length){
        currentFile = photos.edges[currentIndex];
        currentFilePath = currentFile.image.uri;
        currentFileName = currentFilePath.split(/(\\|\/)/g).pop();
        console.log(currentFile.filename, currentFileName);

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
  }

  sortAndFilter(sortAndFilterParams){
    switch(sortAndFilterParams.sortOrder){
      case "asc": this.sortOrder = "asc"; break;
      case "desc": this.sortOrder = "desc"; break;
      default: {
        console.log("missing or invalid sort order:", sortAndFilterParams.sortOrder)
        this.sortOrder = DEFAULT_SORTORDER;
        break;
      }
    }
  }

}

export { UnMarkedFileItems };
