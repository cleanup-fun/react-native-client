import React from 'react';
import {
  Views,
  Text,
  TouchableOpacity,
} from 'react-native';

import { TranslatedText } from "../../global-vars/translation";

import { repeatedStyles } from "../repeated-styles";


function NoMoreFiles({ onRequestExit }){
  return (
    <TouchableOpacity
      style={repeatedStyles.centeringContainer}
      onPress={()=>{ onRequestExit && onRequestExit() }}
    >
      <TranslatedText tPath="NOMOREFILES_NOTICE" />
      <TranslatedText tPath="NOMOREFILES_CALL_TO_ACTION" />
    </TouchableOpacity>
  )
}

export { NoMoreFiles };
