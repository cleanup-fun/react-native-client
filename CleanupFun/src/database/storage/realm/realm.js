import { UNDEFINED } from "../../CONSTANTS";

import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/database/storage/realm/realm.js"
const logger = new KeyedLogger(FILE_NAME)

import Realm from "realm";
import { DBWrapperAbstract } from "../db-wrapper";

import {
  MarkedFilesSchema
} from "../MarkedFilesSchema"

class RealmWrapper extends DBWrapperAbstract {
  realmConfig = {};
  primaryKeys = {};
  realm;
  constructor(realmConfig){
    super();
    this.realmConfig = realmConfig;
    this.primaryKeys = realmConfig.schema.reduce((obj, schema)=>{
      obj[schema.name] = schema.primaryKeys;
    }, {})
  }

  async setup(){
    this.realm = await Realm.open(this.realmConfig);
  }

  async addItem(newItem){
    await Promise.resolve();
    this.realm.write(()=>{
      newMarkedFile = realm.create("MarkedFile", newMarkedFile)
    })

    logger.log(newMarkedFile)
  }

  async updateItem(oldValue, newValue){
    await Promise.resolve();
    await this.removeItem(oldValue);
    await this.addItem(newValue)
  }

  async removeItem(itemProps){
    await Promise.resolve();
    var primaryKey = this.primaryKeys["MarkedFile"];
    var oldItem = await this.getItem(primaryKey, item[primaryKey])
    this.realm.write(()=>{
      this.realm.delete(oldItem);
    })
  }

  async getItem(key, value){
    await Promise.resolve();
    var objects = this.realm.objects("MarkedFile");
    // seems slow
    var object = objects.find((object)=>{
      return (object[key] === value)
    })

    return object
  }

  async hasItem(key, value){
    const item = this.getItem(key, value);
    return item !== UNDEFINED;
  }
}

var realmInstance;

async function getRealm(){
  if(!realmInstance){
    realmInstance = new RealmWrapper({
      path: "cleanup-fun",
      schema: [MarkedFilesSchema],
    })
    await realmInstance.setup();
  }

  return realmInstance

}



export { getRealm };
