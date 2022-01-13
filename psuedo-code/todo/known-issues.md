- ./src/database/file-items/marked-file-items loads the entire database into memory and then proceeds to sort and filter it
  - it would probably be better if this was done by a database

- moment displays X minutes ago
  - when translating I have
    - to get the number and keep it (I don't have to translate that)
    - get whether seconds, minutes, hours, days etc and translate that to the correct language
    - translate "ago"
    - Put it in the right order depending on the languages grammer
      - english its Subject Verb Object
      - japanese its Subject Object Verb


- I'm displaying the moment date as month day year when most of the world is day month year

- I'm using a bunch of touchable opacities

- I Got a bunch of Text that needs to be handled through i18Next


- instead of calling it "file items" i should call it "paginated file items"


- SOLVED - Every time the list is reloaded from the FileListItem Swiper, it adds an additional item that wasn't there before
  - This technically allows the user to incrementally view new items

- When reloading the FileItemsList, always returns to the top of the screen
  - I've tried to save the currentIndex by creating a listener but that doesn't seem to work


- Storing the whole document instead of just a link to the primary key may cause issues

- currently the database only supports unique indexes
