import crypto from "node:crypto";

import { AUTH } from "./constants";

export function generateSessionToken(): string {
  return crypto.randomBytes(
    AUTH.SESSION_TOKEN_BYTES,
  ).toString("hex");
}

export function hashToken(
  token: string,
): string {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}