import bcrypt from "bcrypt";

import { AUTH } from "./constants";

/**
 * Hash a plain password.
 */
export async function hashPassword(
  password: string,
): Promise<string> {
  return bcrypt.hash(password, AUTH.PASSWORD_ROUNDS);
}

/**
 * Verify a plain password against its hash.
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}