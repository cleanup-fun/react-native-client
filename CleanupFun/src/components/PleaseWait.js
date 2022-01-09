import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { repeatedStyles } from "./repeated-styles";

import { translateKey } from "../translation/translate";

/*

Maybe add a loading animation
Perhaps give the person the option to just go to the main menu if it takes too long
Maybe have a fade in fade out animation
*/

function PleaseWait({ onExit }){
  const [timedOut, setTimedOut] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(()=>{
      setTimedOut(true);
    }, 10 * 1000)
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if(timedOut){
    return (
      <TouchableOpacity
        style={repeatedStyles.centeringContainer}
        onPress={()=>{ onExit && onExit() }}
      >
        <Text>{translateKey("PLEASE_WAIT_TIMEOUT")}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View
      style={repeatedStyles.centeringContainer}
    >
      <Text>{translateKey("PLEASE_WAIT")}</Text>
    </View>
  )
}

export { PleaseWait };
