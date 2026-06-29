import { prisma } from "@/database";

export class RolePermissionRepository {
  async findByRoleId(roleId: string) {
    return prisma.rolePermission.findMany({
      where: {
        roleId,
        isActive: true,
      },
      include: {
        permission: true,
      },
      orderBy: [
        {
          permission: {
            module: "asc",
          },
        },
        {
          permission: {
            group: "asc",
          },
        },
        {
          permission: {
            sortOrder: "asc",
          },
        },
      ],
    });
  }

  async findPermissionIds(roleId: string) {
    const permissions =
      await prisma.rolePermission.findMany({
        where: {
          roleId,
          isActive: true,
        },
        select: {
          permissionId: true,
        },
      });

    return permissions.map(
      (item) => item.permissionId
    );
  }

  async assign(
    roleId: string,
    permissionId: string
  ) {
    return prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId,
          permissionId,
        },
      },
      update: {
        isActive: true,
        grantedAt: new Date(),
      },
      create: {
        roleId,
        permissionId,
      },
    });
  }

  async revoke(
    roleId: string,
    permissionId: string
  ) {
    return prisma.rolePermission.update({
      where: {
        roleId_permissionId: {
          roleId,
          permissionId,
        },
      },
      data: {
        isActive: false,
      },
    });
  }

  async sync(
    roleId: string,
    permissionIds: string[]
  ) {
    return prisma.$transaction(async (tx) => {
      await tx.rolePermission.updateMany({
        where: {
          roleId,
        },
        data: {
          isActive: false,
        },
      });

      for (const permissionId of permissionIds) {
        await tx.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId,
              permissionId,
            },
          },
          update: {
            isActive: true,
            grantedAt: new Date(),
          },
          create: {
            roleId,
            permissionId,
          },
        });
      }
    });
  }
}

export const rolePermissionRepository =
  new RolePermissionRepository();