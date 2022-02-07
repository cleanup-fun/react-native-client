import { logger as loggerFactory } from "react-native-logs";


const defaultConfig = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: "debug",
  transportOptions: {
    colors: {
      info: "blueBright",
      warn: "yellowBright",
      error: "redBright",
    },
  },
  async: false,
  dateFormat: "time",
  printLevel: true,
  printDate: false,
  enabled: true,
};

const coloredLogger = loggerFactory.createLogger(defaultConfig);

export { coloredLogger }
