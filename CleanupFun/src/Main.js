
import React, {useState} from "react";
import { AdSwiperSwitcher } from "./components/AdSwiperSwitcher";

// import { RandomFileItems } from "./database/file-items/random-file-items";
import { UnmarkedFileItems } from "./database/file-items/unmarked-file-items"

function Main(){
  const [fileItemsobject, setFileItemsObject] = useState(new UnmarkedFileItems())
  return (
    <LanguageContextProvider>
      <AdSwiperSwitcher
        fileItemsObject={fileItemsobject}
      />
    </LanguageContextProvider>
  )
}


export { Main }
