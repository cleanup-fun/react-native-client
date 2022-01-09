import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { translateKey } from "../../translation/translate";
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
      <Text
        style={{ fontWeight: '700', fontSize: 18, color: 'gray' }}
      >{translateKey("LOADMORECARDS_NOTICE")}</Text>
      <Text
        style={{ fontWeight: '700', fontSize: 18, color: 'gray' }}
      >{translateKey("LOADMORECARDS_CALL_TO_ACTION")}</Text>
    </TouchableOpacity>
  );
}


export { LoadMoreCards };
