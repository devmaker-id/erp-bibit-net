import "dotenv/config";

import { prisma } from "@/lib/prisma";
import { erpLogger } from "@/core";

import { seedCompany } from "./company.seeder";
import { seedBranch } from "./branch.seeder";
import { seedWarehouse } from "./warehouse.seeder";

import { seedPermission } from "./permission.seeder";
import { seedRole } from "./role.seeder";
import { seedRolePermission } from "./role-permission.seeder";

import { seedUser } from "./user.seeder";
import { seedMembership } from "./membership.seeder";

async function main() {
  erpLogger.info("🌱 ERP Bibit Net Seeder");

  await seedCompany();
  await seedBranch();
  await seedWarehouse();

  await seedPermission();
  await seedRole();
  await seedRolePermission();

  await seedUser();
  await seedMembership();

  erpLogger.info("Database seeding completed.");
}

main().catch((error) => {
    erpLogger.error(error);

    process.exit(1);
  }).finally(async () => {
    await prisma.$disconnect();
  });