import { z } from "zod";

export const deleteWarehouseValidator = z.object({
  id: z.string().cuid(),

  force: z.boolean().default(false),
});

export type DeleteWarehouseInput = z.infer<
  typeof deleteWarehouseValidator
>;