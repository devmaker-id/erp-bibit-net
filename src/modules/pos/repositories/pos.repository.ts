import { prisma } from "@/database";

import { BaseRepository } from "@/modules/_core/repositories/base.repository";
import type { Prisma } from "@/generated/prisma/client";

export class PosRepository extends BaseRepository {
  async findAll() {
    return prisma.posSale.findMany({
      where: this.activeWhere(),
      include: {
        customer: true,
        cashier: true,
        membership: true,
        company: true,
        branch: true,
        warehouse: true,
        items: {
          include: {
            product: true,
          },
        },
        payments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.posSale.findFirst({
      where: {
        id,
        ...this.activeWhere(),
      },
      include: {
        customer: true,
        cashier: true,
        membership: true,
        company: true,
        branch: true,
        warehouse: true,
        items: {
          include: {
            product: true,
          },
        },
        payments: true,
      },
    });
  }

  async createSale(
    data: Prisma.PosSaleCreateInput
  ) {
    return prisma.posSale.create({
      data,
    });
  }

  async addSaleItem(
    data: Prisma.PosSaleItemCreateInput
  ) {
    return prisma.posSaleItem.create({
      data,
    });
  }

  async updateSaleItem(
    id: string,
    data: Prisma.PosSaleItemUpdateInput
  ) {
    return prisma.posSaleItem.update({
      where: {
        id,
      },
      data,

    });
  }

  async removeSaleItem({
    id,
  }: Prisma.PosSaleItemWhereUniqueInput) {
    return prisma.posSaleItem.delete({
      where: {
        id,
      },
    });
  }

  async checkoutSale(
    id: string,
    data: Prisma.PosSaleUpdateInput
  ) {
    return prisma.posSale.update({
      where: {
        id,
      },
      data,
    });
  }

  async paySale(
    data: Prisma.PosPaymentCreateInput
  ) {
    return prisma.posPayment.create({
      data,
    });
  }

  async completeSale(
    id: string,
    data: Prisma.PosSaleUpdateInput
  ) {
    return prisma.posSale.update({
      where: {
        id,
      },
      data,
    });
  }

  async cancelSale(
    id: string,
    data: Prisma.PosSaleUpdateInput
  ) {
    return prisma.posSale.update({
      where: {
        id,
      },
      data,
    });
  }
}

export const posRepository =
  new PosRepository();