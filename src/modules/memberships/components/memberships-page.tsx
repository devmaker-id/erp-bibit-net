"use client";

import { useState } from "react";

import type { Membership } from "@/generated/prisma/client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { MembershipDialog } from "./membership-dialog";
import { MembershipDeleteDialog } from "./membership-delete-dialog";
import { MembershipTable } from "./membership-table";

type Option = {
  id: string;
  name: string;
};

export type MembershipsPageProps = {
  memberships: Membership[];

  users: Option[];

  companies: Option[];

  branches: Option[];

  roles: Option[];
};

export function MembershipsPage({
  memberships,
  users,
  companies,
  branches,
  roles,
}: MembershipsPageProps) {
  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [
    selectedMembership,
    setSelectedMembership,
  ] = useState<Membership | null>(
    null
  );

  function handleCreate() {
    setSelectedMembership(null);

    setDialogOpen(true);
  }

  function handleEdit(
    membership: Membership
  ) {
    setSelectedMembership(
      membership
    );

    setDialogOpen(true);
  }

  function handleDelete(
    membership: Membership
  ) {
    setSelectedMembership(
      membership
    );

    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Memberships
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage user memberships.
          </p>
        </div>

        <Button
          onClick={handleCreate}
        >
          <Plus className="mr-2 size-4" />
          New Membership
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <MembershipTable
            data={memberships}
            onEdit={handleEdit}
            onDelete={
              handleDelete
            }
          />
        </CardContent>
      </Card>

      <MembershipDialog
        open={dialogOpen}
        onOpenChange={
          setDialogOpen
        }
        membership={
          selectedMembership ??
          undefined
        }
        users={users}
        companies={companies}
        branches={branches}
        roles={roles}
      />

      <MembershipDeleteDialog
        open={deleteOpen}
        onOpenChange={
          setDeleteOpen
        }
        membership={
          selectedMembership
        }
      />
    </div>
  );
}