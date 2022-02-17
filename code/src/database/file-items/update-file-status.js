import { getFakeDB } from "../storage/fake/fakeDB";

export async function updateFileStatus(walkable, fileuri, shouldStore){
  var db = await getFakeDB();
  var oldValue = await db.getItem("fileuri", fileuri);
  var newValue = {
    markedTimestamp: Date.now(),
    filename: fileuri.split(/(\\|\/)/g).pop(),
    fileuri: fileuri,
    shouldStore: shouldStore
  };
  if(oldValue){
    await db.updateItem(oldValue, newValue);
  } else {
    await db.addItem(newValue);
  }
  walkable.updateAllItemsMatching(
    (otherItem)=>(otherItem.fileuri === fileuri),
    (oldItem)=>(newValue)
  );
}
