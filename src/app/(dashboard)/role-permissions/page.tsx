import { prisma } from "@/database";

import { RolePermissionsPage } from "@/modules/role-permissions/components";

export default async function RolePermissionsPageRoute() {
  const [roles, permissions, rolePermissions] =
    await Promise.all([
      prisma.role.findMany({
        where: {
          isActive: true,
          deletedAt: null,
        },
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
      }),

      prisma.permission.findMany({
        where: {
          isActive: true,
          deletedAt: null,
        },
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
      }),

      prisma.rolePermission.findMany({
        where: {
          isActive: true,
        },
        select: {
          roleId: true,
          permissionId: true,
        },
      }),
    ]);

  const groupedRolePermissions =
    roles.map((role) => ({
      roleId: role.id,
      permissionIds: rolePermissions
        .filter(
          (item) =>
            item.roleId === role.id
        )
        .map(
          (item) =>
            item.permissionId
        ),
    }));

  return (
    <RolePermissionsPage
      roles={roles}
      permissions={permissions}
      rolePermissions={
        groupedRolePermissions
      }
    />
  );
}