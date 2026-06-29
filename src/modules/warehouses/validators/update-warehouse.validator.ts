import { z } from "zod";

import { createWarehouseValidator } from "./create-warehouse.validator";

export const updateWarehouseValidator =
  createWarehouseValidator.extend({
    id: z.string().cuid(),
  });

export type UpdateWarehouseInput = z.infer<
  typeof updateWarehouseValidator
>;