import { z } from "zod";

import {
  branchAddressSchema,
  branchCitySchema,
  branchCodeSchema,
  branchCompanyIdSchema,
  branchCountryCodeSchema,
  branchDescriptionSchema,
  branchEmailSchema,
  branchNameSchema,
  branchPhoneSchema,
  branchPostalCodeSchema,
  branchProvinceSchema,
  branchTimezoneSchema,
} from "./branch.validator";

export const createBranchValidator = z.object({
  companyId: branchCompanyIdSchema,
  code: branchCodeSchema,
  name: branchNameSchema,
  email: branchEmailSchema,
  phone: branchPhoneSchema,
  address: branchAddressSchema,
  city: branchCitySchema,
  province: branchProvinceSchema,
  postalCode: branchPostalCodeSchema,
  countryCode: branchCountryCodeSchema,
  timezone: branchTimezoneSchema,
  description: branchDescriptionSchema,
  isHeadOffice: z.boolean(),
});

export type CreateBranchInput = z.infer<
  typeof createBranchValidator
>;