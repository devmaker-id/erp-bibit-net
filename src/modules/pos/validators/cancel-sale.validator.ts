import { z } from "zod";

import {
  saleIdSchema,
} from "./pos.validator";

export const cancelSaleValidator =
  z.object({
    id: saleIdSchema,

    reason: z
      .string()
      .trim()
      .min(3)
      .max(255),
  });

export type CancelSaleInput =
  z.infer<
    typeof cancelSaleValidator
  >;