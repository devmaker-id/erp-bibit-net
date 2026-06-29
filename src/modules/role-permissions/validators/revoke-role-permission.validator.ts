import { z } from "zod";

import {
  permissionIdSchema,
  roleIdSchema,
} from "./role-permission.validator";

export const revokeRolePermissionValidator =
  z.object({
    roleId: roleIdSchema,

    permissionId:
      permissionIdSchema,
  });

export type RevokeRolePermissionInput =
  z.infer<
    typeof revokeRolePermissionValidator
  >;