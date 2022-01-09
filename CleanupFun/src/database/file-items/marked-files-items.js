
import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/database/file-items/marked-file-items"
const logger = new KeyedLogger(FILE_NAME)

import { FileItemsAbstract } from "./file-items-abstract";
import { getRealm } from "./realm-setup";
import { UNDEFINED } from "../CONSTANTS";

const DEFAULT_SORTKEY = "markedTimestamp";
const DEFAULT_SORTORDER = "asc";
const DEFAULT_SHOULDSTORE_FILTER = UNDEFINED;
const DEFAULT_AUTOCOMPLETE_FILTER = "";

class UnmarkedFileItems extends FileItemsAbstract {
  sortKey = DEFAULT_SORTKEY;
  sortOrder = DEFAULT_SORTORDER;
  shouldStoreFilter = DEFAULT_SHOULDSTORE_FILTER;
  autocompleteFilter = DEFAULT_AUTOCOMPLETE_FILTER;
  offset = 0;

  constructor(){
    super();
  }
  async getNextTen(){
    const realm = await getRealm();
    var markedFiles = realm.objects("MarkedFile");

    if(offset >= markedFiles.length){
      return [];
    }

    if(this.shouldStoreFilter !== DEFAULT_SHOULDSTORE_FILTER){
      markedFiles = markedFiles.filtered("shouldStore = " + shouldStoreFilter);
    }
    if(this.autocompleteFilter !== DEFAULT_AUTOCOMPLETE_FILTER){
      markedFiles = markedFiles.filtered(`filename BEGINSWITH '${autocompleteFilter.replace("\'", "\\'")}'`);
    }
    if(this.sortKey !== DEFAULT_SORTKEY || this.sortOrder !== DEFAULT_SORTORDER){
      markedFiles = markedFiles.sorted(sortKey, sortOrder === "asc" ? false : true)
    }

    markedFiles = markedFiles.slice(offset, offset + 10);

    offset += 10;

    return markedFiles;
  }

  sortAndFilter(sortAndFilterParams){
    switch(sortAndFilterParams.sortKey){
      case "filename": this.sortKey = "filename"; break;
      case "markedTimestamp": this.sortKey = "markedTimestamp"; break;
      default: {
        logger.log("missing or invalid sort key:", sortAndFilterParams.sortKey)
        this.sortKey = DEFAULT_SORTKEY;
        break;
      }
    }

    switch(sortAndFilterParams.sortOrder){
      case "asc": this.sortOrder = "asc"; break;
      case "desc": this.sortOrder = "desc"; break;
      default: {
        logger.log("missing or invalid sort order:", sortAndFilterParams.sortOrder)
        this.sortOrder = DEFAULT_SORTORDER;
        break;
      }
    }

    switch(shouldStoreFilter.shouldStore){
      case true: this.shouldStoreFilter = true;
      case false: this.shouldStoreFilter = false;
      case UNDEFINED: this.shouldStoreFilter = UNDEFINED
      default: {
        logger.log("invalid should store filter:", shouldStoreFilter.shouldStore)
        this.shouldStoreFilter = DEFAULT_SHOULDSTORE_FILTER;
        break;
      }
    }

    if(typeof shouldStoreFilter.autocomplete === "string" && shouldStoreFilter.autocomplete !== ""){
      this.autocompleteFilter = shouldStoreFilter.autocomplete
    } else {
      logger.log("missing or invalid autocomplete filter:", shouldStoreFilter.autocomplete);
      this.autocompleteFilter = DEFAULT_AUTOCOMPLETE_FILTER;
    }
  }

}

export {
  UnmarkedFileItems
}
