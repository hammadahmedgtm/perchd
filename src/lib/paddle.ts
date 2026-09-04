"use client";

import { initializePaddle, type Paddle } from "@paddle/paddle-js";

let paddleInstance: Paddle | undefined;

async function getPaddle(): Promise<Paddle | undefined> {
  const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
  if (!token) return undefined;
  if (paddleInstance) return paddleInstance;

  paddleInstance = await initializePaddle({
    token,
    environment: (process.env.NEXT_PUBLIC_PADDLE_ENV as "sandbox" | "production") ?? "sandbox",
  });
  return paddleInstance;
}

type CheckoutRequest = {
  kind: "spot" | "ad_slot";
  referenceId: string;
  priceUsd: number;
  bookingId?: string;
};

/**
 * Asks the server to create a Paddle transaction for this spot/ad slot at
 * its seller-set (or platform-set) price, then opens Paddle's hosted
 * checkout for it. Returns false when Paddle isn't configured so the caller
 * can show a fallback message instead of a silent no-op.
 */
export async function openCheckout(request: CheckoutRequest): Promise<boolean> {
  const paddle = await getPaddle();
  if (!paddle) return false;

  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!res.ok) return false;

  const { transactionId } = await res.json();
  if (!transactionId) return false;

  paddle.Checkout.open({ transactionId });
  return true;
}
