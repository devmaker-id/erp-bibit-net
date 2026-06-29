import { PermissionsPage } from "@/modules/permissions/components";
import { permissionService } from "@/modules/permissions/services";

export default async function PermissionsPageRoute() {
  const permissions =
    await permissionService.findAll();

  return (
    <PermissionsPage
      permissions={permissions}
    />
  );
}