import { prisma } from "@/database";
import { BaseRepository } from "@/modules/_core/repositories/base.repository";
import type {
  CreateCompanyInput,
  UpdateCompanyInput,
} from "@/modules/companies"
import { DeleteCompanyInput } from "../validators";
import { erpLogger } from "@/core";

export class CompanyRepository extends BaseRepository {
  async findAll() {
    return prisma.company.findMany({
      where: this.activeWhere(),
      orderBy: {
        name: "asc",
      },
    });
  }

  async findById(id: string) {
    erpLogger.debug("find companyId",
      id
    )
    return prisma.company.findFirst({
      where: {
        id,
        ...this.activeWhere(),
      },
    });
  }

  async findByCode(code: string) {
    return prisma.company.findFirst({
      where: {
        code,
        ...this.activeWhere(),
      },
    });
  }

  async create(data: CreateCompanyInput) {
    return prisma.company.create({
      data,
    });
  }

  async update(data: UpdateCompanyInput) {
    const { id, ...payload } = data;

    return prisma.company.update({
      where: { id },
      data: payload,
    });
  }

  async delete({id}: DeleteCompanyInput) {
    return prisma.company.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });
  }

}

export const companyRepository = new CompanyRepository();