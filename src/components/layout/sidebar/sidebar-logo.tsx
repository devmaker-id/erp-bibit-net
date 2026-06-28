import Link from "next/link";

import { Building2 } from "lucide-react";

export function SidebarLogo() {
  return (
    <Link
      href="/dashboard"
      className="flex items-center gap-3"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Building2 className="h-5 w-5" />
      </div>

      <div className="flex flex-col">
        <span className="text-base font-bold leading-none">
          ERP Bibit Net
        </span>

        <span className="text-xs text-muted-foreground">
          Enterprise Resource Planning
        </span>
      </div>
    </Link>
  );
}