import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/pages/PaymentPage";
const logger = new KeyedLogger(FILE_NAME);

import React, { useEffect, useContext } from "react";
import { useUser } from "cleanupfun/src/global-vars/user";
import { TranslatedText } from "cleanupfun/src/global-vars/translation";

import { View } from "react-native";

import { repeatedStyles } from "../../components/repeated-styles";

import { useNavigator } from "cleanupfun/src/global-vars/navigator";

import { PATH_PAYMENT_PAGE, PATH_USER } from "../../router/route-constants";
import { PATH_LOGIN } from "../User/route-constants";
import { BuyMoreTime } from "./BuyMoreTime";
import { PaymentStatus } from "./PaymentStatus";

function PaymentPage(){
  const navigate = useNavigator();
  const user = useUser();

  useEffect(()=>{
    if(!user.isLoggedIn) return;
    navigate.replace(
      PATH_LOGIN + "?redirect=" + encodeURIComponent(PATH_PAYMENT_PAGE),
    );
  }, [navigate, user]);
  if(!user.isLoggedIn) return null;
  return (
    <View style={repeatedStyles.centeringContainer}>
      <View>
        <TranslatedText tPath="PAYMENT_PAGE_HEADER" />
      </View>
      <BuyMoreTime />
      <PaymentStatus />
    </View>
  );
}

export { PaymentPage };
