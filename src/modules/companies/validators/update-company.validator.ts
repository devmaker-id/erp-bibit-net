import { z } from "zod";
import { createCompanyValidator } from "./create-company.validator";

export const updateCompanyValidator =
  createCompanyValidator.extend({
    id: z.string().cuid(),
  });

export type UpdateCompanyInput = z.infer<
  typeof updateCompanyValidator
>;