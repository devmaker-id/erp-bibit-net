"use server";

import { safeAction } from "@/core";

import { permissionService } from "../services";
import { updatePermissionValidator } from "../validators";

export const updatePermissionAction = safeAction({
  schema: updatePermissionValidator,
  handler: permissionService.update.bind(
    permissionService
  ),
});