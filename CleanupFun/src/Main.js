import React, {useState} from "react";
import { LanguageContextProvider } from "./translation/translate";
import { AdSwiperSwitcher } from "./components/AdSwiperSwitcher";

import { RandomFileItems } from "./database/file-items/random-file-items";

function Main(){
  const [fileItemsobject, setFileItemsObject] = useState(new RandomFileItems())
  return (
    <LanguageContextProvider>
      <AdSwiperSwitcher
        fileItemsObject={fileItemsobject}
      />
    </LanguageContextProvider>
  )
}


export { Main }
