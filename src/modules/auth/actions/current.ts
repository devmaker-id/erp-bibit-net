"use server";

import { getSessionCookie } from "@/lib/auth";

import { authService } from "../service";

export async function currentAuth() {
  const sessionToken = await getSessionCookie();

  if (!sessionToken) {
    return null;
  }

  return authService.findSession(sessionToken);
}
