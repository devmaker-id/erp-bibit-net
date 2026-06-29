import { prisma } from "@/database";

import { BaseRepository } from "@/modules/_core/repositories/base.repository";

import type {
  CreateRoleInput,
  DeleteRoleInput,
  UpdateRoleInput,
} from "../validators";

export class RoleRepository extends BaseRepository {
  async findAll() {
    return prisma.role.findMany({
      where: this.activeWhere(),
      orderBy: [
        {
          level: "asc",
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
    return prisma.role.findFirst({
      where: {
        id,
        ...this.activeWhere(),
      },
    });
  }

  async findByCode(code: string) {
    return prisma.role.findFirst({
      where: {
        code,
        ...this.activeWhere(),
      },
    });
  }

  async create(data: CreateRoleInput) {
    return prisma.role.create({
      data,
    });
  }

  async update(data: UpdateRoleInput) {
    const { id, ...payload } = data;

    return prisma.role.update({
      where: {
        id,
      },
      data: payload,
    });
  }

  async delete({
    id,
  }: DeleteRoleInput) {
    return prisma.role.update({
      where: {
        id,
      },
      data: this.softDeleteData(),
    });
  }

  async restore(id: string) {
    return prisma.role.update({
      where: {
        id,
      },
      data: this.restoreData(),
    });
  }
}

export const roleRepository =
  new RoleRepository();