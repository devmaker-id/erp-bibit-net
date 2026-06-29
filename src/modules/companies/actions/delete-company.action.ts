"use server";

import { safeAction } from "@/core";
import { companyService } from "../services";
import { deleteCompanyValidator } from "../validators";

export const deleteCompanyAction = safeAction({
  schema: deleteCompanyValidator,
  handler: companyService.delete.bind(companyService),
});