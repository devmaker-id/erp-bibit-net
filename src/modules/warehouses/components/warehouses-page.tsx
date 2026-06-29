"use client";

import { useState } from "react";

import type {
  WarehouseRow,
} from "./warehouse-columns";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { WarehouseDialog } from "./warehouse-dialog";
import { WarehouseDeleteDialog } from "./warehouse-delete-dialog";
import { WarehouseTable } from "./warehouse-table";

export type WarehousesPageProps = {
  warehouses: WarehouseRow[];
};

export function WarehousesPage({
  warehouses,
}: WarehousesPageProps) {
  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [
    selectedWarehouse,
    setSelectedWarehouse,
  ] = useState<WarehouseRow | null>(
    null
  );

  function handleCreate() {
    setSelectedWarehouse(null);
    setDialogOpen(true);
  }

  function handleEdit(
    warehouse: WarehouseRow
  ) {
    setSelectedWarehouse(
      warehouse
    );

    setDialogOpen(true);
  }

  function handleDelete(
    warehouse: WarehouseRow
  ) {
    setSelectedWarehouse(
      warehouse
    );

    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Warehouses
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage company
            warehouses.
          </p>
        </div>

        <Button
          onClick={handleCreate}
        >
          <Plus className="mr-2 size-4" />
          New Warehouse
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <WarehouseTable
            data={warehouses}
            onEdit={handleEdit}
            onDelete={
              handleDelete
            }
          />
        </CardContent>
      </Card>

      <WarehouseDialog
        open={dialogOpen}
        onOpenChange={
          setDialogOpen
        }
        warehouse={
          selectedWarehouse ??
          undefined
        }
      />

      <WarehouseDeleteDialog
        open={deleteOpen}
        onOpenChange={
          setDeleteOpen
        }
        warehouse={
          selectedWarehouse
        }
      />
    </div>
  );
}