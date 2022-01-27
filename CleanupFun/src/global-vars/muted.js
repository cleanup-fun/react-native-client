import React from "react";
import { createContext, useState } from "react";

const MutedContext = createContext([true, ()=>{}]);

function MutedContextProvider({ children }){
  const [muted, setMuted] = useState(false);
  return (
    <MutedContext.Provider value={[muted, setMuted]}>
      {children}
    </MutedContext.Provider>
  );
}

export { MutedContextProvider, MutedContext };
