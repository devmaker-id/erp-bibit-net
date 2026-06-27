import { prisma } from "@/lib/prisma";
import { erpLogger } from "@/core";

import { permissions } from "./data/permissions";
import { seedMany } from "./helpers/seed-many";

export async function seedPermission() {
  erpLogger.info("🌱 Seeding Permissions...");

  await seedMany({
    delegate: prisma.permission,
    unique: "code",
    data: permissions.map((permission) => ({
      ...permission,
      isSystem: true,
      isActive: true,
    })),
  });

  erpLogger.info(`✅ ${permissions.length} permissions seeded.`);
}