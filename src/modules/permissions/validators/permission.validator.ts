import { z } from "zod";

export const permissionCodeSchema = z
  .string()
  .trim()
  .min(3)
  .max(100)
  .regex(/^[a-z0-9._-]+$/, {
    message:
      "Permission code hanya boleh berisi huruf kecil, angka, titik, underscore, dan dash.",
  });

export const permissionNameSchema = z
  .string()
  .trim()
  .min(3)
  .max(150);

export const permissionModuleSchema = z
  .string()
  .trim()
  .min(2)
  .max(100);

export const permissionGroupSchema = z
  .string()
  .trim()
  .min(2)
  .max(100);

export const permissionDescriptionSchema =
  z.string().optional();

export const permissionSortOrderSchema =
  z.number().int().min(0);

export const permissionIsSystemSchema =
  z.boolean();

export const permissionIsActiveSchema =
  z.boolean();