"use client";

import { useState } from "react";

import type { Company } from "@/generated/prisma/client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { CompanyDialog } from "./company-dialog";
import { CompanyDeleteDialog } from "./company-delete-dialog";
import { CompanyTable } from "./company-table";

export type CompaniesPageProps = {
  companies: Company[];
};

export function CompaniesPage({
  companies,
}: CompaniesPageProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedCompany, setSelectedCompany] =
    useState<Company | null>(null);

  function handleCreate() {
    setSelectedCompany(null);
    setDialogOpen(true);
  }

  function handleEdit(company: Company) {
    setSelectedCompany(company);
    setDialogOpen(true);
  }

  function handleDelete(company: Company) {
    setSelectedCompany(company);
    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Companies
          </h1>

          <p className="text-muted-foreground">
            Manage companies within your ERP workspace.
          </p>
        </div>

        <Button onClick={handleCreate}>
          <Plus className="mr-2 size-4" />
          New Company
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <CompanyTable
            data={companies}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <CompanyDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        company={selectedCompany ?? undefined}
      />

      <CompanyDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        company={selectedCompany}
      />
    </div>
  );
}