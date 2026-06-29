"use server";

import { safeAction } from "@/core";

import { warehouseService } from "../services";
import { deleteWarehouseValidator } from "../validators";

export const deleteWarehouseAction = safeAction({
  schema: deleteWarehouseValidator,
  handler: warehouseService.delete.bind(
    warehouseService
  ),
});