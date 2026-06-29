"use server";

import { safeAction } from "@/core";
import { companyService } from "../services";
import { updateCompanyValidator } from "../validators";

export const updateCompanyAction = safeAction({
  schema: updateCompanyValidator,
  handler: companyService.update.bind(companyService),
});