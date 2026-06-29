"use server";

import { safeAction } from "@/core";

import { roleService } from "../services";
import { createRoleValidator } from "../validators";

export const createRoleAction = safeAction({
  schema: createRoleValidator,
  handler: roleService.create.bind(
    roleService
  ),
});