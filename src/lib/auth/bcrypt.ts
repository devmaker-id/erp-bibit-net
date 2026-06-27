import bcrypt from "bcrypt";

import { AUTH } from "./constants";

export async function hashPassword(
  password: string,
): Promise<string> {
  return bcrypt.hash(password, AUTH.PASSWORD_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}