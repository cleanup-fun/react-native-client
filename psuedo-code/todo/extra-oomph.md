# Extra Oomph

- External file changes
  - https://github.com/itinance/react-native-fs/issues/321
  - listen for save event
    - If (AvailableStorage < 10%) - Send "Your Storage is dangerously low. Lets do a bit of cleanup ;)"
    - else if (AvailableStorage < 25%) - "Your Storage isn't looking too hot. Some cleanup fun may not be a bad idea"
    - else if (AvailableStorage - filesize > 50% && AvailableStorage < 50%) - Send "Your current Current Storage is less than 50%. Cleanup may not be necessary but it probably wouldn't hurt :)"
  - listen for delete event
    - have to update local database
  - listen for rename event
    - have to update local database


- handle custom url
  - allow external applications to interact.
  - not sure the purpose but...


- create a link to the phones datamanagement page
  - just allows the user to manage their data

- animation for swiper on the browser page


- When Device/Computer interaction
  - Allow the device application to tell the computer to open up the application
  - Allow the computer application to tell the device to open up the device application
  - Show a page on both the device application and showing
    - A preview picture
      - For the device application - a picture of the current image thats being moved
      - For the computer applications - the last picture that has been moved to the computer
    - Total Photos to be moved
    - Total Storage (In GB, MB, KB then Bytes) planning on moving
    - Total Photos that have been moved
    - Total Storage (In GB, MB, KB then Bytes) that has been moved
  - On the computer application
    - Have the option to retain the same folder structure as on the application
    - Have the option to choose what folder the images are going to be stored
  - The user has to say "READY" on both the computer and the device before it starts

- Allow the person to "swipe" off the main menu
