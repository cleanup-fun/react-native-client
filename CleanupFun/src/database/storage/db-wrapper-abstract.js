
const NEEDS_TO_BE_IMP = "needs to be implemented";
const functionNames = [
  "setup",
  "addItem",
  "updateItem",
  "removeItem",
  "getItem",
  "hasItem"
];

class DBWrapperAbstract {

  constructor(){
    functionNames.forEach((functionName)=>{
      if(this[functionName].toString().includes(`"${functionName} " + NEEDS_TO_BE_IMP`)){
        throw new Error(functionName + " " + NEEDS_TO_BE_IMP);
      }
    })
  }

  async setup(){
    throw new Error("setup " + NEEDS_TO_BE_IMP)
  }

  async addItem(newItem){
    throw new Error("addItem " + NEEDS_TO_BE_IMP);
  }

  async updateItem(oldValue, newValue){
    throw new Error("updateItem " + NEEDS_TO_BE_IMP);
  }

  async removeItem(item){
    throw new Error("removeItem " + NEEDS_TO_BE_IMP);
  }

  async getItem(key, value){
    throw new Error("getItem " + NEEDS_TO_BE_IMP);
  }

  async hasItem(key, value){
    throw new Error("hasItem " + NEEDS_TO_BE_IMP);
  }


}


export { DBWrapperAbstract }
