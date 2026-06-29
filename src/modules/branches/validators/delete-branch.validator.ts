import { z } from "zod";

export const deleteBranchValidator = z.object({
  id: z.string().cuid(),
  force: z.boolean().default(false),
});

export type DeleteBranchInput = z.infer<
  typeof deleteBranchValidator
>;