import { z } from "zod";

import {
  saleItemIdSchema,
} from "./pos.validator";

export const removeSaleItemValidator =
  z.object({
    id: saleItemIdSchema,
  });

export type RemoveSaleItemInput =
  z.infer<
    typeof removeSaleItemValidator
  >;