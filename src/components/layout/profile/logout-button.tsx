"use client";

import { useTransition } from "react";

import { LogOut } from "lucide-react";

import { logout } from "@/modules/auth/actions";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await logout({
        schema: {},
        payload: {},
      });
    });
  }

  return (
    <DropdownMenuItem
      onSelect={handleLogout}
      disabled={isPending}
      className="text-destructive focus:text-destructive"
    >
      <LogOut className="mr-2 size-4" />

      Logout

      {isPending && (
        <span className="ml-auto text-xs text-muted-foreground">
          ...
        </span>
      )}
    </DropdownMenuItem>
  );
}