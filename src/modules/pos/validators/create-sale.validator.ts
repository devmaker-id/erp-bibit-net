import { z } from "zod";

import {
  branchIdSchema,
  cashierIdSchema,
  companyIdSchema,
  customerIdSchema,
  membershipIdSchema,
  noteSchema,
  warehouseIdSchema,
} from "./pos.validator";

export const createSaleValidator =
  z.object({
    customerId:
      customerIdSchema,

    membershipId:
      membershipIdSchema,

    cashierId:
      cashierIdSchema,

    companyId:
      companyIdSchema,

    branchId:
      branchIdSchema,

    warehouseId:
      warehouseIdSchema,

    note:
      noteSchema,
  });

export type CreateSaleInput =
  z.infer<
    typeof createSaleValidator
  >;