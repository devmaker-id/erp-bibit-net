"use client"

import Link from "next/link";
import { Fragment } from "react";

import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
      <Link href="/" className="hover:underline">
        Home
      </Link>
      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        const href = `/${segments.slice(0, index + 1).join("/")}`;

        return (
          <Fragment key={href}>
            <ChevronRight className="h-4 w-4" />
            {isLast ? (
              <span>{segment}</span>
            ) : (
              <Link href={href} className="hover:underline">
                {segment}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}