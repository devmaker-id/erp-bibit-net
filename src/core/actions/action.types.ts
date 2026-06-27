import { ZodType } from "zod";

export interface SafeActionOptions<TInput, TResult> {
  schema: ZodType<TInput>;
  handler: (input: TInput) => Promise<TResult>;
}