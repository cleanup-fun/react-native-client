import { getRealm } from "./realm-setup";
import { getFakeDB } from "../storage/fake/fakeDB";
// import { getRealm } from "../storage/realm/realm";

class  FileItemsAbstract {

  async getNextTen(){
    throw new Error("getNextTen needs to be implemented")
  }

  sortAndFilter(sortAndFilterParams){
    throw new Error("sortAndFilter needs to be implemented");
  }

  async updateFileStatus(fileuri, shouldStore){
    var db = await getFakeDB();
    var oldValue = await db.getItem("fileuri", fileuri);
    var newValue = {
      markedTimestamp: Date.now(),
      filename: fileuri.split(/(\\|\/)/g).pop(),
      fileuri: fileuri,
      shouldStore: shouldStore
    };
    if(oldValue){
      await db.updateItem(oldValue, newValue);
    } else {
      await db.addItem(newValue);
    }
  }

}


export { FileItemsAbstract };
