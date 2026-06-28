import { cache } from "react";

import { getSessionCookie } from "@/lib/auth";

import type { AuthSession } from "../contracts";
import { authService } from "../service";

export const getCurrentSession = cache(
  async (): Promise<AuthSession | null> => {
    const sessionToken = await getSessionCookie();

    if (!sessionToken) {
      return null;
    }

    return authService.findSession(sessionToken);
  },
);