
import {
  PAID_STATUS_ASYNC_STORAGE_KEY
} from "../../../CONSTANTS";

import AsyncStorage from '@react-native-async-storage/async-storage';

async function checkPaidStatus(){
  const paidStatus = await AsyncStorage.getItem(PAID_STATUS_ASYNC_STORAGE_KEY);
  if(paidStatus === "true"){
    console.log("The User has paid")
    return true
  }

  // also includes null which means it hasn't been set
  console.log("The User hasn't paid");
  return false;
}

export { checkPaidStatus };
