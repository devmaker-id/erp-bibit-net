"use client";

import { useEffect, useTransition } from "react";

import type { Branch } from "@/generated/prisma/client";

import { toast } from "sonner";

import {
  createBranchAction,
  updateBranchAction,
} from "../actions";

import { BranchForm } from "./branch-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type BranchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  branch?: Branch;

  onSuccess?: () => void;
};

export function BranchDialog({
  open,
  onOpenChange,
  branch,
  onSuccess,
}: BranchDialogProps) {
  const [isPending, startTransition] =
    useTransition();

  const isEdit = !!branch;

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
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit
              ? "Edit Branch"
              : "Create Branch"}
          </DialogTitle>

          <DialogDescription>
            {isEdit
              ? "Update branch information."
              : "Create a new branch."}
          </DialogDescription>
        </DialogHeader>

        <BranchForm
          loading={isPending}
          submitLabel={
            isEdit
              ? "Update Branch"
              : "Create Branch"
          }
          defaultValues={
            branch
              ? {
                  companyId:
                    branch.companyId,

                  code: branch.code,

                  name: branch.name,

                  email:
                    branch.email ?? "",

                  phone:
                    branch.phone ?? "",

                  address:
                    branch.address ?? "",

                  city:
                    branch.city ?? "",

                  province:
                    branch.province ?? "",

                  postalCode:
                    branch.postalCode ??
                    "",

                  countryCode:
                    branch.countryCode ??
                    "",

                  timezone:
                    branch.timezone ??
                    "",

                  description:
                    branch.description ??
                    "",

                  isHeadOffice:
                    branch.isHeadOffice,
                }
              : undefined
          }
          onSubmit={(values) => {
            startTransition(async () => {
              const result = isEdit
                ? await updateBranchAction({
                    ...values,
                    id: branch.id,
                  })
                : await createBranchAction(
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
                  ? "Branch updated."
                  : "Branch created."
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