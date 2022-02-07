import { UNDEFINED } from "cleanupfun/src/constants";

import { coloredLogger } from "./coloredLogger";

import {
  keylessLoggerConfig,
} from "./keyless-logger-config";

const {
  SINGLE_ARG_WARN,
  SINGLE_ARG_DISPLAY_TRACE,
  WHITE_LIST_USE,
  WHITE_LIST_WARN,
  WHITE_LIST_ERROR_MESSAGE,
  BLACK_LIST_USE,
  BLACK_LIST_WARN,
  BLACK_LIST_ERROR_MESSAGE,
  whitelist,
  blacklist,
  shouldShortenKeyForDisplay
} = keylessLoggerConfig;

function validateKey(key){
  if(typeof key !== "string"){
    throw new Error("the logger key must be a string, got: " + JSON.stringify(key));
  }
  if(WHITE_LIST_USE && !(whitelist.some((test)=>(runTest(test, key))))){
    if(WHITE_LIST_WARN){
      coloredLogger.warn("A key not found in the whitelist tried to log: ", key);
    }
    throw WHITE_LIST_ERROR_MESSAGE;
  }
  if(BLACK_LIST_USE && blacklist.some((test)=>(runTest(test, key)))){
    if(BLACK_LIST_WARN){
      coloredLogger.warn("A key found in the blacklist tried to log: ", key);
    }
    throw BLACK_LIST_ERROR_MESSAGE
  }
  return true;
}

function runTest(test, key){
  if(typeof test === "string"){
    return test === key;
  }
  if(test instanceof RegExp){
    return test.test(key);
  }
  throw new Error("invalid test: " + JSON.stringify(test));
}

function makeKeyPretty(key){
  if(shouldShortenKeyForDisplay){
    key = key.split("/").pop();
  }
  key += ":";
  return key;
}


function validateArgs(args){
  if(SINGLE_ARG_WARN && args.length === 1){
    coloredLogger.warn("There was a log with only the key: ", key)
    if(SINGLE_ARG_DISPLAY_TRACE){
      console.trace();
    }
  }
}


const KEYLESS_LOGGER = {
  log(key){
    try {
      validateKey(key)
    } catch(e){
      if(e !== BLACK_LIST_ERROR_MESSAGE && e !== WHITE_LIST_ERROR_MESSAGE){
        throw e;
      }
      return;
    }

    const args = Array.from(arguments);
    validateArgs(args);
    args[0] = makeKeyPretty(args[0]);
    coloredLogger.debug.apply(coloredLogger, args);
  },
  info(key){
    try {
      validateKey(key)
    } catch(e){
      if(e !== BLACK_LIST_ERROR_MESSAGE && e !== WHITE_LIST_ERROR_MESSAGE){
        throw e;
      }
      return;
    }

    const args = Array.from(arguments);
    validateArgs(args);
    args[0] = makeKeyPretty(args[0]);
    coloredLogger.info.apply(coloredLogger, args);
  },
  warn(key){
    try {
      validateKey(key)
    } catch(e){
      if(e !== WHITE_LIST_ERROR_MESSAGE && e !== BLACK_LIST_ERROR_MESSAGE){
        throw e;
      }
      return;
    }

    const args = Array.from(arguments);
    validateArgs(args);
    args[0] = makeKeyPretty(args[0]);
    coloredLogger.warn.apply(coloredLogger, args);
  },
  error(key){
    try {
      validateKey(key)
    } catch(e){
      if(e !== BLACK_LIST_ERROR_MESSAGE && e !== WHITE_LIST_ERROR_MESSAGE){
        throw e;
      }
      return;
    }

    const args = Array.from(arguments);
    validateArgs(args);
    args[0] = makeKeyPretty(args[0]);
    coloredLogger.error.apply(coloredLogger, args);
  }
}

export { KEYLESS_LOGGER }
