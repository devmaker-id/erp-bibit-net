"use client";

import { useEffect, useTransition } from "react";

import type { Company } from "@/generated/prisma/client";

import { toast } from "sonner";

import {
  createCompanyAction,
  updateCompanyAction,
} from "../actions";

import { CompanyForm } from "./company-form";

import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type CompanyDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  company?: Company;
  onSuccess?: () => void;
};

export function CompanyDialog({
  open,
  onOpenChange,
  company,
  onSuccess,
}: CompanyDialogProps) {
  const [isPending, startTransition] = useTransition();
  const isEdit = !!company;

  const router = useRouter();

  useEffect(() => {
    if (!open) return;
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
              ? "Edit Company"
              : "Create Company"}
          </DialogTitle>

          <DialogDescription>
            {isEdit
              ? "Update company information."
              : "Create a new company."}
          </DialogDescription>
        </DialogHeader>

        <CompanyForm
          loading={isPending}
          submitLabel={
            isEdit
              ? "Update Company"
              : "Create Company"
          }
          defaultValues={
            company
              ? {
                  code: company.code,
                  name: company.name,
                  legalName:
                    company.legalName ?? "",
                  email:
                    company.email ?? "",
                  phone:
                    company.phone ?? "",
                  website:
                    company.website ?? "",
                  taxNumber:
                    company.taxNumber ?? "",
                  address:
                    company.address ?? "",
                  city:
                    company.city ?? "",
                  province:
                    company.province ?? "",
                  postalCode:
                    company.postalCode ?? "",
                  countryCode:
                    company.countryCode ?? "",
                  timezone:
                    company.timezone ?? "",
                  currencyCode:
                    company.currencyCode ??
                    "",
                  logo:
                    company.logo ?? "",
                  description:
                    company.description ??
                    "",
                }
              : undefined
          }
          onSubmit={(values) => {
            startTransition(async () => {
              const result = isEdit
                ? await updateCompanyAction({
                    ...values,
                    id: company.id,
                  })
                : await createCompanyAction(
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
                  ? "Company updated."
                  : "Company created."
              );
              router.refresh();

              onOpenChange(false);

              onSuccess?.();
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}