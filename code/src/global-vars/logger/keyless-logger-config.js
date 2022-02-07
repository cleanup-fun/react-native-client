

const keylessLoggerConfig = {
  SINGLE_ARG_WARN : true,
  SINGLE_ARG_DISPLAY_TRACE : false,

  WHITE_LIST_USE : false,
  WHITE_LIST_WARN : false,
  WHITE_LIST_ERROR_MESSAGE : "not in the white list",

  BLACK_LIST_USE : false,
  BLACK_LIST_WARN : false,
  BLACK_LIST_ERROR_MESSAGE : "in the black list",

  whitelist : [],
  blacklist : [],

  shouldShortenKeyForDisplay: true,
}


export {
  keylessLoggerConfig
}
