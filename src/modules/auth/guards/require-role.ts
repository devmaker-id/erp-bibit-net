import { ForbiddenError } from "@/core";

import type { AuthSession } from "../contracts";
import { hasAnyRole } from "../permissions";
import { requireAuth } from "./require-auth";

export async function requireRole(
  role: string | readonly string[],
): Promise<AuthSession> {
  const auth = await requireAuth();

  const roles = Array.isArray(role)
    ? role
    : [role];

  if (!hasAnyRole(auth, roles)) {
    throw new ForbiddenError(
      "You don't have the required role.",
    );
  }

  return auth;
}