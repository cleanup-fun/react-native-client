# TrackPlayer

- There is a maximum amount of tracks
  - That number will probably never be reached but still something to consider
- When seeking to the end of an audio track, goes to the next track
- can't seek past the buffer it seems

# Possible Issues
- When going to the next track
  - I don't w
- When Unmounting the swiper
  - Gets all tracks then removes all tracks
  - If a newly mounted component adds a track before the remove function gets called
    - then their newly added track gets removed
  - I need to be able to create a lock
    - If removingAll, added track must wait until removing all is finished
    - if adding, removing must wait for add to finish
- After removing all items from track player, the index may not reset to zero
  - newly added tracks may get indexes higher than the previous
  - This means that I may have to destroy and recreate it
- When updating the pause/play for an active item
  - they have not skipped to the correct track
  - As a result, they may be handling an old track
  - I would prefer not to wrap everything

# Solved
- When Unmounting the card stack with audio items
    - I am removing the track based off index
      - but as each gets removed the tracks index may change
    - I'm just destroying the TrackPlayer on unmount and recreating on mount
- When a player switches from an audioItem to the next item
  - General Description
    - if the next item is audio, no problem
      - The next item will handle the logic
    - else
      - The audio is likely to play in the background until either
        - A next audio item is found
        - The swiper component is fully unmounted
  - solution
    - When the audio item goes from active to inactive
      - stop the audio
    - When the audio item goes from inactive to active
      - seek to the track index
      - if !muted - play
    - but what if the stop happens after the seek and play?
      - the seek must wait for the stop
      - does the stop need to wait for the seek?
        - So the person would go to the card then quickly exit
        - The stop may happen before the seek, yes, it need
