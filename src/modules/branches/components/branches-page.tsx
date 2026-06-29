"use client";

import { useState } from "react";

import type { Branch } from "@/generated/prisma/client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { BranchDialog } from "./branch-dialog";
import { BranchDeleteDialog } from "./branch-delete-dialog";
import { BranchTable } from "./branch-table";

export type BranchesPageProps = {
  branches: Branch[];
};

export function BranchesPage({
  branches,
}: BranchesPageProps) {
  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedBranch, setSelectedBranch] =
    useState<Branch | null>(null);

  function handleCreate() {
    setSelectedBranch(null);
    setDialogOpen(true);
  }

  function handleEdit(branch: Branch) {
    setSelectedBranch(branch);
    setDialogOpen(true);
  }

  function handleDelete(branch: Branch) {
    setSelectedBranch(branch);
    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Branches
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage company branches.
          </p>
        </div>

        <Button onClick={handleCreate}>
          <Plus className="mr-2 size-4" />
          New Branch
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <BranchTable
            data={branches}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <BranchDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        branch={selectedBranch ?? undefined}
      />

      <BranchDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        branch={selectedBranch}
      />
    </div>
  );
}