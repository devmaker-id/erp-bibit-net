"use server";

import { revalidatePath } from "next/cache";

import { safeAction } from "@/core";

import { posService } from "../services";

import { completeSaleValidator } from "../validators";

export const completeSaleAction =
  safeAction({
    schema: completeSaleValidator,
    handler: async (data) => {
      const result =
        await posService.completeSale(
          data
        );

      revalidatePath("/pos");

      return result;
    }
  });