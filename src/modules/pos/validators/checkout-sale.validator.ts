import { z } from "zod";

import {
  noteSchema,
  saleIdSchema,
} from "./pos.validator";

export const checkoutSaleValidator =
  z.object({
    id: saleIdSchema,

    note: noteSchema,
  });

export type CheckoutSaleInput =
  z.infer<
    typeof checkoutSaleValidator
  >;