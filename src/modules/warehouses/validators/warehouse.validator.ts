import { z } from "zod";

export const warehouseCompanyIdSchema =
  z.string().cuid();

export const warehouseBranchIdSchema =
  z.string().cuid();

export const warehouseCodeSchema = z
  .string()
  .trim()
  .min(2)
  .max(20)
  .regex(/^[A-Z0-9_-]+$/, {
    message:
      "Warehouse code hanya boleh berisi huruf besar, angka, underscore, dan dash.",
  });

export const warehouseNameSchema = z
  .string()
  .trim()
  .min(3)
  .max(150);

export const warehouseDescriptionSchema =
  z.string().optional();