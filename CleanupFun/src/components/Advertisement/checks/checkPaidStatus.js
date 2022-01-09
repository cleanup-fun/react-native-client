import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/components/Advertisement/checks/checkPaidStatus.js"
const logger = new KeyedLogger(FILE_NAME)

import {
  PAID_STATUS_ASYNC_STORAGE_KEY
} from "../../../CONSTANTS";

import AsyncStorage from '@react-native-async-storage/async-storage';

async function checkPaidStatus(){
  const paidStatus = await AsyncStorage.getItem(PAID_STATUS_ASYNC_STORAGE_KEY);
  if(paidStatus === "true"){
    logger.log("The User has paid")
    return true
  }

  // also includes null which means it hasn't been set
  logger.log("The User hasn't paid");
  return false;
}

export { checkPaidStatus };
