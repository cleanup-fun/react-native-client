
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
        console.log("clicked");
        onFinish && onFinish()
      }}
    >
      <Text>This should be Admob</Text>
      <Text>Click to continue</Text>
    </TouchableOpacity>
  )
}

export { AdMobAd };
