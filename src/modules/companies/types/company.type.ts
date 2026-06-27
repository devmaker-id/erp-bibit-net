export interface CompanyListFilter {
  search?: string;
  isActive?: boolean;
}

export interface CompanyCreateInput {
  code: string;
  name: string;
  legalName?: string;
  email?: string;
  phone?: string;
  website?: string;
  taxNumber?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  countryCode?: string;
  timezone?: string;
  currencyCode?: string;
  logo?: string;
  description?: string;
}

export interface CompanyUpdateInput
  extends Partial<CompanyCreateInput> {
  id: string;
}