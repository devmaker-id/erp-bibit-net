"use server";

import { safeAction } from "@/core";

import { membershipService } from "../services";
import { deleteMembershipValidator } from "../validators";

export const deleteMembershipAction =
  safeAction({
    schema:
      deleteMembershipValidator,

    handler:
      membershipService.delete.bind(
        membershipService
      ),
  });