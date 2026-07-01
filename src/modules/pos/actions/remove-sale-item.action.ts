"use server";

import { revalidatePath } from "next/cache";

import { safeAction } from "@/core/";

import { posService } from "../services";

import { removeSaleItemValidator } from "../validators";

export const removeSaleItemAction =
  safeAction({
    schema: removeSaleItemValidator,
    handler: async (data) => {
      const result =
        await posService.removeSaleItem(
          data
        );

      revalidatePath("/pos");

      return result;
    }
  });