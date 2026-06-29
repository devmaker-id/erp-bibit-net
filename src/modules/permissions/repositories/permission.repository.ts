import { prisma } from "@/database";

import { BaseRepository } from "@/modules/_core/repositories/base.repository";

import type {
  CreatePermissionInput,
  DeletePermissionInput,
  UpdatePermissionInput,
} from "../validators";

export class PermissionRepository extends BaseRepository {
  async findAll() {
    return prisma.permission.findMany({
      where: this.activeWhere(),
      orderBy: [
        {
          module: "asc",
        },
        {
          group: "asc",
        },
        {
          sortOrder: "asc",
        },
        {
          name: "asc",
        },
      ],
    });
  }

  async findById(id: string) {
    return prisma.permission.findFirst({
      where: {
        id,
        ...this.activeWhere(),
      },
    });
  }

  async findByCode(code: string) {
    return prisma.permission.findFirst({
      where: {
        code,
        ...this.activeWhere(),
      },
    });
  }

  async findByModule(module: string) {
    return prisma.permission.findMany({
      where: {
        module,
        ...this.activeWhere(),
      },
      orderBy: [
        {
          group: "asc",
        },
        {
          sortOrder: "asc",
        },
        {
          name: "asc",
        },
      ],
    });
  }

  async create(
    data: CreatePermissionInput
  ) {
    return prisma.permission.create({
      data,
    });
  }

  async update(
    data: UpdatePermissionInput
  ) {
    const { id, ...payload } = data;

    return prisma.permission.update({
      where: {
        id,
      },
      data: payload,
    });
  }

  async delete({
    id,
  }: DeletePermissionInput) {
    return prisma.permission.update({
      where: {
        id,
      },
      data: this.softDeleteData(),
    });
  }

  async restore(id: string) {
    return prisma.permission.update({
      where: {
        id,
      },
      data: this.restoreData(),
    });
  }
}

export const permissionRepository =
  new PermissionRepository();