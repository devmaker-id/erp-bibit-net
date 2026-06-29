import { z } from "zod";

import {
  roleCodeSchema,
  roleDescriptionSchema,
  roleIsActiveSchema,
  roleIsSystemSchema,
  roleLevelSchema,
  roleNameSchema,
  roleSortOrderSchema,
} from "./role.validator";

export const createRoleValidator =
  z.object({
    code: roleCodeSchema,

    name: roleNameSchema,

    description:
      roleDescriptionSchema,

    level: roleLevelSchema,

    sortOrder:
      roleSortOrderSchema,

    isSystem:
      roleIsSystemSchema,

    isActive:
      roleIsActiveSchema,
  });

export type CreateRoleInput = z.infer<
  typeof createRoleValidator
>;