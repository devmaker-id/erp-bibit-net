"use server";

import { safeAction } from "@/core";

import { warehouseService } from "../services";
import { createWarehouseValidator } from "../validators";

export const createWarehouseAction = safeAction({
  schema: createWarehouseValidator,
  handler: warehouseService.create.bind(
    warehouseService
  ),
});