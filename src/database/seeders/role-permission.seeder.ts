import { prisma } from "@/lib/prisma";
import { erpLogger } from "@/core";

export async function seedRolePermission() {
  erpLogger.info("🌱 Seeding Role Permissions...");

  const superAdmin = await prisma.role.findUnique({
    where: {
      code: "SUPER_ADMIN",
    },
  });

  if (!superAdmin) {
    throw new Error("SUPER_ADMIN role not found.");
  }

  const permissions = await prisma.permission.findMany();

  for (const permission of permissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: superAdmin.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: superAdmin.id,
        permissionId: permission.id,
        isActive: true,
      },
    });
  }

  erpLogger.info("✅ SUPER_ADMIN permissions assigned.");
}