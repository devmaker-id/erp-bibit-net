"use server";

import { z } from "zod";
import { safeAction } from "@/core/actions";
import { authService } from "../service";

const logoutSchema = z.object({
  sessionId: z.string(),
});

export const logout = safeAction({
  schema: logoutSchema,
  handler: async ({ sessionId }) => {
    await authService.logout(sessionId);
    return null;
  },
});