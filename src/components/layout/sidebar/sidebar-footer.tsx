import type { AuthSession } from "@/modules/auth/contracts";

import { ProfileMenu } from "@/components/layout/profile";

export type SidebarFooterProps = {
  auth: AuthSession;
};

export function SidebarFooter({
  auth,
}: SidebarFooterProps) {
  return (
    <footer className="border-t bg-background p-4">
      <ProfileMenu auth={auth} />
    </footer>
  );
}