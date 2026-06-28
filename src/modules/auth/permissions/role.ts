import type { AuthSession } from "../contracts";

export function hasRole(
  auth: AuthSession,
  role: string,
): boolean {
  return auth.membership.role.code === role;
}

export function hasAnyRole(
  auth: AuthSession,
  roles: readonly string[],
): boolean {
  return roles.includes(auth.membership.role.code);
}