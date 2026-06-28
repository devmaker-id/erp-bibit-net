import { ForbiddenError } from "@/core";

import type { AuthSession } from "../contracts";
import { hasPermission } from "../permissions";
import { requireAuth } from "./require-auth";

export async function requirePermission(
  permission: string,
): Promise<AuthSession> {
  const auth = await requireAuth();

  if (!hasPermission(auth, permission)) {
    throw new ForbiddenError(
      `Missing permission '${permission}'.`,
    );
  }

  return auth;
}