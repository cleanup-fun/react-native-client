import React, { useEffect, useState, useContext, createContext } from "react";

export function createGenericContext(initialValue){
  const GenericContext = createContext([initialValue, ()=>{}]);

  const useGeneric = function(){
    return useContext(GenericContext);
  };

  const GenericContextProvider = function({ force, value, children }){
    const [state, setState] = useState(void 0);
    useEffect(()=>{
      if(force) return setState(value);
      if(typeof value !== "undefined") return setState(value);
    }, [value, force]);
    return (
      <GenericContext.Provider value={[state, setState]} >
        { children }
      </GenericContext.Provider>
    );
  };
  return {
    Context: GenericContext,
    use: useGeneric,
    Provider: GenericContextProvider,
  };
}
