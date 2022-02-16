import { polyfillGlobal } from "react-native/Libraries/Utilities/PolyfillFunctions";

const { ReadableStream } = require("web-streams-polyfill/ponyfill/es6");
polyfillGlobal("ReadableStream", () => ReadableStream);

import "fastestsmallesttextencoderdecoder";

process.nextTick = function(cb, ...args){
  Promise.resolve().then(()=>(
    cb(...args)
  ));
};
