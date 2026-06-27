import pino from "pino";

import { env } from "@/lib/env";

export const logger = pino({
  level: env.APP_ENV === "development" ? "debug" : "info",

  transport:
    env.APP_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        }
      : undefined,
});