"use server";

import { safeAction } from "@/core";

import { warehouseService } from "../services";
import { updateWarehouseValidator } from "../validators";

export const updateWarehouseAction = safeAction({
  schema: updateWarehouseValidator,
  handler: warehouseService.update.bind(
    warehouseService
  ),
});