"use client";

import { useTransition } from "react";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

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

import { checkoutSaleAction } from "../actions";

type CheckoutDialogProps = {
  saleId: string;

  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;
};

export function CheckoutDialog({
  saleId,
  open,
  onOpenChange,
}: CheckoutDialogProps) {
  const [
    isPending,
    startTransition,
  ] = useTransition();

  function handleCheckout() {
    startTransition(
      async () => {
        const result =
          await checkoutSaleAction({
            id: saleId,
          });

        if (!result.success) {
          toast.error(
            result.message
          );

          return;
        }

        toast.success(
          "Sale checked out."
        );

        onOpenChange(false);
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
            Checkout Sale
          </AlertDialogTitle>

          <AlertDialogDescription>
            This will lock the
            transaction and
            continue to the
            payment process.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Back
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={
              isPending
            }
            onClick={(
              event
            ) => {
              event.preventDefault();

              handleCheckout();
            }}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Checkout"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}