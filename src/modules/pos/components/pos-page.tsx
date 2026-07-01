"use client";

import {
  SaleStatus,
} from "../types";

import {
  CustomerSelector,
  PaymentPanel,
  PaymentSummary,
  PosHeader,
  PosLayout,
} from "./";

type Option = {
  id: string;
  name: string;
};

type PosPageProps = {
  customers: Option[];
};

export function PosPage({
  customers,
}: PosPageProps) {
  return (
    <PosLayout
      header={
        <PosHeader
          saleNumber="-"
          cashier="Cashier"
          status={
            SaleStatus.DRAFT
          }
          onNewSale={() => {}}
        />
      }
      content={
        <div className="rounded-lg border bg-card p-6">
          POS Content
        </div>
      }
      sidebar={
        <>
          <CustomerSelector
            customers={
              customers
            }
            value={null}
            onValueChange={() => {}}
          />

          <PaymentSummary
            subtotal={0}
            discount={0}
            tax={0}
            grandTotal={0}
          />

          <PaymentPanel
            subtotal={0}
            discount={0}
            tax={0}
            grandTotal={0}
            status={
              SaleStatus.DRAFT
            }
            onCheckout={() => {}}
            onPayment={() => {}}
            onComplete={() => {}}
            onCancel={() => {}}
          />
        </>
      }
    />
  );
}