import { z } from "zod";

export const deleteCompanyValidator = z.object({
  id: z.string().cuid(),
  force: z.boolean().default(false),
});

export type DeleteCompanyInput = z.infer<
  typeof deleteCompanyValidator
>;