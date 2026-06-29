import { prisma } from "@/database";

import { BaseRepository } from "@/modules/_core/repositories/base.repository";

import type {
  CreateWarehouseInput,
  DeleteWarehouseInput,
  UpdateWarehouseInput,
} from "../validators";

export class WarehouseRepository extends BaseRepository {
  async findAll() {
    return prisma.warehouse.findMany({
      where: this.activeWhere(),
      include: {
        company: true,
        branch: true,
      },
      orderBy: [
        {
          company: {
            name: "asc",
          },
        },
        {
          branch: {
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
    return prisma.warehouse.findFirst({
      where: {
        id,
        ...this.activeWhere(),
      },
      include: {
        company: true,
        branch: true,
      },
    });
  }

  async findByCode(
    companyId: string,
    branchId: string,
    code: string,
  ) {
    return prisma.warehouse.findFirst({
      where: {
        companyId,
        branchId,
        code,
        ...this.activeWhere(),
      },
    });
  }

  async findByCompany(companyId: string) {
    return prisma.warehouse.findMany({
      where: {
        companyId,
        ...this.activeWhere(),
      },
      include: {
        branch: true,
      },
      orderBy: [
        {
          branch: {
            name: "asc",
          },
        },
        {
          name: "asc",
        },
      ],
    });
  }

  async findByBranch(branchId: string) {
    return prisma.warehouse.findMany({
      where: {
        branchId,
        ...this.activeWhere(),
      },
      orderBy: {
        name: "asc",
      },
    });
  }

  async create(data: CreateWarehouseInput) {
    return prisma.warehouse.create({
      data,
    });
  }

  async update(data: UpdateWarehouseInput) {
    const { id, ...payload } = data;

    return prisma.warehouse.update({
      where: {
        id,
      },
      data: payload,
    });
  }

  async delete({
    id,
  }: DeleteWarehouseInput) {
    return prisma.warehouse.update({
      where: {
        id,
      },
      data: this.softDeleteData(),
    });
  }

  async restore(id: string) {
    return prisma.warehouse.update({
      where: {
        id,
      },
      data: this.restoreData(),
    });
  }
}

export const warehouseRepository =
  new WarehouseRepository();