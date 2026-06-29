"use server";

import { safeAction } from "@/core";

import { companyService } from "../services";

import { createCompanyValidator } from "../validators";

export const createCompanyAction = safeAction({
  schema: createCompanyValidator,
  handler: companyService.create.bind(companyService),
});