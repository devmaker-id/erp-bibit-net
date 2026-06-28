import { UnauthorizedError } from "@/core";
import { getCurrentSession } from "../utils";
import type { AuthSession } from "../contracts";

export async function requireAuth(): Promise<AuthSession> {
  const session = await getCurrentSession();

  if (!session) {
    throw new UnauthorizedError("Authentication required.");
  }

  return session;
}