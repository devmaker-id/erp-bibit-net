import { erpLogger } from "@/core";

import type {
  CreateRoleInput,
  DeleteRoleInput,
  UpdateRoleInput,
} from "../validators";

import { roleRepository } from "../repositories";

export class RoleService {
  async findAll() {
    return roleRepository.findAll();
  }

  async findById(id: string) {
    return roleRepository.findById(id);
  }

  async findByCode(code: string) {
    return roleRepository.findByCode(code);
  }

  async create(data: CreateRoleInput) {
    erpLogger.info(
      "Role created.",
      data
    );

    return roleRepository.create(data);
  }

  async update(data: UpdateRoleInput) {
    return roleRepository.update(data);
  }

  async delete(data: DeleteRoleInput) {
    return roleRepository.delete(data);
  }

  async restore(id: string) {
    return roleRepository.restore(id);
  }
}

export const roleService =
  new RoleService();