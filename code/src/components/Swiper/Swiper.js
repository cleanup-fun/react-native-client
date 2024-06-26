import { UNDEFINED } from "cleanupfun/src/global-vars/constants";

import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/components/Swiper/Swiper.js"
const logger = new KeyedLogger(FILE_NAME)

import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import CardStack from 'react-native-card-stack-swiper';

import { styles } from "./styles";
import { NoMoreFiles } from "./NoMoreFiles"
import { LoadMoreCards } from "./LoadMoreCards";
import { SwiperCard } from "./SwiperCard"

import TrackPlayer from "react-native-track-player";
import { clearTmpDir } from "cleanupfun/src/global-vars/file-handler";
import {
  useActiveItem,
  ActiveItemProvider
} from "./ActiveItemContext";

import { useFileItems } from "../../database/file-items/FileItemsContext";

export function Swiper(props){
  return (
    <ActiveItemProvider value={0}>
      <SwiperNoContext {...props} />
    </ActiveItemProvider>
  )
}

function SwiperNoContext({
  onLoadMoreCards,
  hasMoreItems,
  onNoMoreFiles,
  onSwipedRight,
  onSwipedLeft
}){
  const swiperRef = useRef();
  const [currentCard, setCurrentCard] = useActiveItem();
  const [trackPlayerReady, setTrackPLayerReady] = useState(false);
  const { fileItems, ended } = useFileItems();

  useEffect(()=>{
    logger.log("destroying and recreating")
    TrackPlayer.destroy();
    TrackPlayer.setupPlayer({}).then((player)=>{
      setTrackPLayerReady(true);
    });
    return ()=>{
      logger.log("destroy trackplayer");
      TrackPlayer.stop();
      TrackPlayer.destroy();
      clearTmpDir();
    };
  }, []);

  if(ended){
    return (
      <NoMoreFiles
        onRequestExit={()=>{ onNoMoreFiles && onNoMoreFiles(); }}
      />
    );
  }

  if(!trackPlayerReady) return null;

  return (
    <View style={{flex:1}} >
      <CardStack
        ref={swiperRef}
        style={styles.content}
        renderNoMoreCards={() => {
          return (
            <LoadMoreCards
              onRequestExit={()=>{
                currentCard === fileItems.length
                &&
                onLoadMoreCards();
              }}
            />
          )
        }}
        verticalSwipe={false}
        onSwipedRight={(index) => {
          logger.log('onSwipedRight, right good')
          setCurrentCard(currentCard + 1);
          onSwipedRight(index);
        }}
        onSwipedLeft={(index) => {
          logger.log('onSwipedLeft, left bad')
          setCurrentCard(currentCard + 1);
          onSwipedLeft(index);
        }}
      >
        {
          fileItems.map((fileItem, index)=>{
            logger.log("are we current?", fileItem, index, currentCard);
            return (
              <SwiperCard
                key={fileItem.fileuri}
                fileItem={fileItem}
                index={index}
              />
            );
          })
        }
      </CardStack>
      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.red]} onPress={() => {
            swiperRef.current.swipeLeft();
          }}>
            <Image source={require('../../../assets/red.png')} resizeMode={'contain'} style={{ height: 62, width: 62 }} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.orange]} onPress={() => {
            if(currentCard > 0){
              setCurrentCard(currentCard - 1);
              swiperRef.current.goBackFromBottom();
            }
          }}>
            <Image source={require('../../../assets/back.png')} resizeMode={'contain'} style={{ height: 32, width: 32, borderRadius: 5 }} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.green]} onPress={() => {
            swiperRef.current.swipeRight();
          }}>
            <Image source={require('../../../assets/green.png')} resizeMode={'contain'} style={{ height: 62, width: 62 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
