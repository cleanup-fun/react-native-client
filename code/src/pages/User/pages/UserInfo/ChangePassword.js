import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/pages/User/UserInfo";
const logger = new KeyedLogger(FILE_NAME);

import React, { useState } from "react";
import { useUser } from "../../../../global-vars/user";
import {
  Text,
  View,
  TextInput,
  Button,
} from "react-native";

export function ChangePassword(){
  const user = useUser();
  const [originalPassword, setOriginalPassword] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <View>
        <Text>Original Password: </Text>
        <TextInput
          autoComplete="password-new"
          value={originalPassword}
          onChangeText={(newValue)=>(setOriginalPassword(newValue))}
        />
      </View>
      <View>
        <Text>Password: </Text>
        <TextInput
          autoComplete="password-new"
          value={password}
          onChangeText={(newValue)=>(setPassword(newValue))}
        />
      </View>
      <View>
        <Text>Repeat the Password: </Text>
        <TextInput
          autoComplete="password-new"
          value={repeatedPassword}
          onChangeText={(newValue)=>(setRepeatedPassword(newValue))}
        />
      </View>
      <Button
        onPress={async ()=>{
          user.changePassword({
            originalPassword, password, repeatedPassword,
          });
        }}
        title="Reset Password"
        accessibilityLabel="Reset your password. Useful if you're worried someone has found it out or you just want to be safe."
      />
    </View>
  );
}
