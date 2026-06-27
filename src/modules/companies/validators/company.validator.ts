import { z } from "zod";

export const companyCodeSchema = z
  .string()
  .trim()
  .min(2)
  .max(20)
  .regex(/^[A-Z0-9_-]+$/, {
    message:
      "Company code hanya boleh berisi huruf besar, angka, underscore, dan dash.",
  });

export const companyNameSchema = z
  .string()
  .trim()
  .min(3)
  .max(150);

export const companyEmailSchema = z
  .email()
  .optional()
  .or(z.literal(""));

export const companyPhoneSchema = z
  .string()
  .max(30)
  .optional();

export const companyWebsiteSchema = z
  .url()
  .optional()
  .or(z.literal(""));