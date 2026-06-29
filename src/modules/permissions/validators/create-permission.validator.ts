import { z } from "zod";

import {
  permissionCodeSchema,
  permissionDescriptionSchema,
  permissionGroupSchema,
  permissionIsActiveSchema,
  permissionIsSystemSchema,
  permissionModuleSchema,
  permissionNameSchema,
  permissionSortOrderSchema,
} from "./permission.validator";

export const createPermissionValidator =
  z.object({
    code: permissionCodeSchema,

    name: permissionNameSchema,

    module: permissionModuleSchema,

    group: permissionGroupSchema,

    description:
      permissionDescriptionSchema,

    sortOrder:
      permissionSortOrderSchema,

    isSystem:
      permissionIsSystemSchema,

    isActive:
      permissionIsActiveSchema,
  });

export type CreatePermissionInput =
  z.infer<
    typeof createPermissionValidator
  >;