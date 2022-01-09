import React from 'react';
import {
  Views,
  Text,
  TouchableOpacity,
} from 'react-native';

import { translateKey } from "../../translation/translate";

import { repeatedStyles } from "../repeated-styles";


function NoMoreFiles({ onRequestExit }){
  return (
    <TouchableOpacity
      style={repeatedStyles.centeringContainer}
      onPress={()=>{ onRequestExit && onRequestExit }}
    >
      <Text>{translateKey("NOMOREFILES_NOTICE")}</Text>
      <Text>{translateKey("NOMOREFILES_CALL_TO_ACTION")}</Text>
    </TouchableOpacity>
  )
}

export { NoMoreFiles };
