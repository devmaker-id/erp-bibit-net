import { getCurrentSession } from "../utils";
import type { AuthSession } from "../contracts";
import { redirect } from "next/navigation";

export async function requireAuth(): Promise<AuthSession> {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}