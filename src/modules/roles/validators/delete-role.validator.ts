import { z } from "zod";

export const deleteRoleValidator = z.object({
  id: z.string().cuid(),

  force: z.boolean().default(false),
});

export type DeleteRoleInput = z.infer<
  typeof deleteRoleValidator
>;