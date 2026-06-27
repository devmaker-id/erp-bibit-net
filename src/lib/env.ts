import { z } from "zod";

const envSchema = z.object({
  APP_NAME: z.string().min(1),
  APP_ENV: z.enum([
    "development",
    "production",
    "test",
  ]),
  APP_URL: z.url(),
  DATABASE_URL: z.url(),
  PRISMA_LOG_LEVEL: z.enum([
    "query",
    "info",
    "warn",
    "error",
  ]).default("error"),
  AUTH_SECRET: z.string().min(32),
  AUTH_EXPIRES: z.string(),
});

export const env = envSchema.parse(process.env);