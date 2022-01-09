import React, { useContext } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { useNavigate } from "react-router-native";

import { repeatedStyles } from "../components/repeated-styles";

import { PATH_MAIN_MENU } from "../router/route-constants";



function BrowseSwiped(){
  const navigate = useNavigate()

  return (
    <TouchableOpacity
      style={repeatedStyles.centeringContainer}
      onPress={() => {
        console.log("clicked");
        navigate(PATH_MAIN_MENU)
      }}
    >
      <Text>This is the Browse Swiped Page</Text>
      <Text>Click to go back to the main menu</Text>
    </TouchableOpacity>
  )
}

export { BrowseSwiped };
