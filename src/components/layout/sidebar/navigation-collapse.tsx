"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { AuthSession } from "@/modules/auth/contracts";
import type { NavigationItem as NavigationItemType } from "@/config/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { navigationIcons } from "./navigation-icons";
import { hasPermission } from "@/modules/auth/permissions/permission";
import { cn } from "@/lib/utils";

export type NavigationCollapseProps = {
  item: NavigationItemType;
  auth: AuthSession;
};

export function NavigationCollapse({
  item,
  auth,
}: NavigationCollapseProps) {
  const pathname = usePathname();

  const Icon = item.icon
    ? navigationIcons[item.icon]
    : undefined;

  const defaultOpen = item.children?.some(
    (child) =>
      child.href &&
      (pathname === child.href ||
        pathname.startsWith(`${child.href}/`))
  );

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpen ? item.title : undefined}
    >
      <AccordionItem
        value={item.title}
        className="border-none"
      >
        <AccordionTrigger className="h-10 rounded-lg px-3 py-0 hover:no-underline hover:bg-accent">
          <div className="flex items-center gap-3">
            {Icon && (
              <Icon className="ml-1 size-[18px] text-muted-foreground" />
            )}

            <span className="text-sm font-medium">
              {item.title}
            </span>
          </div>
        </AccordionTrigger>

        <AccordionContent className="pb-0">
          <div className="space-y-1 pl-9">
            {item.children?.map((child) => {
              if (
                child.permission &&
                !hasPermission(auth, child.permission)
              ) {
                return null;
              }

              if (!child.href) {
                return null;
              }

              const active =
                pathname === child.href ||
                pathname.startsWith(`${child.href}/`);

              return (
                <Link
                  key={child.title}
                  href={child.href}
                  className={cn(
                    "flex h-9 items-center rounded-md px-3 text-sm transition-colors",
                    active
                      ? "bg-accent text-primary font-medium"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  {child.title}
                </Link>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}