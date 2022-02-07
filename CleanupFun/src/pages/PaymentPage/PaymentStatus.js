import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import { PleaseWait } from "../../components/PleaseWait";

import { UserContext } from "cleanupfun/src/global-vars/user";
import { TranslatedText } from "cleanupfun/src/global-vars/translation";
import { TranslateableMoment } from "cleanupfun/src/components/Reused/TranslateableMoment";

import { SERVER_ORIGIN } from "cleanupfun/src/constants";

const WEEK = 7 * 24 * 60 * 60 * 1000;

export function PaymentStatus(){
  const user = useContext(UserContext);
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(()=>{
    fetch(SERVER_ORIGIN + "/payment-status/" + user.id)
    .then(async (res)=>{
      const json = await res.json();
      setPaymentStatus(json);
    });
  }, [user]);

  if(paymentStatus === null){
    return (<PleaseWait />);
  }
  if(!paymentStatus.date){
    return (
      <View>
        <TranslatedText key="PAYMENT_PAGE_YOU_HAVENT_PAID_YET" />
      </View>
    );
  }
  const now = Date.now();
  const diff = now - paymentStatus;
  if(diff <= 0){
    return (
      <View stye={{ display: "flex", flexDirection: "column" }}>
        <TranslatedText key="PAYMENT_PAGE_EXPIRED" />
        <TranslateableMoment typestamp={diff} />
      </View>
    );
  }
  if(diff < WEEK){
    return (
      <View stye={{ display: "flex", flexDirection: "column" }}>
        <TranslatedText key="PAYMENT_PAGE_EXPIRING_SOON" />
        <TranslateableMoment typestamp={diff} />
      </View>
    );
  }
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <TranslatedText key="PAYMENT_PAGE_NO_WORRIES" />
      <TranslateableMoment typestamp={diff} />
    </View>
  );
}
