import { prisma } from "@/lib/prisma";
import { erpLogger } from "@/core";

export async function seedBranch() {
  erpLogger.info("🌱 Seeding Branch...");

  const company = await prisma.company.findUnique({
    where: {
      code: "BIBIT",
    },
  });

  if (!company) {
    throw new Error("Company not found.");
  }

  const branch = await prisma.branch.upsert({
    where: {
      companyId_code: {
        companyId: company.id,
        code: "HO",
      },
    },
    update: {},
    create: {
      companyId: company.id,

      code: "HO",
      name: "Head Office",

      countryCode: "ID",
      timezone: "Asia/Jakarta",

      isHeadOffice: true,
      isActive: true,
    },
  });

  erpLogger.info(`✅ Branch: ${branch.name}`);

  return branch;
}