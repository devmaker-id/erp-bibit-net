import { z } from "zod";

import {
  noteSchema,
  saleIdSchema,
} from "./pos.validator";

export const completeSaleValidator =
  z.object({
    id: saleIdSchema,

    note: noteSchema,
  });

export type CompleteSaleInput =
  z.infer<
    typeof completeSaleValidator
  >;