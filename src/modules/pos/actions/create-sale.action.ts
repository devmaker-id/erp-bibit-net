"use server";

import { revalidatePath } from "next/cache";

import { safeAction } from "@/core";

import { posService } from "../services";

import { createSaleValidator } from "../validators";

export const createSaleAction =
  safeAction({
    schema: createSaleValidator,
    handler: async (data) => {
      const result =
        await posService.createSale(
          data
        );

      revalidatePath("/pos");

      return result;
    }
  });