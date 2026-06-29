"use server";

import { safeAction } from "@/core";

import { branchService } from "../services";
import { updateBranchValidator } from "../validators";

export const updateBranchAction = safeAction({
  schema: updateBranchValidator,
  handler: branchService.update.bind(branchService),
});