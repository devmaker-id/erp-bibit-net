"use client";

import { Printer } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  buildReceipt,
  type ReceiptSale,
} from "../utils";

type ReceiptDialogProps = {
  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  sale: ReceiptSale;
};

export function ReceiptDialog({
  open,
  onOpenChange,
  sale,
}: ReceiptDialogProps) {
  const receipt =
    buildReceipt(sale);

  function handlePrint() {
    window.print();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={
        onOpenChange
      }
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Receipt
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div>
            <p>
              <strong>No.</strong>{" "}
              {receipt.number}
            </p>

            <p>
              <strong>Date</strong>{" "}
              {receipt.date.toLocaleString()}
            </p>
          </div>

          <div className="space-y-1">
            {receipt.items.map(
              (item, index) => (
                <div
                  key={index}
                  className="flex justify-between"
                >
                  <div>
                    <p>
                      {item.product}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {item.quantity} ×{" "}
                      {item.price}
                    </p>
                  </div>

                  <span>
                    {item.subtotal}
                  </span>
                </div>
              )
            )}
          </div>

          <hr />

          <div className="space-y-1">
            <div className="flex justify-between">
              <span>
                Subtotal
              </span>

              <span>
                {
                  receipt.subtotal
                }
              </span>
            </div>

            <div className="flex justify-between">
              <span>
                Discount
              </span>

              <span>
                {
                  receipt.discount
                }
              </span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>

              <span>
                {receipt.tax}
              </span>
            </div>

            <div className="flex justify-between font-semibold">
              <span>
                Grand Total
              </span>

              <span>
                {
                  receipt.grandTotal
                }
              </span>
            </div>

            <div className="flex justify-between">
              <span>Paid</span>

              <span>
                {
                  receipt.paidAmount
                }
              </span>
            </div>

            <div className="flex justify-between">
              <span>
                Change
              </span>

              <span>
                {
                  receipt.changeAmount
                }
              </span>
            </div>
          </div>

          {receipt.payments
            .length > 0 && (
            <>
              <hr />

              <div className="space-y-1">
                {receipt.payments.map(
                  (
                    payment,
                    index
                  ) => (
                    <div
                      key={index}
                      className="flex justify-between"
                    >
                      <span>
                        {
                          payment.method
                        }
                      </span>

                      <span>
                        {
                          payment.amount
                        }
                      </span>
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(
                false
              )
            }
          >
            Close
          </Button>

          <Button
            onClick={
              handlePrint
            }
          >
            <Printer className="mr-2 size-4" />
            Print
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}