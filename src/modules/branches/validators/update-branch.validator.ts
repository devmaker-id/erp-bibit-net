import { z } from "zod";

import { createBranchValidator } from "./create-branch.validator";

export const updateBranchValidator =
  createBranchValidator.extend({
    id: z.string().cuid(),
  });

export type UpdateBranchInput = z.infer<
  typeof updateBranchValidator
>;