import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/pages/User/UserMenu.js";
const logger = new KeyedLogger(FILE_NAME);

import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { useNavigator } from "cleanupfun/src/global-vars/navigator";
import { useUser } from "../../../global-vars/user";

import { PATH_USER_MENU, routeItems } from "../route-constants";
import { UserInfo } from "./UserInfo";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export const UserMenu = () => {
  const navigate = useNavigator();
  const user = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(user.isLoggedIn);

  useEffect(()=>{
    const ls = [
      user.listenToSignIn(()=>(setIsLoggedIn(true)), true),
      user.listenToSignOut(()=>(setIsLoggedIn(false)), true),
    ];
    return ()=>(ls.forEach((l)=>(l())));
  }, [user]);

  const routeItemsArray = Object.values(routeItems).concat({
    isLoggedIn: true,
    title: "Sign Out",
    onPress: async (nav)=>{
      await user.signOut();
      nav(PATH_USER_MENU);
    },
  });

  if(isLoggedIn) return (<UserInfo />);

  return (
    <View style={styles.container}>
      <FlatList
        data={routeItemsArray}
        renderItem={({ item }) => (
          item.path === PATH_USER_MENU ? null :
          item.isLoggedIn !== user.isLoggedIn ? null : (
            <TouchableOpacity
              key={item.key}
              onPress={()=>{
                logger.log("pressed a menu item: ", item.path);
                item.onPress ? item.onPress(navigate) : navigate(item.path);
              }}
            >
              <Text style={styles.item}>{item.title}</Text>
            </TouchableOpacity>
          )
        )}
      />
    </View>
  );
};
