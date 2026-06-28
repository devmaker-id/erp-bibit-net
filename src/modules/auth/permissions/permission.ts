import type { AuthSession } from "../contracts";

export function hasPermission(
  auth: AuthSession,
  permission: string,
): boolean {
  return auth.membership.role.permissions.some(
    (item) => item.code === permission,
  );
}

export function hasAnyPermission(
  auth: AuthSession,
  permissions: readonly string[],
): boolean {
  return permissions.some((permission) =>
    hasPermission(auth, permission),
  );
}

export function hasAllPermissions(
  auth: AuthSession,
  permissions: readonly string[],
): boolean {
  return permissions.every((permission) =>
    hasPermission(auth, permission),
  );
}