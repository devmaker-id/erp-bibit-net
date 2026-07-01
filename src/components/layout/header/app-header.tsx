import type { AuthSession } from "@/modules/auth/contracts";

import { Breadcrumb } from "./breadcrumb";
import { CompanySwitcher } from "./company-switcher";
import { MobileTrigger } from "./mobile-trigger";
import { Search } from "./search";

export type AppHeaderProps = {
  auth: AuthSession;
};

export function AppHeader({
  auth,
}: AppHeaderProps) {
  return (
    <header className="flex h-16 items-center border-b bg-background px-6">

      {/* Left */}
      <div className="flex items-center gap-3">
        <MobileTrigger />
        <Breadcrumb />
      </div>

      {/* Center */}
      <div className="flex flex-1 justify-center px-8">
        <Search />
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <CompanySwitcher auth={auth} />
      </div>

    </header>
  );
}