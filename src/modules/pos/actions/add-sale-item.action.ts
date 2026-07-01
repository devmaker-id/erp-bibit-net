"use server";

import { revalidatePath } from "next/cache";

import { safeAction } from "@/core";

import {
  posService,
} from "../services";

import {
  addSaleItemValidator,
} from "../validators";

export const addSaleItemAction =
  safeAction({
    schema: addSaleItemValidator,
    handler: async (data) => {
      const result =
        await posService.addSaleItem(
          data
        );

      revalidatePath("/pos");

      return result;
    }
  });