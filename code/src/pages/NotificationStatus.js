import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/pages/NotificationStatus.js"
const logger = new KeyedLogger(FILE_NAME)

import React, { useContext } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { repeatedStyles } from "../components/repeated-styles";

import { useNavigator } from "cleanupfun/src/global-vars/navigator";

import { PATH_MAIN_MENU } from "../router/route-constants";


function NotificationStatus(){
  const navigate = useNavigator();

  return (
    <TouchableOpacity
      style={repeatedStyles.centeringContainer}
      onPress={() => {
        logger.log("clicked");
        navigate(PATH_MAIN_MENU)
      }}
    >
      <Text>This is the Notification Status Page</Text>
      <Text>Click to go back to the main menu</Text>
    </TouchableOpacity>
  )
}

export { NotificationStatus };
