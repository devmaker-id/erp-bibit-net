"use server";

import { safeAction } from "@/core";

import { rolePermissionService } from "../services";
import { syncRolePermissionsValidator } from "../validators";

export const syncRolePermissionsAction =
  safeAction({
    schema:
      syncRolePermissionsValidator,

    handler:
      rolePermissionService.sync.bind(
        rolePermissionService
      ),
  });