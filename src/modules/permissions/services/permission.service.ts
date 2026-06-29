import { erpLogger } from "@/core";

import type {
  CreatePermissionInput,
  DeletePermissionInput,
  UpdatePermissionInput,
} from "../validators";

import { permissionRepository } from "../repositories";

export class PermissionService {
  async findAll() {
    return permissionRepository.findAll();
  }

  async findById(id: string) {
    return permissionRepository.findById(id);
  }

  async findByCode(code: string) {
    return permissionRepository.findByCode(code);
  }

  async findByModule(module: string) {
    return permissionRepository.findByModule(
      module
    );
  }

  async create(
    data: CreatePermissionInput
  ) {
    erpLogger.info(
      "Permission created.",
      data
    );

    return permissionRepository.create(
      data
    );
  }

  async update(
    data: UpdatePermissionInput
  ) {
    return permissionRepository.update(
      data
    );
  }

  async delete(
    data: DeletePermissionInput
  ) {
    return permissionRepository.delete(
      data
    );
  }

  async restore(id: string) {
    return permissionRepository.restore(
      id
    );
  }
}

export const permissionService =
  new PermissionService();