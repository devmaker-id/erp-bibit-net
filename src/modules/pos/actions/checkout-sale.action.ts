"use server";

import { revalidatePath } from "next/cache";

import { safeAction } from "@/core";

import { posService } from "../services";

import { checkoutSaleValidator } from "../validators";

export const checkoutSaleAction =
  safeAction({
    schema: checkoutSaleValidator,
    handler: async (data) => {
      const result =
        await posService.checkoutSale(
          data
        );

      revalidatePath("/pos");

      return result;
    }
  });