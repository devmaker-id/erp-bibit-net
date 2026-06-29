import { RolesPage } from "@/modules/roles/components";
import { roleService } from "@/modules/roles/services";

export default async function RolesPageRoute() {
  const roles =
    await roleService.findAll();

  return (
    <RolesPage roles={roles} />
  );
}