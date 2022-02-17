import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { TranslatedText } from "../../global-vars/translation";
import { repeatedStyles } from "../repeated-styles";


function LoadMoreCards({ onRequestExit }){
  return (
    <TouchableOpacity
      style={{
        flex:1,
        backgroundColor: "#000000",
        alignSelf: 'stretch',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: "center"
      }}
      onPress={()=>{ onRequestExit && onRequestExit(); }}
    >
      <TranslatedText
        style={{ fontWeight: '700', fontSize: 18, color: 'gray' }}
        tPath="LOADMORECARDS_NOTICE"
      />
      <TranslatedText
        style={{ fontWeight: '700', fontSize: 18, color: 'gray' }}
        tPath="LOADMORECARDS_CALL_TO_ACTION"
      />
    </TouchableOpacity>
  );
}


export { LoadMoreCards };
