import { KeyedLogger } from "cleanupfun/src/global-vars/logger";
const FILE_NAME = "/pages/PaymentPage"
const logger = new KeyedLogger(FILE_NAME)

import React, { useEffect, useContext } from "react";
import { UserContext } from "cleanupfun/src/global-vars/user";
import { TranslatedText } from "cleanupfun/src/global-vars/translation";

import { View } from "react-native";

import { repeatedStyles } from "../../components/repeated-styles";

import { useNavigate } from "react-router-native";

import { PATH_PAYMENT_PAGE, PATH_USER } from "../../router/route-constants";
import { BuyMoreTime } from "./BuyMoreTime";
import { PaymentStatus } from "./PaymentStatus";

function PaymentPage(){
  const navigate = useNavigate();
  const user = useContext(UserContext);

  useEffect(()=>{
    if(user === null){
      navigate.replace(
        PATH_USER + "?redirect=" + encodeURIComponent(PATH_PAYMENT_PAGE),
      );
    }
  }, [navigate, user]);
  return (
    <View style={repeatedStyles.centeringContainer}>
      <View>
        <TranslatedText key="PAYMENT_PAGE_HEADER" />
      </View>
      <BuyMoreTime />
      <PaymentStatus />
    </View>
  );
}

export { PaymentPage };
