"use server";

import { safeAction } from "@/core/actions";

import { setSessionCookie } from "@/lib/auth";

import { authService } from "../service";
import {
  loginSchema,
  type LoginInput,
} from "../validation";

export const login = safeAction(
  loginSchema,
  async (input: LoginInput) => {
    const result = await authService.login(input);

    await setSessionCookie(
      result.sessionToken,
      result.expiresAt,
    );

    return result;
  },
);