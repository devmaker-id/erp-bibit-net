"use server";

import { safeAction } from "@/core/actions";

import { authService } from "../service";

import { z } from "zod";

const logoutSchema = z.object({
  sessionId: z.string().min(1),
});

type LogoutInput = z.infer<typeof logoutSchema>;

export const logout = safeAction(
  logoutSchema,
  async ({ sessionId }: LogoutInput) => {
    await authService.logout(sessionId);

    return null;
  },
);