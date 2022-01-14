
const NEEDS_TO_BE_IMP = "needs to be implemented";

const functionNames = [
  "getNextTen",
  "sortAndFilter"
]

class  FileItemsAbstract {

  constructor(){
    functionNames.forEach((functionName)=>{
      if(this[functionName].toString().includes(`"${functionName} " + NEEDS_TO_BE_IMP`)){
        throw new Error(functionName + " " + NEEDS_TO_BE_IMP);
      }
    })
  }

  async getNextTen(){
    throw new Error("getNextTen " + NEEDS_TO_BE_IMP);
  }

  sortAndFilter(sortAndFilterParams){
    throw new Error("sortAndFilter " + NEEDS_TO_BE_IMP);
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
