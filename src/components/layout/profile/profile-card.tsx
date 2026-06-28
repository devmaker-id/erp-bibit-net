"use client";

import type { ReactNode } from "react";

import { ChevronUp } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import type { AuthSession } from "@/modules/auth/contracts";

export type ProfileCardProps = {
  auth: AuthSession;
  children?: ReactNode;
};

export function ProfileCard({
  auth,
  children,
}: ProfileCardProps) {
  const initials =
    auth.user.username
      ?.split(" ")
      .map((v) => v[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "U";

  return (
    <div className="flex w-full items-center gap-3 rounded-xl p-3 transition-colors hover:bg-accent">
      <Avatar className="size-10 border">
        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">
          {auth.user.username}
        </p>

        <p className="truncate text-xs text-muted-foreground">
          {auth.membership.role.name}
        </p>

        <p className="truncate text-xs text-muted-foreground">
          {auth.user.email}
        </p>
      </div>
    </div>
  );
}