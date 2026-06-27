import { ZodError } from "zod";

import { AppError } from "@/core/errors";

import {
  success,
  failure,
} from "@/core/response";

import type {
  SafeActionOptions,
} from "./action.types";

export function safeAction<TInput, TResult>({
  schema,
  handler,
}: SafeActionOptions<TInput, TResult>) {
  return async (input: unknown) => {
    try {
      const data = schema.parse(input);

      const result = await handler(data);

      return success(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return failure(
          "Validation failed.",
          "VALIDATION_ERROR",
          error.flatten()
        );
      }

      if (error instanceof AppError) {
        return failure(
          error.message,
          error.code
        );
      }

      console.error(error);

      return failure(
        "Internal server error.",
        "INTERNAL_SERVER_ERROR"
      );
    }
  };
}