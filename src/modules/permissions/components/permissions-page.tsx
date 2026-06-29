"use client";

import { useState } from "react";

import type { Permission } from "@/generated/prisma/client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { PermissionDialog } from "./permission-dialog";
import { PermissionDeleteDialog } from "./permission-delete-dialog";
import { PermissionTable } from "./permission-table";

export type PermissionsPageProps = {
  permissions: Permission[];
};

export function PermissionsPage({
  permissions,
}: PermissionsPageProps) {
  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [
    selectedPermission,
    setSelectedPermission,
  ] = useState<Permission | null>(
    null
  );

  function handleCreate() {
    setSelectedPermission(null);
    setDialogOpen(true);
  }

  function handleEdit(
    permission: Permission
  ) {
    setSelectedPermission(
      permission
    );

    setDialogOpen(true);
  }

  function handleDelete(
    permission: Permission
  ) {
    setSelectedPermission(
      permission
    );

    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Permissions
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage system permissions.
          </p>
        </div>

        <Button
          onClick={handleCreate}
        >
          <Plus className="mr-2 size-4" />
          New Permission
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <PermissionTable
            data={permissions}
            onEdit={handleEdit}
            onDelete={
              handleDelete
            }
          />
        </CardContent>
      </Card>

      <PermissionDialog
        open={dialogOpen}
        onOpenChange={
          setDialogOpen
        }
        permission={
          selectedPermission ??
          undefined
        }
      />

      <PermissionDeleteDialog
        open={deleteOpen}
        onOpenChange={
          setDeleteOpen
        }
        permission={
          selectedPermission
        }
      />
    </div>
  );
}