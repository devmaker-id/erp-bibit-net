import { erpLogger } from "@/core";

import type {
  CreateWarehouseInput,
  DeleteWarehouseInput,
  UpdateWarehouseInput,
} from "../validators";

import { warehouseRepository } from "../repositories";

export class WarehouseService {
  async findAll() {
    return warehouseRepository.findAll();
  }

  async findById(id: string) {
    return warehouseRepository.findById(id);
  }

  async findByCode(
    companyId: string,
    branchId: string,
    code: string,
  ) {
    return warehouseRepository.findByCode(
      companyId,
      branchId,
      code,
    );
  }

  async findByCompany(companyId: string) {
    return warehouseRepository.findByCompany(
      companyId,
    );
  }

  async findByBranch(branchId: string) {
    return warehouseRepository.findByBranch(
      branchId,
    );
  }

  async create(data: CreateWarehouseInput) {
    erpLogger.info(
      "Warehouse created.",
      data,
    );

    return warehouseRepository.create(data);
  }

  async update(data: UpdateWarehouseInput) {
    return warehouseRepository.update(data);
  }

  async delete(data: DeleteWarehouseInput) {
    return warehouseRepository.delete(data);
  }

  async restore(id: string) {
    return warehouseRepository.restore(id);
  }
}

export const warehouseService =
  new WarehouseService();