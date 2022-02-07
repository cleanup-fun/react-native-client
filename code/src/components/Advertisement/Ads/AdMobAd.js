import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/components/Advertisement/Ads/AdMobAd.js"
const logger = new KeyedLogger(FILE_NAME)

import React from 'react';

import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { repeatedStyles } from "../../repeated-styles";


function AdMobAd({onFinish}){
  return (
    <TouchableOpacity
      style={repeatedStyles.centeringContainer}
      onPress={() => {
        logger.log("clicked");
        onFinish && onFinish()
      }}
    >
      <Text>This should be Admob</Text>
      <Text>Click to continue</Text>
    </TouchableOpacity>
  )
}

export { AdMobAd };
