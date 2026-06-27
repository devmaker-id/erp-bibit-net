"use server";

import { safeAction } from "@/core";

import { companyService } from "../services/company.service";

import { createCompanyValidator } from "../validators";

export const createCompanyAction = safeAction({
  schema: createCompanyValidator,
  handler: companyService.create.bind(companyService),
});