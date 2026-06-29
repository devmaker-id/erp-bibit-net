import { z } from "zod";

import {
  grantedByIdSchema,
  permissionIdSchema,
  roleIdSchema,
} from "./role-permission.validator";

export const assignRolePermissionValidator =
  z.object({
    roleId: roleIdSchema,

    permissionId:
      permissionIdSchema,

    grantedById:
      grantedByIdSchema,
  });

export type AssignRolePermissionInput =
  z.infer<
    typeof assignRolePermissionValidator
  >;