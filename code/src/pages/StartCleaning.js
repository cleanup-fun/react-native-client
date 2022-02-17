import React, {useState, useContext} from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { TranslatedText } from "../global-vars/translation";
import { AdSwiperSwitcher } from "../components/AdSwiperSwitcher";


// import { RandomFileItems } from "./database/file-items/random-file-items";
import { CameraRollFileItems } from "../database/file-items/cameraroll-file-items"
import { DirectoryFileItems } from "../database/file-items/directory-file-items"
import { FileItemsProvider } from "../database/file-items/FileItemsContext";

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
          <TranslatedText
            style={textStyle}
            tPath="CLEAN_FROM_CAMERAROLL"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>{
            setFileItemsObject(new DirectoryFileItems());
          }}
        >
          <TranslatedText
            style={textStyle}
            tPath="CLEAN_FROM_DIRECTORY"
          />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <FileItemsProvider readableStream={fileItemsobject}>
      <AdSwiperSwitcher
        fileItemsObject={fileItemsobject}
        onExit={()=>{
          setFileItemsObject(null);
        }}
      />
    </FileItemsProvider>
  );
}

export { StartCleaning }
