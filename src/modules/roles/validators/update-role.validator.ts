import { z } from "zod";

import { createRoleValidator } from "./create-role.validator";

export const updateRoleValidator =
  createRoleValidator.extend({
    id: z.string().cuid(),
  });

export type UpdateRoleInput = z.infer<
  typeof updateRoleValidator
>;