import { prisma } from "@/lib/prisma";
import { erpLogger } from "@/core";

export async function seedWarehouse() {
  erpLogger.info("🌱 Seeding Warehouse...");

  const company = await prisma.company.findUnique({
    where: {
      code: "BIBIT",
    },
  });

  if (!company) {
    throw new Error("Company not found.");
  }

  const branch = await prisma.branch.findUnique({
    where: {
      companyId_code: {
        companyId: company.id,
        code: "HO",
      },
    },
  });

  if (!branch) {
    throw new Error("Head Office branch not found.");
  }

  const warehouse = await prisma.warehouse.upsert({
    where: {
      companyId_branchId_code: {
        companyId: company.id,
        branchId: branch.id,
        code: "MAIN",
      },
    },
    update: {},
    create: {
      companyId: company.id,
      branchId: branch.id,

      code: "MAIN",
      name: "Main Warehouse",
      description: "Default warehouse.",

      isActive: true,
    },
  });

  erpLogger.info(`✅ Warehouse: ${warehouse.name}`);

  return warehouse;
}