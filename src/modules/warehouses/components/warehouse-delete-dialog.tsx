"use client";

import { useTransition } from "react";

import type {
  Warehouse,
} from "@/generated/prisma/client";

import { toast } from "sonner";

import { deleteWarehouseAction } from "../actions";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export type WarehouseDeleteDialogProps = {
  open: boolean;
  onOpenChange: (
    open: boolean
  ) => void;

  warehouse: Warehouse | null;

  onSuccess?: () => void;
};

export function WarehouseDeleteDialog({
  open,
  onOpenChange,
  warehouse,
  onSuccess,
}: WarehouseDeleteDialogProps) {
  const [isPending, startTransition] =
    useTransition();

  function handleDelete() {
    if (!warehouse) {
      return;
    }

    startTransition(async () => {
      const result =
        await deleteWarehouseAction({
          id: warehouse.id,
          force: false,
        });

      if (!result.success) {
        toast.error(result.message);

        return;
      }

      toast.success(
        "Warehouse deleted."
      );

      onOpenChange(false);

      onSuccess?.();
    });
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Warehouse
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to
            delete{" "}
            <strong>
              {warehouse?.name}
            </strong>
            ?
            <br />
            <br />
            This action performs a{" "}
            <strong>soft delete</strong>.
            The warehouse can be
            restored later.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending
              ? "Deleting..."
              : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}