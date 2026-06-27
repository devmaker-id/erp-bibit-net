"use server";

import { safeAction } from "@/core";
import { companyService } from "../services/company.service";
import { updateCompanyValidator } from "../validators/update-company.validator";

export const updateCompanyAction = safeAction({
  schema: updateCompanyValidator,
  handler: companyService.update.bind(companyService),
});