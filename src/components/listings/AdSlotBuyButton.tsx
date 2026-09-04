"use client";

import { useState } from "react";
import { openCheckout } from "@/lib/paddle";

export function AdSlotBuyButton({ slotId, price }: { slotId: string; price: number }) {
  const [status, setStatus] = useState<"idle" | "opening" | "unavailable">("idle");

  async function handleClick() {
    setStatus("opening");
    const opened = await openCheckout({ kind: "ad_slot", referenceId: slotId, priceUsd: price });
    setStatus(opened ? "idle" : "unavailable");
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={status === "opening"}
        className="w-full rounded-full bg-ink py-2.5 text-[13.5px] font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === "opening" ? "Opening checkout…" : "Reserve this slot"}
      </button>
      {status === "unavailable" && (
        <p className="mt-2 text-[11.5px] text-ink-soft">Checkout isn&apos;t connected in this preview.</p>
      )}
    </div>
  );
}
