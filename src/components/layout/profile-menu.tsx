"use client";

import type { AuthSession } from "@/modules/auth/contracts";

type Props = {
  auth: AuthSession;
};

export function ProfileMenu({
  auth,
}: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-right">
        <p className="font-medium">
          {auth.user.username}
        </p>

        <p className="text-xs text-muted-foreground">
          {auth.membership.role.name}
        </p>
      </div>

      <button>
        Logout
      </button>
    </div>
  );
}