"use client";

import { useMemo } from "react";

import type { Permission } from "@/generated/prisma/client";

import { Checkbox } from "@/components/ui/checkbox";

type PermissionMatrixProps = {
  permissions: Permission[];

  selected: string[];

  onChange: (
    permissionIds: string[]
  ) => void;
};

export function PermissionMatrix({
  permissions,
  selected,
  onChange,
}: PermissionMatrixProps) {
  const grouped = useMemo(() => {
    const result: Record<
      string,
      Record<string, Permission[]>
    > = {};

    for (const permission of permissions) {
      if (!result[permission.module]) {
        result[permission.module] = {};
      }

      if (
        !result[permission.module][
          permission.group
        ]
      ) {
        result[permission.module][
          permission.group
        ] = [];
      }

      result[permission.module][
        permission.group
      ].push(permission);
    }

    return result;
  }, [permissions]);

  function toggle(id: string) {
    if (selected.includes(id)) {
      onChange(
        selected.filter(
          (permissionId) =>
            permissionId !== id
        )
      );

      return;
    }

    onChange([...selected, id]);
  }

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(
        ([module, groups]) => (
          <section
            key={module}
            className="space-y-6"
          >
            <div>
              <h2 className="text-lg font-semibold">
                {module}
              </h2>

              <div className="mt-2 border-b" />
            </div>

            {Object.entries(groups).map(
              ([group, permissions]) => (
                <div
                  key={group}
                  className="space-y-3 rounded-lg border p-4"
                >
                  <h3 className="font-medium">
                    {group}
                  </h3>

                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                    {permissions.map(
                      (permission) => (
                        <label
                          key={
                            permission.id
                          }
                          className="flex cursor-pointer items-center gap-3 rounded-md border p-3 hover:bg-muted/40"
                        >
                          <Checkbox
                            checked={selected.includes(
                              permission.id
                            )}
                            onCheckedChange={() =>
                              toggle(
                                permission.id
                              )
                            }
                          />

                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {
                                permission.name
                              }
                            </span>

                            <span className="text-xs text-muted-foreground">
                              {
                                permission.code
                              }
                            </span>
                          </div>
                        </label>
                      )
                    )}
                  </div>
                </div>
              )
            )}
          </section>
        )
      )}
    </div>
  );
}