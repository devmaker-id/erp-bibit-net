"use server";

import { revalidatePath } from "next/cache";

import { safeAction } from "@/core";

import { posService } from "../services";

import { paySaleValidator } from "../validators";

export const paySaleAction =
  safeAction({
    schema: paySaleValidator,
    handler: async (data) => {
      const result =
        await posService.paySale(
          data
        );

      revalidatePath("/pos");

      return result;
    }
  });