import { z } from "zod";

import {
  branchIdSchema,
  companyIdSchema,
  employeeNumberSchema,
  isActiveSchema,
  isDefaultSchema,
  roleIdSchema,
  titleSchema,
  userIdSchema,
} from "./membership.validator";

export const createMembershipValidator =
  z.object({
    userId: userIdSchema,

    companyId: companyIdSchema,

    branchId: branchIdSchema,

    roleId: roleIdSchema,

    employeeNumber:
      employeeNumberSchema,

    title: titleSchema,

    isDefault:
      isDefaultSchema,

    isActive:
      isActiveSchema,
  });

export type CreateMembershipInput =
  z.infer<
    typeof createMembershipValidator
  >;