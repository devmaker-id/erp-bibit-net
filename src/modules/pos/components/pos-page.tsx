"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  SaleStatus,
} from "../types";

import {
  usePos,
} from "../hooks/use-pos";

import {
  CustomerSelector,
  PaymentPanel,
  PaymentSummary,
  PosHeader,
  PosLayout,
  ProductGrid,
  ProductPickerDialog,
  ProductSearch,
  SaleItems,
} from "./";

type Option = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  code: string;
  barcode: string | null;
  name: string;
  price: number;
  stock?: number;
};

type ProductGridItem = Omit<
  Product,
  "barcode"
>;

type PosPageProps = {
  customers: Option[];
  products: Product[];
};

export function PosPage({
  customers,
  products,
}: PosPageProps) {
  const pos = usePos();

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    status,
    setStatus,
  ] = useState<SaleStatus>(
    SaleStatus.DRAFT
  );

  const filteredProducts =
    useMemo(() => {
      const keyword = search
        .trim()
        .toLowerCase();

      if (!keyword) {
        return products;
      }

      return products.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(keyword) ||
          product.code
            .toLowerCase()
            .includes(keyword) ||
          (product.barcode
            ?.toLowerCase()
            .includes(keyword) ??
            false)
      );
    }, [
      products,
      search,
    ]);

  const saleItems =
    useMemo(
      () =>
        pos.cart.items.map(
          (item) => ({
            id: item.productId,
            productCode:
              item.code,
            productName:
              item.name,
            quantity:
              item.quantity,
            price: item.price,
            discount:
              item.discount,
            subtotal:
              item.quantity *
                item.price -
              item.discount,
          })
        ),
      [pos.cart.items]
    );

  function handleNewSale() {
    pos.reset();
    setSearch("");
    setStatus(
      SaleStatus.DRAFT
    );
  }

  function handleSelectProduct(
    product: ProductGridItem
  ) {
    if (
      status !== SaleStatus.DRAFT
    ) {
      return;
    }

    pos.cart.addItem({
      productId: product.id,
      code: product.code,
      name: product.name,
      quantity: 1,
      price: product.price,
      discount: 0,
    });
  }

  function handleCheckout() {
    if (!pos.canCheckout) {
      return;
    }

    setStatus(
      SaleStatus.CHECKOUT
    );
  }

  function handlePayment() {
    pos.setPaidAmount(
      pos.cart.grandTotal
    );
    setStatus(
      SaleStatus.PAID
    );
  }

  function handleComplete() {
    setStatus(
      SaleStatus.COMPLETED
    );
  }

  function handleCancel() {
    setStatus(
      SaleStatus.CANCELLED
    );
  }

  return (
    <PosLayout
      header={
        <PosHeader
          saleNumber="-"
          cashier="Cashier"
          status={
            status
          }
          onNewSale={
            handleNewSale
          }
        />
      }
      content={
        <div className="space-y-6">
          <div className="md:hidden">
            <ProductPickerDialog
              products={products}
              disabled={
                status !==
                SaleStatus.DRAFT
              }
              onSelect={
                handleSelectProduct
              }
            />
          </div>

          <div className="hidden space-y-6 md:block">
            <ProductSearch
              value={search}
              onValueChange={
                setSearch
              }
            />

            <ProductGrid
              products={
                filteredProducts
              }
              onSelect={
                handleSelectProduct
              }
            />
          </div>

          <SaleItems
            items={saleItems}
            onIncrease={(item) =>
              pos.cart.updateQuantity(
                item.id,
                item.quantity + 1
              )
            }
            onDecrease={(item) =>
              pos.cart.updateQuantity(
                item.id,
                Math.max(
                  1,
                  item.quantity - 1
                )
              )
            }
            onRemove={(item) =>
              pos.cart.removeItem(
                item.id
              )
            }
          />
        </div>
      }
      sidebar={
        <>
          <CustomerSelector
            customers={
              customers
            }
            value={
              pos.customerId
            }
            onValueChange={
              pos.setCustomerId
            }
          />

          <PaymentSummary
            subtotal={
              pos.cart.subtotal
            }
            discount={
              pos.cart.totalDiscount
            }
            tax={0}
            grandTotal={
              pos.cart.grandTotal
            }
          />

          <PaymentPanel
            subtotal={
              pos.cart.subtotal
            }
            discount={
              pos.cart.totalDiscount
            }
            tax={0}
            grandTotal={
              pos.cart.grandTotal
            }
            status={
              status
            }
            onCheckout={
              handleCheckout
            }
            onPayment={
              handlePayment
            }
            onComplete={
              handleComplete
            }
            onCancel={
              handleCancel
            }
          />
        </>
      }
    />
  );
}
