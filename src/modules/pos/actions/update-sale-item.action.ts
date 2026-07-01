"use server";

import { revalidatePath } from "next/cache";

import { safeAction } from "@/core/";

import { posService } from "../services";

import { updateSaleItemValidator } from "../validators";

export const updateSaleItemAction =
  safeAction({
    schema: updateSaleItemValidator,
    handler: async (data) => {
      const result =
        await posService.updateSaleItem(
          data
        );

      revalidatePath("/pos");

      return result;
    }
  });