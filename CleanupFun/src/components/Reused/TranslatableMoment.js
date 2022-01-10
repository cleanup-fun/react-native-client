
import React from "react";
import moment from 'moment';

import { translateKey } from "cleanupfun/src/global-vars/translation/translate.js";

const WEEK_IN_MILLISECONDS = 7 * 24 * 60 * 60 * 1000;

/*

Todo:
- Translate type of amount and ago
- Display date different depending on county
  - some countries are day month year
  - some countries don't use am/pm but rather 24 hour cycle

*/

function TranslateableMoment({ timestamp }){
  var momentTime = moment(markedTimestamp);
  const now = Date.now();
  if(now - markedTimestamp < WEEK_IN_MILLISECONDS){
    return momentTime.fromNow();
  }
  return momentTime.format("dddd, MMMM Do YYYY, h:mm:ss a");
}

export { TranslateableMoment };
