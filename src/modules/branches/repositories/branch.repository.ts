import { prisma } from "@/database";

import { BaseRepository } from "@/modules/_core/repositories/base.repository";

import type {
  CreateBranchInput,
  UpdateBranchInput,
} from "../validators";

import type {
  DeleteBranchInput,
} from "../validators";

export class BranchRepository extends BaseRepository {
  async findAll() {
    return prisma.branch.findMany({
      where: this.activeWhere(),
      include: {
        company: true,
      },
      orderBy: [
        {
          company: {
            name: "asc",
          },
        },
        {
          name: "asc",
        },
      ],
    });
  }

  async findById(id: string) {
    return prisma.branch.findFirst({
      where: {
        id,
        ...this.activeWhere(),
      },
      include: {
        company: true,
      },
    });
  }

  async findByCode(
    companyId: string,
    code: string,
  ) {
    return prisma.branch.findFirst({
      where: {
        companyId,
        code,
        ...this.activeWhere(),
      },
    });
  }

  async findByCompany(companyId: string) {
    return prisma.branch.findMany({
      where: {
        companyId,
        ...this.activeWhere(),
      },
      orderBy: {
        name: "asc",
      },
    });
  }

  async create(data: CreateBranchInput) {
    return prisma.branch.create({
      data,
    });
  }

  async update(data: UpdateBranchInput) {
    const { id, ...payload } = data;

    return prisma.branch.update({
      where: {
        id,
      },
      data: payload,
    });
  }

  async delete({ id }: DeleteBranchInput) {
    return prisma.branch.update({
      where: {
        id,
      },
      data: this.softDeleteData(),
    });
  }

  async restore(id: string) {
    return prisma.branch.update({
      where: {
        id,
      },
      data: this.restoreData(),
    });
  }
}

export const branchRepository =
  new BranchRepository();