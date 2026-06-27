import { z } from "zod";
import {
  companyCodeSchema,
  companyEmailSchema,
  companyNameSchema,
  companyPhoneSchema,
  companyWebsiteSchema,
} from "./company.validator";

export const createCompanyValidator = z.object({
  code: companyCodeSchema,
  name: companyNameSchema,

  legalName: z.string().max(200).optional(),

  email: companyEmailSchema,

  phone: companyPhoneSchema,

  website: companyWebsiteSchema,

  taxNumber: z.string().max(100).optional(),

  address: z.string().optional(),

  city: z.string().max(100).optional(),

  province: z.string().max(100).optional(),

  postalCode: z.string().max(20).optional(),

  countryCode: z.string().length(2).optional(),

  timezone: z.string().max(100).optional(),

  currencyCode: z.string().length(3).optional(),

  logo: z.string().optional(),

  description: z.string().optional(),
});

export type CreateCompanyInput = z.infer<
  typeof createCompanyValidator
>;