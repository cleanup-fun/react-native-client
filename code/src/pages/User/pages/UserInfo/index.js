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

import { repeatedStyles } from "../../../../components/repeated-styles";

import { useNavigator } from "cleanupfun/src/global-vars/navigator";

import { PATH_USER_MENU } from "../../route-constants";

import { PaymentStatus } from "./PaymentStatus";
import { BuyMoreTime } from "./BuyMoreTime";
import { ChangePassword } from "./ChangePassword";

export function UserInfo(){
  const navigate = useNavigator();
  const user = useUser();

  return (
    <View style={repeatedStyles.centeringContainer} >
      <View>
        <Text>Email: {user.email}</Text>
      </View>
      <View>
        <Button
          onPress={async ()=>{
            await user.signOut();
            navigate(PATH_USER_MENU);
          }}
          title="Log out"
          accessibilityLabel="Log out as the current user. Important if you don't want another person to know your information"
        />
      </View>
      <PaymentStatus />
      <BuyMoreTime />
      <ChangePassword />
    </View>
  );
}
