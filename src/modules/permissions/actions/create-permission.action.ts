"use server";

import { safeAction } from "@/core";

import { permissionService } from "../services";
import { createPermissionValidator } from "../validators";

export const createPermissionAction = safeAction({
  schema: createPermissionValidator,
  handler: permissionService.create.bind(
    permissionService
  ),
});