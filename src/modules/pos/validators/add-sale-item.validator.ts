import { z } from "zod";

import {
  discountSchema,
  priceSchema,
  productIdSchema,
  quantitySchema,
  saleIdSchema,
} from "./pos.validator";

export const addSaleItemValidator =
  z.object({
    saleId:
      saleIdSchema,

    productId:
      productIdSchema,

    quantity:
      quantitySchema,

    price:
      priceSchema,

    discount:
      discountSchema,
  });

export type AddSaleItemInput =
  z.infer<
    typeof addSaleItemValidator
  >;