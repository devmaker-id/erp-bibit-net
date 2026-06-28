import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type LoginCardProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function LoginCard({
  title,
  description,
  children,
  footer,
  className,
}: LoginCardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl border border-border/70 bg-card shadow-xl",
        className
      )}
    >
      {(title || description) && (
        <header className="border-b px-8 py-6">
          {title && (
            <h2 className="text-2xl font-semibold tracking-tight">
              {title}
            </h2>
          )}

          {description && (
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          )}
        </header>
      )}

      <div className="p-8">
        {children}
      </div>

      {footer && (
        <footer className="border-t bg-muted/30 px-8 py-4">
          {footer}
        </footer>
      )}
    </div>
  );
}