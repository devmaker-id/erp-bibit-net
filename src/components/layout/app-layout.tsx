import type { ReactNode } from "react";

import type { AuthSession } from "@/modules/auth/contracts";

import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";

type AppLayoutProps = {
  auth: AuthSession;
  children: ReactNode;
};

export function AppLayout({
  auth,
  children,
}: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <AppSidebar auth={auth} />

      <div className="flex flex-1 flex-col">
        <AppHeader auth={auth} />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}