# Cleanup Fun

## Getting Started

### Client
- cd ./CleanupFun
- npm i
- in one terminal
  - `npx react-native start`
- in a seperate terminal
  - if testing ios
    - `npm run ios`
  - if testing android
    - `npm run android`

### Server
- ./server/development/setup-ngrok.sh
- [install docker](https://docs.docker.com/desktop/)
- [install docker-compose](https://docs.docker.com/compose/install/)
- In one terminal
  - `sudo docker-compose -f ./server/development/docker-compose/docker-compose.yml`
- In a seperate terminal
  - `./server/development/mac/ngrok http 5000`
  - Copy the url in ngrok to check it out!


## Purpose

People run out of data and don't always want to upload it to the cloud. Some pictures are duplicates or unnecessary and don't need to be saved.

- This app gives the ability for the person to delete files easily?
- Maybe just create a local database that stores which files should be transferred to an external database if it connects to a computer
  - interacts with file vacuum?

## Does it make money?

- Ads: The plan is to add ads when the application starts and every 10 pictures viewed.
  - Issue: what happens when someone isn't connected to the internet?
    - Create a 10 second timer to simulate an advertisement? Is 10 too short? Maybe 15?
      - Should we add an animation or a song? Can the person set the song?
        - If we add a song we need to ensure that its free to use so we don't have to pay royalties
        - Although it would be nice if I could pay the person a chunk of change just because its the right thing to do
        - maybe ask christian to make a fun 15 second song
- Direct: People can also pay a certain amount to ignore ads for a month.
  - Issue: how do we store it?
    - If we store it locally then its something the person can simply just edit
    - Maybe we create a website that stores when a person has paid  
