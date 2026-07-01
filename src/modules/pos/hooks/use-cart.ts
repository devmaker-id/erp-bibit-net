"use client";

import { useMemo, useState } from "react";

export type CartItem = {
  productId: string;

  code: string;

  name: string;

  quantity: number;

  price: number;

  discount: number;
};

export function useCart() {
  const [items, setItems] =
    useState<CartItem[]>([]);

  function addItem(
    item: CartItem
  ) {
    setItems((current) => {
      const index =
        current.findIndex(
          (cart) =>
            cart.productId ===
            item.productId
        );

      if (index === -1) {
        return [
          ...current,
          item,
        ];
      }

      return current.map(
        (cart) =>
          cart.productId ===
          item.productId
            ? {
                ...cart,
                quantity:
                  cart.quantity +
                  item.quantity,
              }
            : cart
      );
    });
  }

  function updateQuantity(
    productId: string,
    quantity: number
  ) {
    setItems((current) =>
      current.map((item) =>
        item.productId ===
        productId
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  }

  function updateDiscount(
    productId: string,
    discount: number
  ) {
    setItems((current) =>
      current.map((item) =>
        item.productId ===
        productId
          ? {
              ...item,
              discount,
            }
          : item
      )
    );
  }

  function removeItem(
    productId: string
  ) {
    setItems((current) =>
      current.filter(
        (item) =>
          item.productId !==
          productId
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  const subtotal =
    useMemo(() => {
      return items.reduce(
        (
          total,
          item
        ) =>
          total +
          item.quantity *
            item.price -
          item.discount,
        0
      );
    }, [items]);

  const totalDiscount =
    useMemo(() => {
      return items.reduce(
        (
          total,
          item
        ) =>
          total +
          item.discount,
        0
      );
    }, [items]);

  const grandTotal =
    subtotal;

  return {
    items,

    subtotal,

    totalDiscount,

    grandTotal,

    addItem,

    updateQuantity,

    updateDiscount,

    removeItem,

    clearCart,
  };
}