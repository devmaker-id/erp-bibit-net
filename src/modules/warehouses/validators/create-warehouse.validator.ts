import { z } from "zod";

import {
  warehouseBranchIdSchema,
  warehouseCodeSchema,
  warehouseCompanyIdSchema,
  warehouseDescriptionSchema,
  warehouseNameSchema,
} from "./warehouse.validator";

export const createWarehouseValidator =
  z.object({
    companyId:
      warehouseCompanyIdSchema,

    branchId:
      warehouseBranchIdSchema,

    code: warehouseCodeSchema,

    name: warehouseNameSchema,

    description:
      warehouseDescriptionSchema,
  });

export type CreateWarehouseInput =
  z.infer<
    typeof createWarehouseValidator
  >;