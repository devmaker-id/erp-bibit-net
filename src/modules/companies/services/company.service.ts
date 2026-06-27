import { companyRepository } from "../repositories/company.repository";
import type {
  CreateCompanyInput,
  UpdateCompanyInput,
} from "@/modules/companies";
import { DeleteCompanyInput } from "../validators";
import { erpLogger } from "@/core";

export class CompanyService {
  async findAll() {
    return companyRepository.findAll();
  }

  async findById(id: string) {
    return companyRepository.findById(id);
  }

  async findByCode(code: string) {
    return companyRepository.findByCode(code);
  }

  async create(data: CreateCompanyInput) {
    erpLogger.info("company created",
      data
    )
    return companyRepository.create(data);
  }

  async update(data: UpdateCompanyInput) {
    return companyRepository.update(data);
  }

  async delete(data: DeleteCompanyInput) {
    return companyRepository.delete(data);
  }
}

export const companyService = new CompanyService();