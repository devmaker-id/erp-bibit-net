import { prisma } from "@/lib/prisma";

export async function seedCompanies() {
  console.log("🌱 Seeding Company...");

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
      currencyCode: "IDR",
      timezone: "Asia/Jakarta",

      isActive: true,
    },
  });

  console.log("✅ Company:", company.name);

  return company;
}