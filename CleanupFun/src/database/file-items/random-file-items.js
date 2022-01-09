import { UNDEFINED, SAVE_MAX_NUMBER_VALUE } from "../../CONSTANTS";
import { FileItemsAbstract } from "./file-items-abstract";
import { getFakeDB } from "../storage/fake/fakeDB";
// import { getRealm } from "../storage/realm/realm";

const DEFAULT_SORTKEY = "lastAccessTimestamp";
const DEFAULT_SORTORDER = "asc";

class RandomFileItems extends FileItemsAbstract {
  sortKey = DEFAULT_SORTKEY;
  lastOffset = 0;
  constructor(){
    super();
  }
  async getNextTen(){
    if(SAVE_MAX_NUMBER_VALUE === this.lastOffset){
      return [];
    }

    var db = await getFakeDB();

    const nextTenItems = [];

    async function checkIsItemMarked(fileuri){
      return db.hasItem("fileuri", fileuri);
    }

    async function createARandomFileItem(index){
      await Promise.resolve();

      var indexString = index.toString(32);

      console.log("index:", index, indexString)
      var markedTimestamp = Date.now();
      var filename = indexString + ".png";
      var fileuri = "file://" + indexString + "/" + indexString + "/" + filename;

      var shouldStoreRandom = Math.floor(Math.random() * 3);
      var shouldStore;
      switch(shouldStoreRandom){
        case 0: shouldStore = false; break;
        case 1: shouldStore = true; break;
        case 2: shouldStore = UNDEFINED; break;
      }

      return {
        filename: filename,
        fileuri: fileuri,
        markedTimestamp: markedTimestamp,
        shouldStore: shouldStore
      }
    }

    if(this.sortKey === "asc"){
      var currentIndex = this.lastOffset;
      var fileItem;
      while(nextTenItems < 10 && currentIndex < SAVE_MAX_NUMBER_VALUE){
        fileItem = await createARandomFileItem(currentIndex);

        const isItemMarked = await checkIsItemMarked(fileItem);
        if(isItemMarked){
          currentIndex++;
          continue;
        }

        var shouldSkip = Math.floor(Math.random() * 4);
        if(shouldSkip === 0) {
          currentIndex++;
          continue;
        }

        nextTenItems.push(fileItem);
        currentIndex++;
        this.lastOffset++;
      }
    }else{
      var currentIndex = SAVE_MAX_NUMBER_VALUE - this.lastOffset;
      while(nextTenItems.length < 10 && currentIndex >= 0){
        fileItem = await createARandomFileItem(currentIndex);

        const isItemMarked = await checkIsItemMarked(fileItem);
        if(isItemMarked){
          currentIndex--;
          continue;
        }

        var shouldSkip = Math.floor(Math.random() * 4);
        if(shouldSkip === 0) {
          currentIndex--;
          continue;
        }

        nextTenItems.push(fileItem);
        currentIndex--;
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
        console.log("missing or invalid sort order:", sortAndFilterParams.sortOrder)
        this.sortOrder = DEFAULT_SORTORDER;
        break;
      }
    }
  }

}

export { RandomFileItems };
