import React, { useState, useEffect } from "react";
var FS = require("react-native-fs");

import {
  ScrollView, Text,
} from "react-native";

import { styles } from "../../styles";

export function TextItem({ style, fileuri }){
  const [text, setText] = useState(null);
  useEffect(()=>{
    FS.readFile(fileuri).then((string)=>{
      setText(string);
    });
  }, [fileuri]);
  if(text === null){
    return null;
  }
  return (
    <ScrollView style={[styles.swiperCardItem, style]}>
      <Text>{text}</Text>
    </ScrollView>
  );
}
