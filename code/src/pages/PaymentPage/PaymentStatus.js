import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import { PleaseWait } from "../../components/PleaseWait";

import { UserContext } from "cleanupfun/src/global-vars/user";
import { SERVER_ORIGIN } from "cleanupfun/src/constants";
import { TranslatedText, TranslatedTimestamp } from "cleanupfun/src/global-vars/translation";

const WEEK = 7 * 24 * 60 * 60 * 1000;

export function PaymentStatus(){
  const user = useUser();
  const [paymentStatusObj, setPaymentStatusObj] = useState(null);

  useEffect(()=>{
    user.fetchJSON("/payment/status")
    .then(async (json)=>{
      setPaymentStatusObj(json);
    });
  }, [user]);

  if(paymentStatusObj === null){
    return (<PleaseWait />);
  }
  const { now, paymentStatus } = paymentStatusObj;
  console.log(paymentStatus);
  if(paymentStatus.status === "new"){
    return (
      <View>
        <TranslatedText tPath="PAYMENT_PAGE_YOU_HAVENT_PAID_YET" />
      </View>
    );
  }
  if(paymentStatus.status === "bad"){
    return (
      <View>
        <TranslatedText tPath="PAYMENT_PAGE_YOUR_IN_DEBT" />
      </View>
    );
  }
  const { timeBalance, startDate } = paymentStatus;
  const diff = timeBalance - (now - startDate);
  if(diff <= 0){
    return (
      <View stye={{ display: "flex", flexDirection: "column" }}>
        <TranslatedText tPath="PAYMENT_PAGE_EXPIRED" />
        <TranslatedTimestamp timestamp={diff} />
      </View>
    );
  }
  if(diff < WEEK){
    return (
      <View stye={{ display: "flex", flexDirection: "column" }}>
        <TranslatedText tPath="PAYMENT_PAGE_EXPIRING_SOON" />
        <TranslatedTimestamp timestamp={diff} />
      </View>
    );
  }
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <TranslatedText tPath="PAYMENT_PAGE_NO_WORRIES" />
      <TranslatedTimestamp timestamp={diff} />
    </View>
  );
}
