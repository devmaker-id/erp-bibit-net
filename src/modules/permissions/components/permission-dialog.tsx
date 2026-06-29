"use client";

import { useEffect, useTransition } from "react";

import type { Permission } from "@/generated/prisma/client";

import { toast } from "sonner";

import {
  createPermissionAction,
  updatePermissionAction,
} from "../actions";

import { PermissionForm } from "./permission-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type PermissionDialogProps = {
  open: boolean;
  onOpenChange: (
    open: boolean
  ) => void;

  permission?: Permission;

  onSuccess?: () => void;
};

export function PermissionDialog({
  open,
  onOpenChange,
  permission,
  onSuccess,
}: PermissionDialogProps) {
  const [isPending, startTransition] =
    useTransition();

  const isEdit = !!permission;

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
              ? "Edit Permission"
              : "Create Permission"}
          </DialogTitle>

          <DialogDescription>
            {isEdit
              ? "Update permission information."
              : "Create a new permission."}
          </DialogDescription>
        </DialogHeader>

        <PermissionForm
          loading={isPending}
          submitLabel={
            isEdit
              ? "Update Permission"
              : "Create Permission"
          }
          defaultValues={
            permission
              ? {
                  code:
                    permission.code,

                  name:
                    permission.name,

                  module:
                    permission.module,

                  group:
                    permission.group,

                  description:
                    permission.description ??
                    "",

                  sortOrder:
                    permission.sortOrder,

                  isSystem:
                    permission.isSystem,

                  isActive:
                    permission.isActive,
                }
              : undefined
          }
          onSubmit={(values) => {
            startTransition(async () => {
              const result = isEdit
                ? await updatePermissionAction({
                    ...values,
                    id: permission.id,
                  })
                : await createPermissionAction(
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
                  ? "Permission updated."
                  : "Permission created."
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