"use client";

import { useState, useTransition } from "react";

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

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import { cancelSaleAction } from "../actions";

type CancelSaleDialogProps = {
  saleId: string;

  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;
};

export function CancelSaleDialog({
  saleId,
  open,
  onOpenChange,
}: CancelSaleDialogProps) {
  const [reason, setReason] =
    useState("");

  const [
    isPending,
    startTransition,
  ] = useTransition();

  function handleCancel() {
    startTransition(
      async () => {
        const result =
          await cancelSaleAction({
            id: saleId,
            reason,
          });

        if (!result.success) {
          toast.error(
            result.message
          );

          return;
        }

        toast.success(
          "Sale cancelled."
        );

        setReason("");

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
            Cancel Sale
          </AlertDialogTitle>

          <AlertDialogDescription>
            This transaction
            will be marked as
            cancelled and
            cannot be
            completed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-2">
          <Label htmlFor="reason">
            Reason
          </Label>

          <Textarea
            id="reason"
            placeholder="Enter cancellation reason..."
            value={reason}
            onChange={(e) =>
              setReason(
                e.target.value
              )
            }
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Close
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={
              isPending ||
              reason.trim()
                .length < 3
            }
            onClick={(
              event
            ) => {
              event.preventDefault();

              handleCancel();
            }}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Cancelling...
              </>
            ) : (
              "Cancel Sale"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}