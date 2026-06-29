import { companyService } from "@/modules/companies/services/company.service";

import { CompaniesPage } from "@/modules/companies/components/companies-page";

export default async function Page() {
  const companies = await companyService.findAll();

  return (
    <CompaniesPage
      companies={companies}
    />
  );
}