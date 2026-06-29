"use client";

import { useTransition } from "react";

import type { Permission } from "@/generated/prisma/client";

import { toast } from "sonner";

import { deletePermissionAction } from "../actions";

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

export type PermissionDeleteDialogProps = {
  open: boolean;
  onOpenChange: (
    open: boolean
  ) => void;

  permission: Permission | null;

  onSuccess?: () => void;
};

export function PermissionDeleteDialog({
  open,
  onOpenChange,
  permission,
  onSuccess,
}: PermissionDeleteDialogProps) {
  const [isPending, startTransition] =
    useTransition();

  function handleDelete() {
    if (!permission) {
      return;
    }

    startTransition(async () => {
      const result =
        await deletePermissionAction({
          id: permission.id,
          force: false,
        });

      if (!result.success) {
        toast.error(result.message);

        return;
      }

      toast.success(
        "Permission deleted."
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
            Delete Permission
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to
            delete{" "}
            <strong>
              {permission?.name}
            </strong>
            ?
            <br />
            <br />
            This action performs a{" "}
            <strong>soft delete</strong>.
            The permission can be
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