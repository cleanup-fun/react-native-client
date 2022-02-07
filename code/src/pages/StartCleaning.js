import React, {useState, useContext} from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { LanguageContextProvider } from "../translation/translate";
import { translateKey } from "../global-vars/translation/translate.js";
import { AdSwiperSwitcher } from "../components/AdSwiperSwitcher";


// import { RandomFileItems } from "./database/file-items/random-file-items";
import { CameraRollFileItems } from "../database/file-items/cameraroll-file-items"
import { DirectoryFileItems } from "../database/file-items/directory-file-items"

const textStyle = {
  backgroundColor: "#AAA",
  padding: 10,
  margin: 5,
  borderRadius: 5,
  width: "100%",
  textAlign: "center",
}


function StartCleaning(){
  // not used here
  const [fileItemsobject, setFileItemsObject] = useState(null);
  if(fileItemsobject === null){
    return (
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "stretch",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <TouchableOpacity
          onPress={()=>{
            setFileItemsObject(new CameraRollFileItems());
          }}
        >
          <Text style={textStyle}>{translateKey("CLEAN_FROM_CAMERAROLL")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>{
            setFileItemsObject(new DirectoryFileItems());
          }}
        >
          <Text
            style={textStyle}
          >{translateKey("CLEAN_FROM_DIRECTORY")}</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
      <AdSwiperSwitcher
        fileItemsObject={fileItemsobject}
        onExit={()=>{
          setFileItemsObject(null);
        }}
      />
  )
}


export { StartCleaning }
