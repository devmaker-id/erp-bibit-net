"use server";

import { revalidatePath } from "next/cache";

import { safeAction } from "@/core";

import { posService } from "../services";

import { cancelSaleValidator } from "../validators";

export const cancelSaleAction =
  safeAction({
    schema: cancelSaleValidator,
    handler: async (data) => {
        const result = await posService.cancelSale(data);
        revalidatePath("/pos");
        return result;
    }
  })