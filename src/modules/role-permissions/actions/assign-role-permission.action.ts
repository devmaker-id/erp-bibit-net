"use server";

import { safeAction } from "@/core";

import { rolePermissionService } from "../services";
import { assignRolePermissionValidator } from "../validators";

export const assignRolePermissionAction =
  safeAction({
    schema:
      assignRolePermissionValidator,

    handler:
      rolePermissionService.assign.bind(
        rolePermissionService
      ),
  });