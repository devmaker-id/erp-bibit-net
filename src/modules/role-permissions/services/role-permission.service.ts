import { erpLogger } from "@/core";

import type {
  AssignRolePermissionInput,
  RevokeRolePermissionInput,
  SyncRolePermissionsInput,
} from "../validators";

import { rolePermissionRepository } from "../repositories";

export class RolePermissionService {
  async findByRoleId(
    roleId: string
  ) {
    return rolePermissionRepository.findByRoleId(
      roleId
    );
  }

  async findPermissionIds(
    roleId: string
  ) {
    return rolePermissionRepository.findPermissionIds(
      roleId
    );
  }

  async assign(
    data: AssignRolePermissionInput
  ) {
    erpLogger.info(
      "Role permission assigned.",
      data
    );

    return rolePermissionRepository.assign(
      data.roleId,
      data.permissionId
    );
  }

  async revoke(
    data: RevokeRolePermissionInput
  ) {
    erpLogger.info(
      "Role permission revoked.",
      data
    );

    return rolePermissionRepository.revoke(
      data.roleId,
      data.permissionId
    );
  }

  async sync(
    data: SyncRolePermissionsInput
  ) {
    erpLogger.info(
      "Role permissions synchronized.",
      {
        roleId: data.roleId,
        totalPermissions:
          data.permissionIds.length,
      }
    );

    return rolePermissionRepository.sync(
      data.roleId,
      data.permissionIds
    );
  }
}

export const rolePermissionService =
  new RolePermissionService();