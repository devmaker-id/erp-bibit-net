"use client";

import { useTransition } from "react";

import type { Role } from "@/generated/prisma/client";

import { toast } from "sonner";

import { deleteRoleAction } from "../actions";

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

export type RoleDeleteDialogProps = {
  open: boolean;
  onOpenChange: (
    open: boolean
  ) => void;

  role: Role | null;

  onSuccess?: () => void;
};

export function RoleDeleteDialog({
  open,
  onOpenChange,
  role,
  onSuccess,
}: RoleDeleteDialogProps) {
  const [isPending, startTransition] =
    useTransition();

  function handleDelete() {
    if (!role) {
      return;
    }

    startTransition(async () => {
      const result =
        await deleteRoleAction({
          id: role.id,
          force: false,
        });

      if (!result.success) {
        toast.error(result.message);

        return;
      }

      toast.success(
        "Role deleted."
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
            Delete Role
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to
            delete{" "}
            <strong>
              {role?.name}
            </strong>
            ?
            <br />
            <br />
            This action performs a{" "}
            <strong>soft delete</strong>.
            The role can be restored
            later.
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