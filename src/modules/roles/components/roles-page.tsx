"use client";

import { useState } from "react";

import type { Role } from "@/generated/prisma/client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { RoleDialog } from "./role-dialog";
import { RoleDeleteDialog } from "./role-delete-dialog";
import { RoleTable } from "./role-table";

export type RolesPageProps = {
  roles: Role[];
};

export function RolesPage({
  roles,
}: RolesPageProps) {
  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedRole, setSelectedRole] =
    useState<Role | null>(null);

  function handleCreate() {
    setSelectedRole(null);
    setDialogOpen(true);
  }

  function handleEdit(role: Role) {
    setSelectedRole(role);
    setDialogOpen(true);
  }

  function handleDelete(role: Role) {
    setSelectedRole(role);
    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Roles
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage system roles.
          </p>
        </div>

        <Button
          onClick={handleCreate}
        >
          <Plus className="mr-2 size-4" />
          New Role
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <RoleTable
            data={roles}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <RoleDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        role={
          selectedRole ?? undefined
        }
      />

      <RoleDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        role={selectedRole}
      />
    </div>
  );
}