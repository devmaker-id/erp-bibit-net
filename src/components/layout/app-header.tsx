import type { AuthSession } from "@/modules/auth/contracts";

import { ProfileMenu } from "./profile-menu";

type Props = {
  auth: AuthSession;
};

export function AppHeader({ auth }: Props) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <h1 className="text-lg font-semibold">
        ERP Bibit Net
      </h1>

      <ProfileMenu auth={auth} />
    </header>
  );
}