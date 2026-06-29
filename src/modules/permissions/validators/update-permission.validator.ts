import { z } from "zod";

import { createPermissionValidator } from "./create-permission.validator";

export const updatePermissionValidator =
  createPermissionValidator.extend({
    id: z.string().cuid(),
  });

export type UpdatePermissionInput = z.infer<
  typeof updatePermissionValidator
>;