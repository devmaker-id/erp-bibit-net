import { prisma } from "@/lib/prisma";
import { erpLogger } from "@/core";

import { roles } from "./data/roles";
import { seedMany } from "./helpers/seed-many";

export async function seedRole() {
  erpLogger.info("🌱 Seeding Roles...");

  await seedMany({
    delegate: prisma.role,
    unique: "code",
    data: roles.map((role) => ({
      ...role,
      isSystem: true,
      isActive: true,
    })),
  });

  erpLogger.info(`✅ ${roles.length} roles seeded.`);
}