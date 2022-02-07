
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { repeatedStyles } from "../../repeated-styles";

function NoInternetAd({onFinish}){
  return (
    <TouchableOpacity
      style={repeatedStyles.centeringContainer}
      onPress={()=>{ onFinish && onFinish() }}
    >
      <Text>Your device is not connected to the internet</Text>
      <Text>Click to continue</Text>
    </TouchableOpacity>
  )
}

export { NoInternetAd };
