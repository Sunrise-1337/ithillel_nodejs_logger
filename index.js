import Logger from "./logger/logger.js";

const logger  = new Logger()

logger.info('Info message')
logger.warning("Warning message")
logger.info(new Error("Info message"))
logger.warning(new Error("Warning message"))
logger.error(new Error("Error message"))