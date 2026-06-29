"use server";

import { safeAction } from "@/core";

import { membershipService } from "../services";
import { updateMembershipValidator } from "../validators";

export const updateMembershipAction =
  safeAction({
    schema:
      updateMembershipValidator,

    handler:
      membershipService.update.bind(
        membershipService
      ),
  });