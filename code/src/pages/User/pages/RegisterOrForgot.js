import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/pages/User/RegisterOrForgot.js";
const logger = new KeyedLogger(FILE_NAME);

import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
} from "react-native";
import { useUser } from "../../../global-vars/user";
import { TranslatedText } from "cleanupfun/src/global-vars/translation";

import { repeatedStyles } from "cleanupfun/src/styles";

import { useNavigator } from "cleanupfun/src/global-vars/navigator";

import { PATH_RESET_PASSWORD } from "../route-constants";

export function RegisterOrForgot(){
  const navigate = useNavigator();
  const [email, setEmail] = useState("");
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
      <Button
        onPress={async ()=>{
          await user.registerOrForgot({ email });
          navigate(PATH_RESET_PASSWORD + "?email=" + email);
        }}
        title="Send Code to Email"
        accessibilityLabel="A Code will be sent to your email, from there you can set your password"
      />
      <View>
        <TranslatedText tPath="USER_WHY_REG_FOR" />
      </View>
    </View>
  );
}
