import { Skeleton } from "@/components/ui/skeleton";

export default function BranchesLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>

        <Skeleton className="h-10 w-36 rounded-lg" />
      </div>

      <div className="rounded-xl border bg-background p-6">
        <div className="mb-6 flex items-center justify-between">
          <Skeleton className="h-10 w-80 rounded-lg" />
        </div>

        <div className="space-y-3">
          <Skeleton className="h-12 w-full rounded-lg" />

          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-14 w-full rounded-lg"
            />
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Skeleton className="h-4 w-32" />

          <div className="flex gap-2">
            <Skeleton className="h-9 w-24 rounded-lg" />
            <Skeleton className="h-9 w-24 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}