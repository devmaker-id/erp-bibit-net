"use server";

import { safeAction } from "@/core";

import { branchService } from "../services";
import { createBranchValidator } from "../validators";

export const createBranchAction = safeAction({
  schema: createBranchValidator,
  handler: branchService.create.bind(branchService),
});