
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
} from 'react-native';

import { PleaseWait } from "../PleaseWait"

import { NoInternetAd } from "./Ads/NoInternetAd";
import { UserHasPaidAd } from "./Ads/UserHasPaidAd";
import { AdMobAd } from "./Ads/AdMobAd";

import {
  checkConnectivity
} from "./checks/checkConnectivity"

import {
  checkPaidStatus
} from "./checks/checkPaidStatus"

function Advertisement({onFinish}){
  const [loaded, setLoaded] = useState(false);
  const [noInternet, setNoInternet] = useState(false)
  const [userHasPaid, setUserHasPaid] = useState(false)

  useEffect(()=>{
    async function prepareAd(){
      const isConnected = await checkConnectivity();
      if(!isConnected){
        setLoaded(true);
        setNoInternet(true);
        return;
      }

      const paidStatus = await checkPaidStatus();
      if(paidStatus){
        setLoaded(true);
        setUserHasPaid(true);
        return
      }

      setLoaded(true);
    }
    prepareAd();
  }, []);

  if(!loaded){
    return (
      <PleaseWait />
    )
  }

  if(noInternet){
    return (
      <NoInternetAd
        onFinish={()=>{
          onFinish && onFinish();
        }}
      />
    )
  }

  if(userHasPaid){
    return (
      <UserHasPaidAd
        onFinish={()=>{
          onFinish && onFinish();
        }}
      />
    )
  }

  return (
    <AdMobAd
      onFinish={()=>{
        onFinish && onFinish();
      }}
    />
  )
}

export { Advertisement };
