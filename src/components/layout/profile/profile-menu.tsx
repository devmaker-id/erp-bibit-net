"use client";

import Link from "next/link";

import {
  Settings,
  Shield,
  User,
} from "lucide-react";

import type { AuthSession } from "@/modules/auth/contracts";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ProfileCard } from "./profile-card";
import { LogoutButton } from "./logout-button";

export type ProfileMenuProps = {
  auth: AuthSession;
};

export function ProfileMenu({
  auth,
}: ProfileMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="w-full rounded-xl text-left outline-none"
        >
          <ProfileCard auth={auth} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="top"
        align="end"
        className="w-72"
      >
        <div className="border-b p-3">
          <ProfileCard auth={auth} />
        </div>

        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <User className="mr-2 size-4" />
              My Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/settings">
              <Settings className="mr-2 size-4" />
              Settings
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/security">
              <Shield className="mr-2 size-4" />
              Security
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}