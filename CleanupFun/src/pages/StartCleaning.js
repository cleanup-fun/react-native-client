import React, {useState, useContext} from "react";
import { LanguageContextProvider } from "../translation/translate";
import { AdSwiperSwitcher } from "../components/AdSwiperSwitcher";

// import { RandomFileItems } from "./database/file-items/random-file-items";
import { UnmarkedFileItems } from "../database/file-items/unmarked-file-items"

function StartCleaning(){
  // not used here
  const [fileItemsobject, setFileItemsObject] = useState(new UnmarkedFileItems())
  return (
      <AdSwiperSwitcher
        fileItemsObject={fileItemsobject}
      />
  )
}


export { StartCleaning }
