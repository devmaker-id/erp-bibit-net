import { erpLogger } from "@/core";

import type {
  CreateBranchInput,
  DeleteBranchInput,
  UpdateBranchInput,
} from "../validators";

import { branchRepository } from "../repositories";

export class BranchService {
  async findAll() {
    return branchRepository.findAll();
  }

  async findById(id: string) {
    return branchRepository.findById(id);
  }

  async findByCode(
    companyId: string,
    code: string,
  ) {
    return branchRepository.findByCode(
      companyId,
      code,
    );
  }

  async findByCompany(companyId: string) {
    return branchRepository.findByCompany(
      companyId,
    );
  }

  async create(data: CreateBranchInput) {
    erpLogger.info(
      "Branch created.",
      data,
    );

    return branchRepository.create(data);
  }

  async update(data: UpdateBranchInput) {
    return branchRepository.update(data);
  }

  async delete(data: DeleteBranchInput) {
    return branchRepository.delete(data);
  }

  async restore(id: string) {
    return branchRepository.restore(id);
  }
}

export const branchService =
  new BranchService();