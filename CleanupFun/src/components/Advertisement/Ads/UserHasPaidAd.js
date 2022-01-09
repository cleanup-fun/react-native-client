
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { repeatedStyles } from "../../repeated-styles";


function UserHasPaidAd({onFinish}){
  return (
    <TouchableOpacity
      style={repeatedStyles.centeringContainer}
      onPress={()=>{ onFinish && onFinish() }}
    >
      <Text>You have paid</Text>
      <Text>Click to continue</Text>
    </TouchableOpacity>

  )
}

export { UserHasPaidAd };
