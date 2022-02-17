import React, { useState, useEffect, createContext, useContext } from "react";
import { createGenericContext } from "./GenericContext";

export function createLatestItemContext(){
  const LatestItemContext = createContext({});
  return {
    Context: LatestItemContext,
    use: function useLatestItem(){
      return useContext(LatestItemContext);
    },
    Provider: factoryLatestItemProvider(LatestItemContext),
  };
}

function factoryLatestItemProvider(LatestItemContext){
  return function LatestItemProvider({ readableStream, children }){
    // const [prevListener, setPrevListener] = useState(void 0);
    // const [prevChangable, setPrevChangable] = useState(void 0);
    const [item, setItem] = useState(void 0);
    const [hasEnded, setHasEnded] = useState(false);
    useEffect(()=>{
      if(!readableStream) return;
      const dl = (newItem)=>(setItem(newItem));
      const el = ()=>(setHasEnded(true));

      readableStream.on("data", dl);
      readableStream.on("end", el);

      // I got to test this
      return ()=>(
        readableStream.off("data", dl),
        readableStream.off("end", el)
      );
    }, [readableStream]);
    return (
      <LatestItemContext.Provider value={{ item, readableStream, ended: hasEnded }}>
        {children}
      </LatestItemContext.Provider>
    );
  };
}

/*
function useFileItems(index){
  const fileItems = useContext(Context);
  if(typeof index === "number") return fileItems[index];
  return fileItems;
}

function FileItemProvider(){
  const [items, setItems] = useState([]);
  useEffect(()=>{
    const l = async ()=>{
      setFileItems(await fileItems.refresh())
    }
    l();
    fileItems.on("update", l)
    return ()=(fileItems.off("update", l));
  }, []);
  return (
    <Context.Provider value={items}>
    </Context.Provider>
  )
}


*/
