"use server";

import { safeAction } from "@/core";

import { membershipService } from "../services";
import { createMembershipValidator } from "../validators";

export const createMembershipAction =
  safeAction({
    schema:
      createMembershipValidator,

    handler:
      membershipService.create.bind(
        membershipService
      ),
  });