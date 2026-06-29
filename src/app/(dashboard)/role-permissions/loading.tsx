import { Skeleton } from "@/components/ui/skeleton";

export default function RolePermissionsLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-80" />
      </div>

      <div className="rounded-xl border bg-background p-6">
        <div className="mb-4">
          <Skeleton className="mb-2 h-5 w-32" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>

      <div className="rounded-xl border bg-background p-6">
        <div className="mb-6">
          <Skeleton className="h-6 w-40" />
        </div>

        {Array.from({ length: 4 }).map(
          (_, moduleIndex) => (
            <div
              key={moduleIndex}
              className="mb-8 space-y-4"
            >
              <Skeleton className="h-6 w-48" />

              <div className="space-y-4">
                {Array.from({
                  length: 3,
                }).map((_, groupIndex) => (
                  <div
                    key={groupIndex}
                    className="rounded-lg border p-4"
                  >
                    <Skeleton className="mb-4 h-5 w-32" />

                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                      {Array.from({
                        length: 4,
                      }).map(
                        (_, permissionIndex) => (
                          <div
                            key={
                              permissionIndex
                            }
                            className="flex items-center gap-3 rounded-md border p-3"
                          >
                            <Skeleton className="size-4 rounded" />

                            <div className="flex-1 space-y-2">
                              <Skeleton className="h-4 w-28" />
                              <Skeleton className="h-3 w-20" />
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>

      <div className="flex justify-end">
        <Skeleton className="h-10 w-36 rounded-lg" />
      </div>
    </div>
  );
}