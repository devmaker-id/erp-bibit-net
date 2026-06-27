import { prisma } from "@/database";
import { BaseRepository } from "@/modules/_core/repositories/base.repository";

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
}

export const companyRepository = new CompanyRepository();