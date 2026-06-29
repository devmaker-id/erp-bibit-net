import { z } from "zod";

export const roleIdSchema = z
  .string()
  .cuid();

export const permissionIdSchema = z
  .string()
  .cuid();

export const permissionIdsSchema = z
  .array(permissionIdSchema)
  .default([]);

export const grantedByIdSchema = z
  .string()
  .cuid()
  .optional();