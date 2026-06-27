import { logger } from "./logger";

class ErpLogger {
  debug(message: string, data?: unknown) {
    logger.debug(data ?? {}, message);
  }

  info(message: string, data?: unknown) {
    logger.info(data ?? {}, message);
  }

  warn(message: string, data?: unknown) {
    logger.warn(data ?? {}, message);
  }

  error(message: string, data?: unknown) {
    logger.error(data ?? {}, message);
  }

  fatal(message: string, data?: unknown) {
    logger.fatal(data ?? {}, message);
  }
}

export const erpLogger = new ErpLogger();