import {
  Skeleton,
} from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-16 w-full rounded-lg" />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <Skeleton className="h-12 w-full rounded-lg" />

          <Skeleton className="h-96 w-full rounded-lg" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-20 w-full rounded-lg" />

          <Skeleton className="h-48 w-full rounded-lg" />

          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}