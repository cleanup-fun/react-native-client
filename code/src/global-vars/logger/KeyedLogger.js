
import { KEYLESS_LOGGER } from "./KEYLESS_LOGGER";

class KeyedLogger {
  key = "KEY_NOT_SET"
  constructor(key){
    if(typeof key !== "string"){
      throw new Error("Key must be string when creating key logger, got:" + JSON.stringify(key))
    }
    this.key = key;
  }
  log(){
    const args = [this.key].concat(Array.from(arguments))
    KEYLESS_LOGGER.log.apply(KEYLESS_LOGGER, args)
  }
  info(){
    const args = [this.key].concat(Array.from(arguments))
    KEYLESS_LOGGER.info.apply(KEYLESS_LOGGER, args)
  }
  warn(){
    const args = [this.key].concat(Array.from(arguments))
    KEYLESS_LOGGER.warn.apply(KEYLESS_LOGGER, args)
  }
  error(){
    const args = [this.key].concat(Array.from(arguments))
    KEYLESS_LOGGER.error.apply(KEYLESS_LOGGER, args)
  }
}


export { KeyedLogger };
