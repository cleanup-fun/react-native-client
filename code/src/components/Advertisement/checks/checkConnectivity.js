import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/components/Advertisement/checks/checkConnectivity.js"
const logger = new KeyedLogger(FILE_NAME)

import {
  Platform
} from 'react-native';

import NetInfo from "@react-native-community/netinfo";

async function checkConnectivity(){
  var isConnected
  const netInfoState = await NetInfo.fetch();
  logger.log("Connection type", netInfoState.type);
  logger.log("Is connected?", netInfoState.isConnected);

  if (netInfoState.isConnected) {
    logger.log("You are online!");
    return true;
  } else {
    logger.log("You are offline!");
    return false
  }
}

export { checkConnectivity };
