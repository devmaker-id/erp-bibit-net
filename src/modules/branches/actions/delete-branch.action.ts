"use server";

import { safeAction } from "@/core";

import { branchService } from "../services";
import { deleteBranchValidator } from "../validators";

export const deleteBranchAction = safeAction({
  schema: deleteBranchValidator,
  handler: branchService.delete.bind(branchService),
});