import React, { useContext } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { repeatedStyles } from "../components/repeated-styles";

import { useNavigate } from "react-router-native";

import { PATH_MAIN_MENU } from "../router/route-constants";


function UserPage(){

}

function Login(){

}

function Register(){

}

function LoginOrRegister(){
  const navigate = useNavigate();

  return (
    <TouchableOpacity
      style={repeatedStyles.centeringContainer}
      onPress={() => {
        console.log("clicked");
        navigate(PATH_MAIN_MENU);
      }}
    >
      <Text>This is the Login or Register Page</Text>
      <Text>Click to go back to the main menu</Text>
    </TouchableOpacity>
  )
}


export { LoginOrRegister };
