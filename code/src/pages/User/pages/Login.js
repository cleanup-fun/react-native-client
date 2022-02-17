import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/pages/User/Login.js";
const logger = new KeyedLogger(FILE_NAME);

import React, { useState } from "react";
import { useUser } from "../../../global-vars/user";
import {
  Text,
  View,
  TextInput,
  Button,
} from "react-native";

import { repeatedStyles } from "cleanupfun/src/styles";

import { useLocation } from "react-router-native";
import { useNavigator } from "cleanupfun/src/global-vars/navigator";

import { PATH_USER_MENU } from "../route-constants";

export function Login(){
  const navigate = useNavigator();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useUser();

  return (
    <View style={repeatedStyles.centeringContainer} >
      <View style={repeatedStyles.kvPair}>
        <Text>Email: </Text>
        <TextInput
          style={repeatedStyles.input}
          autoComplete="email"
          value={email}
          onChangeText={(newValue)=>(setEmail(newValue.toLowerCase()))}
        />
      </View>
      <View style={repeatedStyles.kvPair}>
        <Text>Password: </Text>
        <TextInput
          style={repeatedStyles.input}
          autoComplete="password"
          secureTextEntry={true}
          value={password}
          onChangeText={(newValue)=>(setPassword(newValue))}
        />
      </View>
      {!error ? null : <Text style={repeatedStyles.errorText}>{error}</Text>}
      <Button
        onPress={async ()=>{
          try {
            await user.login({
              email, password,
            });
            const redirect = params.get("redirect");
            console.log("trying to redirect:", redirect, PATH_USER_MENU);
            if(!redirect) return navigate(PATH_USER_MENU);
            navigate.replace(
              decodeURIComponent(redirect),
            );
          }catch(e){
            console.error(e);
            switch(e.message){
              case "user not found": {
                return setError(
                  "We don't have a user/password combination that you provided, are you sure everything is correct?",
                );
              }
              default:{
                return setError(
                  "We have an unknown issue. If this continues, feel free to contact support.",
                );
              }
            }
          }
        }}
        title="Login"
        accessibilityLabel="Login as the chosen email"
      />
    </View>
  );
}
