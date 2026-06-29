"use client";

import type { Membership } from "@/generated/prisma/client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { membershipColumns } from "./membership-columns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type MembershipTableProps = {
  data: Membership[];

  onEdit: (
    membership: Membership
  ) => void;

  onDelete: (
    membership: Membership
  ) => void;
};

export function MembershipTable({
  data,
  onEdit,
  onDelete,
}: MembershipTableProps) {
  const table = useReactTable({
    data,

    columns: membershipColumns({
      onEdit,
      onDelete,
    }),

    getCoreRowModel:
      getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table
          .getHeaderGroups()
          .map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
            >
              {headerGroup.headers.map(
                (header) => (
                  <TableHead
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column
                            .columnDef
                            .header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              )}
            </TableRow>
          ))}
      </TableHeader>

      <TableBody>
        {table.getRowModel().rows
          .length ? (
          table
            .getRowModel()
            .rows.map((row) => (
              <TableRow
                key={row.id}
              >
                {row
                  .getVisibleCells()
                  .map((cell) => (
                    <TableCell
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column
                          .columnDef
                          .cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
              </TableRow>
            ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={8}
              className="h-24 text-center"
            >
              No memberships found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}