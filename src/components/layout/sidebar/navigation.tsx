import type { AuthSession } from "@/modules/auth/contracts";
import { navigation } from "@/config/navigation";

import { NavigationGroup } from "./navigation-group";

export type NavigationProps = {
  auth: AuthSession;
};
export function Navigation({ auth }: NavigationProps) {
  return (
    <nav className="space-y-4 px-2" aria-label="Sidebar">
      {navigation.map((group) => (
        <NavigationGroup key={group.title} group={group} auth={auth} />
      ))}
    </nav>
  );
}