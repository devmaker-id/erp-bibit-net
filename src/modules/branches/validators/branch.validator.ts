import { z } from "zod";

export const branchCompanyIdSchema = z
  .string()
  .cuid();

export const branchCodeSchema = z
  .string()
  .trim()
  .min(2)
  .max(20)
  .regex(/^[A-Z0-9_-]+$/, {
    message:
      "Branch code hanya boleh berisi huruf besar, angka, underscore, dan dash.",
  });

export const branchNameSchema = z
  .string()
  .trim()
  .min(3)
  .max(150);

export const branchEmailSchema = z
  .email()
  .optional()
  .or(z.literal(""));

export const branchPhoneSchema = z
  .string()
  .max(30)
  .optional();

export const branchAddressSchema = z
  .string()
  .optional();

export const branchCitySchema = z
  .string()
  .max(100)
  .optional();

export const branchProvinceSchema = z
  .string()
  .max(100)
  .optional();

export const branchPostalCodeSchema = z
  .string()
  .max(20)
  .optional();

export const branchCountryCodeSchema = z
  .string()
  .length(2)
  .optional();

export const branchTimezoneSchema = z
  .string()
  .max(100)
  .optional();

export const branchDescriptionSchema = z
  .string()
  .optional();