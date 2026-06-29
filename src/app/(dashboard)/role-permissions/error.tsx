"use client";

import { useEffect } from "react";

import {
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function RolePermissionsError({
  error,
  reset,
}: {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="mx-auto max-w-md space-y-6 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full border bg-destructive/10">
          <AlertTriangle className="size-8 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">
            Failed to Load Role Permissions
          </h1>

          <p className="text-sm text-muted-foreground">
            An unexpected error occurred while loading
            role permissions. Please try again.
          </p>
        </div>

        <Button
          onClick={reset}
          className="w-full"
        >
          <RefreshCw className="mr-2 size-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
}