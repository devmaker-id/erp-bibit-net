import { warehouseService } from "@/modules/warehouses/services";

import { WarehousesPage } from "@/modules/warehouses/components";

export default async function WarehousesPageRoute() {
  const warehouses =
    await warehouseService.findAll();

  return (
    <WarehousesPage
      warehouses={warehouses}
    />
  );
}