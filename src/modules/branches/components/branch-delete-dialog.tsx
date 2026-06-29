"use client";

import { useTransition } from "react";

import type { Branch } from "@/generated/prisma/client";

import { toast } from "sonner";

import { deleteBranchAction } from "../actions";

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

export type BranchDeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  branch: Branch | null;
  onSuccess?: () => void;
};

export function BranchDeleteDialog({
  open,
  onOpenChange,
  branch,
  onSuccess,
}: BranchDeleteDialogProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!branch) {
      return;
    }

    startTransition(async () => {
      const result = await deleteBranchAction({
        id: branch.id,
        force: false,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Branch deleted.");

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
            Delete Branch
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <strong>{branch?.name}</strong>?
            <br />
            <br />
            This action performs a{" "}
            <strong>soft delete</strong>.
            The branch can be restored later.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
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