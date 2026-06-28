import type { ReactNode } from "react";

import { LoginLayout } from "@/components/auth/login-layout";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <LoginLayout>
      {children}
    </LoginLayout>
  );
}