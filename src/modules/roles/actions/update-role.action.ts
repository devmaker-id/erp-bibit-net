"use server";

import { safeAction } from "@/core";

import { roleService } from "../services";
import { updateRoleValidator } from "../validators";

export const updateRoleAction = safeAction({
  schema: updateRoleValidator,
  handler: roleService.update.bind(
    roleService
  ),
});