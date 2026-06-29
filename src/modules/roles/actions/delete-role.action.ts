"use server";

import { safeAction } from "@/core";

import { roleService } from "../services";
import { deleteRoleValidator } from "../validators";

export const deleteRoleAction = safeAction({
  schema: deleteRoleValidator,
  handler: roleService.delete.bind(
    roleService
  ),
});