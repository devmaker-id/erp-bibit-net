import { z } from "zod";

export const deletePermissionValidator = z.object({
  id: z.string().cuid(),

  force: z.boolean().default(false),
});

export type DeletePermissionInput = z.infer<
  typeof deletePermissionValidator
>;