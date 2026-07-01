import {
  PosSaleStatus,
  type Prisma,
} from "@/generated/prisma/client";

import { erpLogger } from "@/core";

import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from "@/core/errors";

import type {
  AddSaleItemInput,
  CancelSaleInput,
  CheckoutSaleInput,
  CompleteSaleInput,
  CreateSaleInput,
  PaySaleInput,
  RemoveSaleItemInput,
  UpdateSaleItemInput,
} from "../validators";

import { posRepository } from "../repositories";

export class PosService {
  async findAll() {
    return posRepository.findAll();
  }

  async findById(id: string) {
    const sale =
      await posRepository.findById(id);

    if (!sale) {
      throw new NotFoundError(
        "Sale not found."
      );
    }

    return sale;
  }

  async createSale(
    data: CreateSaleInput
  ) {
    erpLogger.info(
      "Create POS sale.",
      data
    );

    const payload: Prisma.PosSaleCreateInput =
      {
        number:
          await this.generateSaleNumber(),

        customer: data.customerId
          ? {
              connect: {
                id: data.customerId,
              },
            }
          : undefined,

        membership: {
          connect: {
            id: data.membershipId,
          },
        },

        cashier: {
          connect: {
            id: data.cashierId,
          },
        },

        company: {
          connect: {
            id: data.companyId,
          },
        },

        branch: {
          connect: {
            id: data.branchId,
          },
        },

        warehouse: {
          connect: {
            id: data.warehouseId,
          },
        },

        subtotal: 0,

        grandTotal: 0,

        note: data.note,
      };

    return posRepository.createSale(
      payload
    );
  }

  async addSaleItem(
    data: AddSaleItemInput
  ) {
    await this.findById(
      data.saleId
    );

    erpLogger.info(
      "Add sale item.",
      data
    );

    const payload: Prisma.PosSaleItemCreateInput =
      {
        sale: {
          connect: {
            id: data.saleId,
          },
        },

        product: {
          connect: {
            id: data.productId,
          },
        },

        quantity: data.quantity,

        price: data.price,

        discount:
          data.discount,

        subtotal:
          data.quantity *
          data.price -
          data.discount,
      };

    return posRepository.addSaleItem(
      payload
    );
  }

  async updateSaleItem(
    data: UpdateSaleItemInput
  ) {
    erpLogger.info(
      "Update sale item.",
      data
    );

    const payload: Prisma.PosSaleItemUpdateInput =
      {
        quantity:
          data.quantity,

        price: data.price,

        discount:
          data.discount,

        subtotal:
          data.quantity *
          data.price -
          data.discount,
      };

    return posRepository.updateSaleItem(
      data.id,
      payload
    );
  }

  async removeSaleItem(
    data: RemoveSaleItemInput
  ) {
    erpLogger.info(
      "Remove sale item.",
      data
    );

    return posRepository.removeSaleItem({
      id: data.id,
    });
  }

  async checkoutSale(
    data: CheckoutSaleInput
  ) {
    const sale =
      await this.findById(data.id);

    if (
      sale.status !==
      PosSaleStatus.DRAFT
    ) {
      throw new ConflictError(
        "Sale has already been checked out."
      );
    }

    if (
      sale.items.length === 0
    ) {
      throw new ValidationError(
        "Sale must contain at least one item."
      );
    }

    erpLogger.info(
      "Checkout sale.",
      data
    );

    return posRepository.checkoutSale(
      data.id,
      {
        status:
          PosSaleStatus.CHECKOUT,

        note: data.note,
      }
    );
  }

  async paySale(
    data: PaySaleInput
  ) {
    await this.findById(
      data.saleId
    );

    erpLogger.info(
      "POS payment.",
      data
    );

    const payload: Prisma.PosPaymentCreateInput =
      {
        sale: {
          connect: {
            id: data.saleId,
          },
        },

        method:
          data.method,

        amount:
          data.amount,

        referenceNumber:
          data.referenceNumber,
      };

    return posRepository.paySale(
      payload
    );
  }

  async completeSale(
    data: CompleteSaleInput
  ) {
    const sale =
      await this.findById(data.id);

    if (
      sale.status !==
      PosSaleStatus.PAID
    ) {
      throw new ConflictError(
        "Sale has not been paid."
      );
    }

    erpLogger.info(
      "Complete sale.",
      data
    );

    return posRepository.completeSale(
      data.id,
      {
        status:
          PosSaleStatus.COMPLETED,

        note: data.note,
      }
    );
  }

  async cancelSale(
    data: CancelSaleInput
  ) {
    const sale =
      await this.findById(data.id);

    if (
      sale.status ===
      PosSaleStatus.COMPLETED
    ) {
      throw new ConflictError(
        "Completed sale cannot be cancelled."
      );
    }

    if (
      sale.status ===
      PosSaleStatus.CANCELLED
    ) {
      throw new ConflictError(
        "Sale has already been cancelled."
      );
    }

    erpLogger.info(
      "Cancel sale.",
      data
    );

    return posRepository.cancelSale(
      data.id,
      {
        status:
          PosSaleStatus.CANCELLED,

        note: data.reason,
      }
    );
  }

  private async generateSaleNumber() {
    return `POS-${Date.now()}`;
  }
}

export const posService =
  new PosService();