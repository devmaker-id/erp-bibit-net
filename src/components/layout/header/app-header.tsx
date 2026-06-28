import type { AuthSession } from "@/modules/auth/contracts";

import { Breadcrumb } from "./breadcrumb";
import { CompanySwitcher } from "./company-switcher";
import { MobileTrigger } from "./mobile-trigger";
import { Search } from "./search";

export type AppHeaderProps = {
    auth: AuthSession;
};

export function AppHeader({ auth }: AppHeaderProps) {
    return (
        <header className="flex h-16 items-center border-b bg-background px-6">
            <div className="flex items-center gap-4">
                <MobileTrigger />
                <Breadcrumb />
            </div>

            <div className="ml-auto flex items-center gap-3">
                <Search />
                <CompanySwitcher auth={auth} />
            </div>
        </header>
    );
}