
import { DBWrapperAbstract } from "../db-wrapper-abstract";

import {
  MarkedFilesSchema
} from "../marked-files-schema"


class fakeDBClass extends DBWrapperAbstract {
  markedTimestampIndex = {}
  fileuriIndex = {};
  constructor(config){
    super();
    console.log("fake db config")
  }

  async setup(){
    await Promise.resolve();
  }

  async addItem(newItem){
    await Promise.resolve();
    if(typeof newItem.markedTimestamp !== "number"){
      throw new Error("markedTimestamp is not a number: " + newItem.markedTimestamp);
    }

    if(typeof newItem.fileuri !== "string"){
      throw new Error("fileuri is not a string: " + newItem.fileuri)
    }

    this.markedTimestampIndex[newItem.markedTimestamp] = newItem;
    this.fileuriIndex[newItem.fileuri] = newItem;

  }

  async getItem(key, value){
    await Promise.resolve();
    if(key === "fileuri"){
      return this.fileuriIndex[value];
    }

    if(key === "markedTimestamp"){
      return this.markedTimestampIndex[value];
    }

    throw new Error("Invalid key to test: " + key);
  }

  async hasItem(key, value){
    await Promise.resolve();
    if(key === "fileuri"){
      return (value in this.fileuriIndex);
    }

    if(key === "markedTimestamp"){
      return (value in this.markedTimestampIndex);
    }

    throw new Error("Invalid key to test: " + key);
  }

  async removeItem(item){
    await Promise.resolve();
    if(typeof item.markedTimestamp !== "number"){
      throw new Error("markedTimestamp is not a number: " + item.markedTimestamp);
    }

    if(typeof item.fileuri !== "string"){
      throw new Error("fileuri is not a string: " + item.fileuri)
    }

    delete this.markedTimestampIndex[item.markedTimestamp];
    delete this.fileuriIndex[item.fileuri];
  }

  async updateItem(oldValue, newValue){
    await Promise.resolve();
    await this.removeItem(oldValue);
    await this.addItem(newValue)
  }

}


var fakeDBInstance;

async function getFakeDB(){
  await Promise.resolve();
  if(!fakeDBInstance){
    fakeDBInstance = new fakeDBClass({
      path: "cleanup-fun",
      schema: [MarkedFilesSchema],
    })
    await fakeDBInstance.setup();
  }

  return fakeDBInstance;
}


export { getFakeDB };
