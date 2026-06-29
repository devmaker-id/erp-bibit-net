"use server";

import { safeAction } from "@/core";

import { rolePermissionService } from "../services";
import { revokeRolePermissionValidator } from "../validators";

export const revokeRolePermissionAction =
  safeAction({
    schema:
      revokeRolePermissionValidator,

    handler:
      rolePermissionService.revoke.bind(
        rolePermissionService
      ),
  });