"use client";

import * as React from "react";

import type { Role } from "@/generated/prisma/client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnFiltersState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { Search } from "lucide-react";

import { roleColumns } from "./role-columns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type RoleTableProps = {
  data: Role[];

  onEdit: (
    role: Role
  ) => void;

  onDelete: (
    role: Role
  ) => void;
};

export function RoleTable({
  data,
  onEdit,
  onDelete,
}: RoleTableProps) {
  const [sorting, setSorting] =
    React.useState<SortingState>([]);

  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([]);

  const columns = React.useMemo(
    () =>
      roleColumns({
        onEdit,
        onDelete,
      }),
    [onEdit, onDelete]
  );

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      columnFilters,
    },

    onSortingChange: setSorting,

    onColumnFiltersChange:
      setColumnFilters,

    getCoreRowModel:
      getCoreRowModel(),

    getSortedRowModel:
      getSortedRowModel(),

    getFilteredRowModel:
      getFilteredRowModel(),

    getPaginationRowModel:
      getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute top-2.5 left-3 size-4 text-muted-foreground" />

          <Input
            placeholder="Search role..."
            className="pl-9"
            value={
              (table
                .getColumn("name")
                ?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("name")
                ?.setFilterValue(
                  event.target.value
                )
            }
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border bg-background">
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
                                .columnDef.header,
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
                              .columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={
                    columns.length
                  }
                  className="h-32 text-center text-muted-foreground"
                >
                  No roles found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {
            table.getFilteredRowModel()
              .rows.length
          }{" "}
          role
          {table.getFilteredRowModel()
            .rows.length !== 1 && "s"}
        </p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={
              !table.getCanPreviousPage()
            }
            onClick={() =>
              table.previousPage()
            }
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={
              !table.getCanNextPage()
            }
            onClick={() =>
              table.nextPage()
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}