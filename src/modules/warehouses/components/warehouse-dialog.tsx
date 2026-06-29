"use client";

import { useEffect, useTransition } from "react";

import type {
  Warehouse,
} from "@/generated/prisma/client";

import { toast } from "sonner";

import {
  createWarehouseAction,
  updateWarehouseAction,
} from "../actions";

import { WarehouseForm } from "./warehouse-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type WarehouseDialogProps = {
  open: boolean;
  onOpenChange: (
    open: boolean
  ) => void;

  warehouse?: Warehouse;

  onSuccess?: () => void;
};

export function WarehouseDialog({
  open,
  onOpenChange,
  warehouse,
  onSuccess,
}: WarehouseDialogProps) {
  const [isPending, startTransition] =
    useTransition();

  const isEdit = !!warehouse;

  useEffect(() => {
    if (!open) {
      return;
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit
              ? "Edit Warehouse"
              : "Create Warehouse"}
          </DialogTitle>

          <DialogDescription>
            {isEdit
              ? "Update warehouse information."
              : "Create a new warehouse."}
          </DialogDescription>
        </DialogHeader>

        <WarehouseForm
          loading={isPending}
          submitLabel={
            isEdit
              ? "Update Warehouse"
              : "Create Warehouse"
          }
          defaultValues={
            warehouse
              ? {
                  companyId:
                    warehouse.companyId,

                  branchId:
                    warehouse.branchId,

                  code:
                    warehouse.code,

                  name:
                    warehouse.name,

                  description:
                    warehouse.description ??
                    "",
                }
              : undefined
          }
          onSubmit={(values) => {
            startTransition(async () => {
              const result = isEdit
                ? await updateWarehouseAction(
                    {
                      ...values,
                      id: warehouse.id,
                    }
                  )
                : await createWarehouseAction(
                    values
                  );

              if (!result.success) {
                toast.error(
                  result.message
                );

                return;
              }

              toast.success(
                isEdit
                  ? "Warehouse updated."
                  : "Warehouse created."
              );

              onOpenChange(false);

              onSuccess?.();
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}