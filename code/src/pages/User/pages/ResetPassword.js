import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/pages/User/ResetPassword.js";
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

export function ResetPassword(){
  const navigate = useNavigator();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const [email, setEmail] = useState(params.get("email") || "");
  const [code, setCode] = useState(params.get("code") || "");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
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
        <Text>Code: </Text>
        <TextInput
          style={repeatedStyles.input}
          value={code}
          onChangeText={(newValue)=>(setCode(newValue))}
        />
      </View>
      <View style={repeatedStyles.kvPair}>
        <Text>Password: </Text>
        <TextInput
          style={repeatedStyles.input}
          autoComplete="password-new"
          value={password}
          onChangeText={(newValue)=>(setPassword(newValue))}
        />
      </View>
      <View style={repeatedStyles.kvPair}>
        <Text>Repeat the Password: </Text>
        <TextInput
          style={repeatedStyles.input}
          autoComplete="password-new"
          value={repeatedPassword}
          onChangeText={(newValue)=>(setRepeatedPassword(newValue))}
        />
      </View>
      <Button
        onPress={async ()=>{
          await user.resetPassword({
            email, code, password, repeatedPassword
          });
          navigate(PATH_USER_MENU);
        }}
        title="Send Code to Email"
        accessibilityLabel="A Code will be sent to your email, from there you can set your password"
      />
    </View>
  );
}
