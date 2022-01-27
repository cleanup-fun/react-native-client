# File items

- ./src/database/file-items/marked-file-items loads the entire database into memory and then proceeds to sort and filter it
  - it would probably be better if this was done by a database
- instead of calling it "file items" i should call it "paginated file items"
- When reloading the FileItemsList, always returns to the top of the screen
  - I've tried to save the currentIndex by creating a listener but that doesn't seem to work
  - I believe this is solved on my main computer


# SOLVED

- Every time the list is reloaded from the FileListItem Swiper, it adds an additional item that wasn't there before
  - This technically allows the user to incrementally view new items
