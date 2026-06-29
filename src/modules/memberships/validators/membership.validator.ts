import { z } from "zod";

export const userIdSchema = z
  .string()
  .cuid();

export const companyIdSchema = z
  .string()
  .cuid();

export const branchIdSchema = z
  .string()
  .cuid();

export const roleIdSchema = z
  .string()
  .cuid();

export const employeeNumberSchema = z
  .string()
  .trim()
  .max(50)
  .optional();

export const titleSchema = z
  .string()
  .trim()
  .max(100)
  .optional();

export const isDefaultSchema =
  z.boolean();

export const isActiveSchema =
  z.boolean();