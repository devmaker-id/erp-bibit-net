import { branchService } from "@/modules/branches/services";

import { BranchesPage } from "@/modules/branches/components";

export default async function BranchesPageRoute() {
  const branches =
    await branchService.findAll();

  return (
    <BranchesPage
      branches={branches}
    />
  );
}