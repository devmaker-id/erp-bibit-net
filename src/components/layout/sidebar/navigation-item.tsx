"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { AuthSession } from "@/modules/auth/contracts";
import type { NavigationItem as NavigationItemType } from "@/config/navigation";

import { cn } from "@/lib/utils";
import { hasPermission } from "@/modules/auth/permissions/permission";
import { navigationIcons } from "./navigation-icons";

export type NavigationItemProps = {
  item: NavigationItemType;
  auth: AuthSession;
};

export function NavigationItem({
  item,
  auth,
}: NavigationItemProps) {
  const pathname = usePathname();

  if (item.permission && !hasPermission(auth, item.permission)) {
    return null;
  }

  if (!item.href) {
    return null;
  }

  const active =
    pathname === item.href ||
    pathname.startsWith(`${item.href}/`);

  const Icon = item.icon
    ? navigationIcons[item.icon]
    : undefined;

  return (
    <Link
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      className={cn(
        "group relative flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-all duration-200",

        "text-muted-foreground",

        "hover:bg-accent hover:text-foreground",

        active &&
          "bg-accent text-foreground"
      )}
    >
      {/* Active Indicator */}
      {active && (
        <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
      )}

      {Icon && (
        <Icon
          className={cn(
            "ml-1 size-[18px] shrink-0 transition-colors",
            active
              ? "text-primary"
              : "text-muted-foreground group-hover:text-foreground"
          )}
        />
      )}

      <span className="truncate">
        {item.title}
      </span>

      {item.badge && (
        <span className="ml-auto rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium">
          {item.badge}
        </span>
      )}
    </Link>
  );
}