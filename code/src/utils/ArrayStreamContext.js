import { createLatestItemContext } from "./LatestItemContext";

export function createArrayStreamContext(){
  const ArrayStreamContextObj = createLatestItemContext();
  return {
    Context: ArrayStreamContextObj.Context,
    use: (index, currentPage)=>{
      const { item, readableStream, ended } = ArrayStreamContextObj.use();
      if(typeof index === "number"){
        const retIndex = (
          !currentPage ? 0 :
          readableStream.offset - readableStream.lastStep
        ) + index;
        return item[retIndex];
      }
      return {
        array: item,
        readableStream,
        ended,
      };
    },
    Provider: ArrayStreamContextObj.Provider,
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
