import { z } from "zod";

import { createMembershipValidator } from "./create-membership.validator";

export const updateMembershipValidator =
  createMembershipValidator.extend({
    id: z.string().cuid(),
  });

export type UpdateMembershipInput = z.infer<
  typeof updateMembershipValidator
>;