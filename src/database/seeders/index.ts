import { seedCompanies } from "./companies.seeder";
import { seedBranches } from "./branches.seeder";
import { seedWarehouses } from "./warehouses.seeder";

async function main() {
  console.log("🌱 ERP Bibit Net Seeder");
  console.log("--------------------------------");

  const company = await seedCompanies();
  const branch = await seedBranches(company.id);
  await seedWarehouses(company.id, branch.id);

  console.log("--------------------------------");
  console.log("✅ Database seeding completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });