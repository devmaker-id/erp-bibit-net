import type { AuthSession } from "@/modules/auth/contracts";

import { AppLogo } from "./app-logo";
import { Navigation } from "./navigation";

type Props = {
  auth: AuthSession;
};

export function AppSidebar({ auth }: Props) {
  return (
    <aside className="w-64 border-r bg-background">
      <AppLogo />

      <Navigation auth={auth} />
    </aside>
  );
}