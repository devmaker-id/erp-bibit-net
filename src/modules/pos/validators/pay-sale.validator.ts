import { z } from "zod";

import {
  paymentMethodSchema,
  saleIdSchema,
} from "./pos.validator";

export const paySaleValidator =
  z.object({
    saleId: saleIdSchema,

    method:
      paymentMethodSchema,

    amount: z
      .number()
      .positive(),

    referenceNumber: z
      .string()
      .trim()
      .max(100)
      .optional(),
  });

export type PaySaleInput =
  z.infer<
    typeof paySaleValidator
  >;