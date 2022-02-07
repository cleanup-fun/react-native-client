import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/pages/MainMenu.js"
const logger = new KeyedLogger(FILE_NAME)

import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { useNavigate } from "react-router-native";

import { PATH_MAIN_MENU, routeItems } from "../router/route-constants";

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const MainMenu = () => {
  const navigate = useNavigate();
  const routeItemsArray = Object.values(routeItems);

  return (
    <View style={styles.container}>
      <FlatList
        data={routeItemsArray}
        renderItem={({item}) => (
          item.path === PATH_MAIN_MENU ? null : (
            <TouchableOpacity
              key={item.key}
              onPress={()=>{
                logger.log("pressed a menu item: ", item.path);
                navigate(item.path)
              }}
            >
              <Text style={styles.item}>{item.title}</Text>
            </TouchableOpacity>
          )
        )}
      />
    </View>
  );
}

export { MainMenu };
