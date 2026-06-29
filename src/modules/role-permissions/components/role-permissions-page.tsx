"use client";

import { useMemo, useState, useTransition } from "react";

import type {
  Permission,
  Role,
} from "@/generated/prisma/client";

import { toast } from "sonner";

import { syncRolePermissionsAction } from "../actions";

import { PermissionMatrix } from "./permission-matrix";
import { RoleSelector } from "./role-selector";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type RolePermissionsPageProps = {
  roles: Role[];

  permissions: Permission[];

  rolePermissions: {
    roleId: string;
    permissionIds: string[];
  }[];
};

export function RolePermissionsPage({
  roles,
  permissions,
  rolePermissions,
}: RolePermissionsPageProps) {
  const [isPending, startTransition] =
    useTransition();

  const [roleId, setRoleId] = useState(
    roles[0]?.id ?? ""
  );

  const selectedPermissions =
    useMemo(() => {
      return (
        rolePermissions.find(
          (item) =>
            item.roleId === roleId
        )?.permissionIds ?? []
      );
    }, [
      roleId,
      rolePermissions,
    ]);

  const [
    permissionIds,
    setPermissionIds,
  ] = useState(selectedPermissions);

  function handleRoleChange(
    value: string
  ) {
    setRoleId(value);

    const permissions =
      rolePermissions.find(
        (item) =>
          item.roleId === value
      )?.permissionIds ?? [];

    setPermissionIds(permissions);
  }

  function handleSave() {
    startTransition(async () => {
      const result =
        await syncRolePermissionsAction({
          roleId,
          permissionIds,
        });

      if (!result.success) {
        toast.error(result.message);

        return;
      }

      toast.success(
        "Role permissions updated."
      );
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Role Permissions
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage permissions for each
          role.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Select Role
          </CardTitle>
        </CardHeader>

        <CardContent>
          <RoleSelector
            roles={roles}
            value={roleId}
            onValueChange={
              handleRoleChange
            }
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Permissions
          </CardTitle>
        </CardHeader>

        <CardContent>
          <PermissionMatrix
            permissions={permissions}
            selected={permissionIds}
            onChange={
              setPermissionIds
            }
          />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={
            isPending || !roleId
          }
        >
          {isPending
            ? "Saving..."
            : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}