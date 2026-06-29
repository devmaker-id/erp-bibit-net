"use client";

import { useTransition } from "react";

import type { Membership } from "@/generated/prisma/client";

import { toast } from "sonner";

import { deleteMembershipAction } from "../actions";

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

export type MembershipDeleteDialogProps = {
  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  membership: Membership | null;

  onSuccess?: () => void;
};

export function MembershipDeleteDialog({
  open,
  onOpenChange,
  membership,
  onSuccess,
}: MembershipDeleteDialogProps) {
  const [isPending, startTransition] =
    useTransition();

  function handleDelete() {
    if (!membership) {
      return;
    }

    startTransition(async () => {
      const result =
        await deleteMembershipAction({
          id: membership.id,
          force: false,
        });

      if (!result.success) {
        toast.error(result.message);

        return;
      }

      toast.success(
        "Membership deleted."
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
            Delete Membership
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to
            delete this membership?
            <br />
            <br />
            This action performs a{" "}
            <strong>soft delete</strong>.
            The membership can be restored
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