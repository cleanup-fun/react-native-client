import { getFakeDB } from "../storage/fake/fakeDB";
import { EventEmitter } from "events";
import { ReadableStream } from "readable-stream"

const NEEDS_TO_BE_IMP = "needs to be implemented";

class  FileItemsAbstract extends ReadableStream {

  constructor({ maxItemsPerStep, dontEnd }){
    super({ objectMode: true });
    Object.keys(this).forEach((keyName)=>{
      if(typeof this[keyName] !== "function") return;
      if(/NEEDS_TO_BE_IMP/.test(this[keyName].toString())){
        throw new Error(keyName + " " + NEEDS_TO_BE_IMP);
      }
    });
    this.maxItemsPerStep = maxItemsPerStep || 16;
    this.dontEnd = !!dontEnd;
    this.offset = 0;
    this.lastStep = 0;
    this.cachedItems = [];
  }

  async step(){
    throw new Error("step " + NEEDS_TO_BE_IMP);
  }

  sortAndFilter(sortAndFilterParams){
    throw new Error("sortAndFilter " + NEEDS_TO_BE_IMP);
  }

  stepBack(){
    if(this.cachedItems.length === 0) return;
    // If we are at the beginning we can't walk back
    // if the last step would put us at the beginning, we can't walk back
    // because we'd be returning the same items
    // If we can't retrieve the items before the last step
    //
    if(this.offset - (this.lastStep) == 0) return;
    this.offset = this.offset - (this.lastStep);
    this.lastStep = this.maxItemsPerStep;
    this.push(
      this.cachedItems.slice(this.offset - this.maxItemsPerStep, this.maxItemsPerStep)
    );
  }

  appendToCached(newItems){
    if(newItems.length === 0 && !this.dontEnd) return this.end();
    this.offset = this.offset + newItems.length;
    this.lastStep = newItems.length;
    this.cachedItems = this.cachedItems.concat(newItems);
    this.push(newItems);
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
    this.emit("update");
  }

}


export { FileItemsAbstract };
