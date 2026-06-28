"use server";

import { safeAction } from "@/core/actions";
import {
  clearSessionCookie,
  getSessionCookie,
} from "@/lib/auth";
import { z } from "zod";

import { authService } from "../service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const logoutSchema = z.object({}).optional();

export const logout = safeAction({
  schema: logoutSchema,
  handler: async () => {
    const sessionToken = await getSessionCookie();
    if (sessionToken) {
      await authService.logoutByToken(sessionToken);
    }
    await clearSessionCookie();
    return null
  },
});
