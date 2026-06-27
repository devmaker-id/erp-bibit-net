import { prisma } from "@/lib/prisma";
import { erpLogger } from "@/core";

export async function seedCompany() {
  erpLogger.info("🌱 Seeding Company...");

  const company = await prisma.company.upsert({
    where: {
      code: "BIBIT",
    },
    update: {},
    create: {
      code: "BIBIT",
      name: "Bibit Net",
      legalName: "PT Bibit Net Indonesia",

      countryCode: "ID",
      timezone: "Asia/Jakarta",
      currencyCode: "IDR",

      isActive: true,
    },
  });

  erpLogger.info(`✅ Company: ${company.name}`);

  return company;
}