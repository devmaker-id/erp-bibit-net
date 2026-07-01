import { z } from "zod";

export const saleIdSchema = z
  .string()
  .cuid();

export const saleItemIdSchema = z
  .string()
  .cuid();

export const paymentIdSchema = z
  .string()
  .cuid();

export const customerIdSchema = z
  .string()
  .cuid()
  .nullable()
  .optional();

export const membershipIdSchema = z
  .string()
  .cuid();

export const cashierIdSchema = z
  .string()
  .cuid();

export const companyIdSchema = z
  .string()
  .cuid();

export const branchIdSchema = z
  .string()
  .cuid();

export const warehouseIdSchema = z
  .string()
  .cuid();

export const productIdSchema = z
  .string()
  .cuid();

export const quantitySchema = z
  .number()
  .positive();

export const priceSchema = z
  .number()
  .min(0);

export const discountSchema = z
  .number()
  .min(0)
  .default(0);

export const subtotalSchema = z
  .number()
  .min(0);

export const taxSchema = z
  .number()
  .min(0)
  .default(0);

export const grandTotalSchema = z
  .number()
  .min(0);

export const paidAmountSchema = z
  .number()
  .min(0)
  .default(0);

export const changeAmountSchema = z
  .number()
  .min(0)
  .default(0);

export const noteSchema = z
  .string()
  .trim()
  .max(500)
  .optional();

export const paymentMethodSchema = z.enum([
  "CASH",
  "TRANSFER",
  "QRIS",
  "DEBIT_CARD",
  "CREDIT_CARD",
]);

export const saleStatusSchema = z.enum([
  "DRAFT",
  "CHECKOUT",
  "PAID",
  "COMPLETED",
  "CANCELLED",
]);