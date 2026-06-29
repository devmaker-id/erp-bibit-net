import { z } from "zod";

export const roleCodeSchema = z
  .string()
  .trim()
  .min(2)
  .max(100)
  .regex(/^[A-Z0-9_-]+$/, {
    message:
      "Role code hanya boleh berisi huruf besar, angka, underscore, dan dash.",
  });

export const roleNameSchema = z
  .string()
  .trim()
  .min(3)
  .max(150);

export const roleDescriptionSchema =
  z.string().optional();

export const roleLevelSchema = z
  .number()
  .int()
  .min(0);

export const roleSortOrderSchema = z
  .number()
  .int()
  .min(0);

export const roleIsSystemSchema =
  z.boolean();

export const roleIsActiveSchema =
  z.boolean();