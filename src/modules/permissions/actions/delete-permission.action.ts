"use server";

import { safeAction } from "@/core";

import { permissionService } from "../services";
import { deletePermissionValidator } from "../validators";

export const deletePermissionAction = safeAction({
  schema: deletePermissionValidator,
  handler: permissionService.delete.bind(
    permissionService
  ),
});