import React, { useEffect, useState } from "react";
import { WalkableStream } from "../../utils/WalkableStream";
import { createArrayStreamContext } from "../../utils/ArrayStreamContext";
import { updateFileStatus } from "./update-file-status";
const FileItemsContextObj = createArrayStreamContext();

export const FileItemsContext = FileItemsContextObj.Context;
export const useFileItems = (index)=>{
  if(typeof index === "number"){
    return FileItemsContextObj.use(index, true);
  }
  const obj = FileItemsContextObj.use();
  obj.updateFileStatus = (fileuri, shouldStore)=>(
    updateFileStatus(obj.readableStream, fileuri, shouldStore)
  );
  obj.fileItemsObject = obj.readableStream;
  obj.fileItems = obj.array;
  // console.log(obj);
  return obj;
};

export function FileItemsProvider({ readableStream, children }){
  const [transformStream, setTransformStream] = useState();
  useEffect(()=>{
    const newTransform = new WalkableStream();
    setTransformStream(newTransform);
    readableStream.pipe(newTransform);
    return ()=>(
      readableStream.unpipe(newTransform)
    );
  }, [readableStream]);
  return (
    <FileItemsContextObj.Provider readableStream={transformStream}>
      {children}
    </FileItemsContextObj.Provider>
  );
}
