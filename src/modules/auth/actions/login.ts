"use server";

import { safeAction } from "@/core/actions";
import { setSessionCookie } from "@/lib/auth";

import { authService } from "../service";
import { loginSchema } from "../validation";
import type { LoginActionResult } from "../contracts";

export const login = safeAction({
  schema: loginSchema,
  handler: async (input): Promise<LoginActionResult> => {
    const result = await authService.login(input);

    await setSessionCookie(
      result.sessionToken,
      result.expiresAt,
    );

    return {
      expiresAt: result.expiresAt,
      user: result.user,
      membership: result.membership,
    };
  },
});
