"use server";

import { cookies } from "next/headers";

import { AUTH } from "./constants";

export async function setSessionCookie(
  sessionToken: string,
  expiresAt: Date,
) {
  const cookieStore = await cookies();

  cookieStore.set(AUTH.SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function getSessionCookie() {
  const cookieStore = await cookies();

  return cookieStore.get(AUTH.SESSION_COOKIE)?.value ?? null;
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();

  cookieStore.delete(AUTH.SESSION_COOKIE);
}