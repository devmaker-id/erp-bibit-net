import { Building2 } from "lucide-react";

import { cn } from "@/lib/utils";

export type LoginLogoProps = {
  className?: string;
  showText?: boolean;
};

export function LoginLogo({
  className,
  showText = true,
}: LoginLogoProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4",
        className
      )}
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
        <Building2 className="size-7" />
      </div>

      {showText && (
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold tracking-tight">
            ERP Bibit Net
          </h1>

          <p className="truncate text-sm text-muted-foreground">
            Enterprise Resource Planning
          </p>
        </div>
      )}
    </div>
  );
}