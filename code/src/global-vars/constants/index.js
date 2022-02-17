import { Config } from "react-native-config";

export const PAID_STATUS_ASYNC_STORAGE_KEY = "PAID STATUS";
export const USER_ASYNC_STORAGE_KEY = "USER JWT INFO";
export const TRANSLATION_BASE_ASYNC_STORAGE_KEY = "TRANSLATION CONFIG";

export const UNDEFINED = void 0;

export const SAFE_MAX_NUMBER_VALUE = Math.pow(2, 31) - 1;

export const LOAD_INCRMENTS = 16;

export const SERVER_ORIGIN = Config.SERVER_ORIGIN;

export const CLEANUP_FUN_API_ORIGIN = (
  Config.CLEANUP_FUN_API_ORIGIN || "http://api.localhost.test:8080"
);

export { resource as DEFAULT_LANG } from "./langs/en-US";
