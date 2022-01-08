# Roadmap


## Base
- Person Opens the app
- App gets the next 10 pictures
  - pictures are sorted by last access (not write) datetime ascending (oldest first)
  - hopefully we can set update the access, if not we can create a database and run a loop
- Each picture will be displayed in a lightbox
  - this allows the user to zoom and analyze the picture
- On swipe left - delete picture
  - If we have to store the access time in the database, delete it there as well
- On swipe left - save picture
- After the stack is finished, get the next 10


## Overall
- Person logs into the app
- Sort all the pictures by access datetime, oldest first
- App gets next X pictures from that list
  - Hopefully we can consider them accessed, if not we will have to save a database of pictures accessed
- Each card has a lightbox for the picture
  - This allows them to click the picture and zoom in to check it out
- Swipe Left - Delete
- Swipe Right - Save
- After the stack is done, get the next X pictures


## Important
- make the pictures come from photos
  - left save, right delete
- sort the pictures from oldest to newest
  - if the picture has already been viewed skip it
  - if all the pictures have been viewed, start from the beginning again
- Add in advertisements when
  - the application opens
  - each ten photos viewed


## Nice
- Notifications
  - When the person saves a file
    - If (AvailableStorage < 10%) - Send "Your Storage is dangerously low. Lets do a bit of cleanup ;)"
    - else if (AvailableStorage < 25%) - "Your Storage isn't looking too hot. Some cleanup fun may not be a bad idea"
    - else if (AvailableStorage - filesize > 50% && AvailableStorage < 50%) - Send "Your current Current Storage is less than 50%. Cleanup may not be necessary but it probably wouldn't hurt :)"
- Allow people to pay with paypal in order to skip ads
- allow people to connect with metamask
  - when somebody stars a picture, it gets uploaded with filecoin
  - if someone unstars it, delete if from filecoin
  - if theres no ether in the account


## Unecessary
- allow person to switch right and left saving and delete
- create a dark mode
- Add file storage statistics
- Support Music and Videos
