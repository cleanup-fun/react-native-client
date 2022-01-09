import { UNDEFINED } from "../../CONSTANTS";
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
import { SwiperCardImage } from "./SwiperCardImage"


function Swiper({ fileItems, onLoadMoreCards, onNoMoreFiles, onSwipedRight, onSwipedLeft }){
  const swiperRef = useRef();

  if(fileItems.length === 0){
    return (
      <NoMoreFiles
        onRequestExit={()=>{ onNoMoreFiles && onNoMoreFiles(); }}
      />
    )
  }

  return (
    <View style={{flex:1}} >
      <CardStack
        ref={swiperRef}
        style={styles.content}
        renderNoMoreCards={() => {
          return (
            <LoadMoreCards
              onRequestExit={()=>{ onLoadMoreCards && onLoadMoreCards(); }}
            />
          )
        }}
        verticalSwipe={false}
        onSwipedRight={(index) => {
          console.log('onSwipedRight, right good')
          onSwipedRight && onSwipedRight(index);
        }}
        onSwipedLeft={(index) => {
          console.log('onSwipedLeft, left bad')
          onSwipedLeft && onSwipedLeft(index);
        }}
      >
        {
          fileItems.map((fileItem)=>{
            return ( <SwiperCardImage
              key={fileItem.fileuri}
              fileItem={fileItem}
            /> );
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
            swiperRef.current.goBackFromLeft();
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

export { Swiper };
