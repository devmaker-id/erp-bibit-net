"use client";

import { useState, useTransition } from "react";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  PaymentMethod,
  type PaymentMethod as PaymentMethodType,
} from "../types/payment-method";

import { Input } from "@/components/ui/input";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  paymentMethodOptions,
} from "../constants";

import { paySaleAction } from "../actions";

type PaymentDialogProps = {
  saleId: string;

  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;
};

export function PaymentDialog({
  saleId,
  open,
  onOpenChange,
}: PaymentDialogProps) {
  const [
    isPending,
    startTransition,
  ] = useTransition();

  const [method, setMethod] =
    useState<PaymentMethodType>(
      PaymentMethod.CASH
    );

  const [amount, setAmount] =
    useState("");

  const [
    referenceNumber,
    setReferenceNumber,
  ] = useState("");

  function handlePayment() {
    startTransition(
      async () => {
        const result =
          await paySaleAction({
            saleId,

            method,

            amount:
              Number(amount),

            referenceNumber:
              referenceNumber ||
              undefined,
          });

        if (!result.success) {
          toast.error(
            result.message
          );

          return;
        }

        toast.success(
          "Payment recorded."
        );

        onOpenChange(false);

        setAmount("");

        setReferenceNumber("");

        setMethod(
          PaymentMethod.CASH
        );
      }
    );
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={
        onOpenChange
      }
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Payment
          </AlertDialogTitle>

          <AlertDialogDescription>
            Record payment for
            this transaction.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4">
          <Select
            value={method}
            onValueChange={(
              value
            ) =>
              setMethod(
                value as PaymentMethodType
              )
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {paymentMethodOptions.map(
                (
                  payment
                ) => (
                  <SelectItem
                    key={
                      payment.value
                    }
                    value={
                      payment.value
                    }
                  >
                    {
                      payment.label
                    }
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
          />

          {method !==
            PaymentMethod.CASH && (
            <Input
              placeholder="Reference Number"
              value={
                referenceNumber
              }
              onChange={(e) =>
                setReferenceNumber(
                  e.target.value
                )
              }
            />
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Close
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={
              isPending ||
              Number(amount) <= 0
            }
            onClick={(
              e
            ) => {
              e.preventDefault();

              handlePayment();
            }}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Pay"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}