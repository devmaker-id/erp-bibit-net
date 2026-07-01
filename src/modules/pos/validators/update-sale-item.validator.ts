import { z } from "zod";

import {
  discountSchema,
  priceSchema,
  quantitySchema,
  saleItemIdSchema,
} from "./pos.validator";

export const updateSaleItemValidator =
  z.object({
    id: saleItemIdSchema,

    quantity:
      quantitySchema,

    price:
      priceSchema,

    discount:
      discountSchema,
  });

export type UpdateSaleItemInput =
  z.infer<
    typeof updateSaleItemValidator
  >;