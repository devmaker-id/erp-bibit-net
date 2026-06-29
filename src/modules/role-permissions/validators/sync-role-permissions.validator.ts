import { z } from "zod";

import {
  permissionIdsSchema,
  roleIdSchema,
} from "./role-permission.validator";

export const syncRolePermissionsValidator =
  z.object({
    roleId: roleIdSchema,

    permissionIds:
      permissionIdsSchema,
  });

export type SyncRolePermissionsInput =
  z.infer<
    typeof syncRolePermissionsValidator
  >;