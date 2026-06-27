import { prisma } from "@/lib/prisma";

export async function seedBranches(companyId: string) {
  console.log("🌱 Seeding Branch...");

  const branch = await prisma.branch.upsert({
    where: {
      companyId_code: {
        companyId,
        code: "HO",
      },
    },
    update: {},
    create: {
      companyId,

      code: "HO",
      name: "Head Office",

      isHeadOffice: true,
      isActive: true,
    },
  });

  console.log("✅ Branch:", branch.name);

  return branch;
}