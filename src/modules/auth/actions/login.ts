"use server";

import { safeAction } from "@/core/actions";
import { authService } from "../service";
import { loginSchema } from "../validation";

export const login = safeAction({
  schema: loginSchema,
  handler: async (input) => {
    return authService.login(input)
  },
});