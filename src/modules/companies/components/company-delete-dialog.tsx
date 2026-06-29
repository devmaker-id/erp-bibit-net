"use client";

import { useTransition } from "react";

import type { Company } from "@/generated/prisma/client";

import { toast } from "sonner";

import { deleteCompanyAction } from "../actions";
import { useRouter } from "next/navigation";

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

export type CompanyDeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  company: Company | null;
  onSuccess?: () => void;
};

export function CompanyDeleteDialog({
  open,
  onOpenChange,
  company,
  onSuccess,
}: CompanyDeleteDialogProps) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  function handleDelete() {
    if (!company) {
      return;
    }

    startTransition(async () => {
      const result = await deleteCompanyAction({
        id: company.id,
        force: false,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Company deleted.");
      
      router.refresh();

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
            Delete Company
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <strong>{company?.name}</strong>?
            <br />
            <br />
            This action performs a <strong>soft delete</strong>.
            The company can be restored later.
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
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}