import { prisma } from "@/lib/prisma";

export async function seedWarehouses(
  companyId: string,
  branchId: string
) {
  console.log("🌱 Seeding Warehouse...");

  const warehouse = await prisma.warehouse.upsert({
    where: {
      companyId_branchId_code: {
        companyId,
        branchId,
        code: "MAIN",
      },
    },
    update: {},
    create: {
      companyId,
      branchId,

      code: "MAIN",
      name: "Main Warehouse",

      isActive: true,
    },
  });

  console.log("✅ Warehouse:", warehouse.name);

  return warehouse;
}