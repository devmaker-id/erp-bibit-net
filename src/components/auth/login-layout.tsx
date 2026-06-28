import type { ReactNode } from "react";

import { LoginBranding } from "./login-branding";
import { LoginCard } from "./login-card";
import { LoginFooter } from "./login-footer";
import { LoginMobileHeader } from "./login-mobile-header";

type LoginLayoutProps = {
  children: ReactNode;
};

export function LoginLayout({
  children,
}: LoginLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen lg:grid-cols-2">
        <LoginBranding />

        <section className="flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <LoginMobileHeader />

            <LoginCard
              title="Sign in"
              description="Sign in to continue to ERP Bibit Net."
              footer={<LoginFooter />}
            >
              {children}
            </LoginCard>
          </div>
        </section>
      </div>
    </main>
  );
}