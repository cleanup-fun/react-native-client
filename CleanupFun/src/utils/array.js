

export function replaceItem(array, newItem, test){
  for(var i = 0, l = array.length; i < l; i++){
    if(test(array[i])){
      return array.splice(0, 1, newItem);
    }
  }
  throw new Error("item not found");
}

export function removeItem(array, test){
  for(var i = 0, l = array.length; i < l; i++){
    if(test(array[i])){
      return array.splice(0, 1);
    }
  }
  throw new Error("item not found");
}
