import {
  Platform
} from 'react-native';

import NetInfo from "@react-native-community/netinfo";

async function checkConnectivity(){
  var isConnected
  const netInfoState = await NetInfo.fetch();
  console.log("Connection type", netInfoState.type);
  console.log("Is connected?", netInfoState.isConnected);

  if (netInfoState.isConnected) {
    console.log("You are online!");
    return true;
  } else {
    console.log("You are offline!");
    return false
  }
}

export { checkConnectivity };
