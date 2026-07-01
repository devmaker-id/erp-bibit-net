"use client";

import { useState } from "react";

import { PaymentMethod as PaymentMethodType } from "../types/payment-method";

import {
  useCart,
} from "./use-cart";

export function usePos() {
  const cart = useCart();

  const [
    customerId,
    setCustomerId,
  ] = useState<
    string | null
  >(null);

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState<PaymentMethodType>(
    PaymentMethodType.CASH
  );

  const [
    paidAmount,
    setPaidAmount,
  ] = useState(0);

  const changeAmount =
    Math.max(
      0,
      paidAmount -
        cart.grandTotal
    );

  const canCheckout =
    cart.items.length > 0;

  const isPaid =
    paidAmount >=
    cart.grandTotal;

  function reset() {
    cart.clearCart();
    setCustomerId(
      null
    );
    setPaymentMethod(
      PaymentMethodType.CASH
    );
    setPaidAmount(0);
  }

  return {
    cart,
    customerId,
    setCustomerId,
    paymentMethod,
    setPaymentMethod,
    paidAmount,
    setPaidAmount,
    changeAmount,
    canCheckout,
    isPaid,
    reset,
  };
}