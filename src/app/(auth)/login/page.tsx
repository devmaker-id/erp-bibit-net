import type { Metadata } from "next";

import { LoginForm } from "@/components/auth";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <LoginForm />
  );
}