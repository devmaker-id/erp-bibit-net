"use client";

import { useEffect, useTransition } from "react";

import type { Role } from "@/generated/prisma/client";

import { toast } from "sonner";

import {
  createRoleAction,
  updateRoleAction,
} from "../actions";

import { RoleForm } from "./role-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type RoleDialogProps = {
  open: boolean;
  onOpenChange: (
    open: boolean
  ) => void;

  role?: Role;

  onSuccess?: () => void;
};

export function RoleDialog({
  open,
  onOpenChange,
  role,
  onSuccess,
}: RoleDialogProps) {
  const [isPending, startTransition] =
    useTransition();

  const isEdit = !!role;

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
              ? "Edit Role"
              : "Create Role"}
          </DialogTitle>

          <DialogDescription>
            {isEdit
              ? "Update role information."
              : "Create a new role."}
          </DialogDescription>
        </DialogHeader>

        <RoleForm
          loading={isPending}
          submitLabel={
            isEdit
              ? "Update Role"
              : "Create Role"
          }
          defaultValues={
            role
              ? {
                  code: role.code,

                  name: role.name,

                  description:
                    role.description ??
                    "",

                  level:
                    role.level,

                  sortOrder:
                    role.sortOrder,

                  isSystem:
                    role.isSystem,

                  isActive:
                    role.isActive,
                }
              : undefined
          }
          onSubmit={(values) => {
            startTransition(async () => {
              const result = isEdit
                ? await updateRoleAction({
                    ...values,
                    id: role.id,
                  })
                : await createRoleAction(
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
                  ? "Role updated."
                  : "Role created."
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