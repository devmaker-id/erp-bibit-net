"use client";

import { useEffect } from "react";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: Error & {
    digest?: string;
  };

  reset: () => void;
};

export default function Error({
  error,
  reset,
}: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed">
      <AlertTriangle className="size-12 text-destructive" />

      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold">
          Failed to Load POS
        </h2>

        <p className="text-sm text-muted-foreground">
          An unexpected error
          occurred while loading
          the Point of Sale
          module.
        </p>
      </div>

      <Button
        onClick={reset}
      >
        Try Again
      </Button>
    </div>
  );
}