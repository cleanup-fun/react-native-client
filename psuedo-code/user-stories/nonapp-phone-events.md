# NonApp Phone Events

- When a new file is saved
  - If (AvailableStorage < 10%) - Send "Your Storage is dangerously low. Lets do a bit of cleanup ;)"
  - else if (AvailableStorage < 25%) - "Your Storage isn't looking too hot. Some cleanup fun may not be a bad idea"
  - else if (AvailableStorage - filesize > 50% && AvailableStorage < 50%) - Send "Your current Current Storage is less than 50%. Cleanup may not be necessary but it probably wouldn't hurt :)"
- When a file is deleted
  - check if the file was in the local database
    - if yes - delete the entry from the local database
- When a file is renamed
  - check if the file's old name is in the local database
    - if yes - update the entries name in to the new name
