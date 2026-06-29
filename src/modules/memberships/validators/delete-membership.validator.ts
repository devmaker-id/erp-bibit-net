import { z } from "zod";

export const deleteMembershipValidator =
  z.object({
    id: z.string().cuid(),

    force: z.boolean().default(false),
  });

export type DeleteMembershipInput =
  z.infer<
    typeof deleteMembershipValidator
  >;