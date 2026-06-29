"use client";

import { useTransition } from "react";

import type { Membership } from "@/generated/prisma/client";

import { toast } from "sonner";

import {
  createMembershipAction,
  updateMembershipAction,
} from "../actions";

import { MembershipForm } from "./membership-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Option = {
  id: string;
  name: string;
};

export type MembershipDialogProps = {
  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  membership?: Membership;

  users: Option[];

  companies: Option[];

  branches: Option[];

  roles: Option[];

  onSuccess?: () => void;
};

export function MembershipDialog({
  open,
  onOpenChange,
  membership,
  users,
  companies,
  branches,
  roles,
  onSuccess,
}: MembershipDialogProps) {
  const [isPending, startTransition] =
    useTransition();

  const isEdit = !!membership;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit
              ? "Edit Membership"
              : "Create Membership"}
          </DialogTitle>

          <DialogDescription>
            {isEdit
              ? "Update membership information."
              : "Create a new membership."}
          </DialogDescription>
        </DialogHeader>

        <MembershipForm
          users={users}
          companies={companies}
          branches={branches}
          roles={roles}
          loading={isPending}
          submitLabel={
            isEdit
              ? "Update Membership"
              : "Create Membership"
          }
          defaultValues={
            membership
              ? {
                  userId:
                    membership.userId,

                  companyId:
                    membership.companyId,

                  branchId:
                    membership.branchId,

                  roleId:
                    membership.roleId,

                  employeeNumber:
                    membership.employeeNumber ??
                    "",

                  title:
                    membership.title ??
                    "",

                  isDefault:
                    membership.isDefault,

                  isActive:
                    membership.isActive,
                }
              : undefined
          }
          onSubmit={(values) => {
            startTransition(
              async () => {
                const result =
                  isEdit
                    ? await updateMembershipAction(
                        {
                          ...values,
                          id: membership.id,
                        }
                      )
                    : await createMembershipAction(
                        values
                      );

                if (
                  !result.success
                ) {
                  toast.error(
                    result.message
                  );

                  return;
                }

                toast.success(
                  isEdit
                    ? "Membership updated."
                    : "Membership created."
                );

                onOpenChange(
                  false
                );

                onSuccess?.();
              }
            );
          }}
        />
      </DialogContent>
    </Dialog>
  );
}