import { prisma } from "@/database";

import { BaseRepository } from "@/modules/_core/repositories/base.repository";

import type {
  CreateMembershipInput,
  DeleteMembershipInput,
  UpdateMembershipInput,
} from "../validators";

export class MembershipRepository extends BaseRepository {
  async findAll() {
    return prisma.membership.findMany({
      where: this.activeWhere(),
      include: {
        user: true,
        company: true,
        branch: true,
        role: true,
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
          role: {
            level: "asc",
          },
        },
        {
          role: {
            sortOrder: "asc",
          },
        },
      ],
    });
  }

  async findById(id: string) {
    return prisma.membership.findFirst({
      where: {
        id,
        ...this.activeWhere(),
      },
      include: {
        user: true,
        company: true,
        branch: true,
        role: true,
      },
    });
  }

  async findByUserId(userId: string) {
    return prisma.membership.findMany({
      where: {
        userId,
        ...this.activeWhere(),
      },
      include: {
        company: true,
        branch: true,
        role: true,
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
          role: {
            level: "asc",
          },
        },
      ],
    });
  }

  async create(
    data: CreateMembershipInput
  ) {
    return prisma.membership.create({
      data,
    });
  }

  async update(
    data: UpdateMembershipInput
  ) {
    const { id, ...payload } = data;

    return prisma.membership.update({
      where: {
        id,
      },
      data: payload,
    });
  }

  async delete({
    id,
  }: DeleteMembershipInput) {
    return prisma.membership.update({
      where: {
        id,
      },
      data: this.softDeleteData(),
    });
  }

  async restore(id: string) {
    return prisma.membership.update({
      where: {
        id,
      },
      data: this.restoreData(),
    });
  }
}

export const membershipRepository =
  new MembershipRepository();