import { NextResponse } from "next/server";
import { LISTINGS, AD_SLOTS } from "@/lib/mock-data";

const PADDLE_API_BASE =
  process.env.NEXT_PUBLIC_PADDLE_ENV === "production"
    ? "https://api.paddle.com"
    : "https://sandbox-api.paddle.com";

function describeSpot(spotId: string): string {
  for (const listing of LISTINGS) {
    const spot = listing.spots.find((s) => s.id === spotId);
    if (spot) return `${listing.title} — ${spot.label}`;
  }
  return "Perchd spot";
}

/**
 * Creates a Paddle transaction for a listing spot or an ad slot at its
 * current price, using a non-catalog (inline) price item since spot prices
 * are set per-seller rather than living in a fixed Paddle catalog. Returns
 * the transaction id for the client to open in Paddle's hosted checkout.
 */
export async function POST(request: Request) {
  const apiKey = process.env.PADDLE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Paddle is not configured on this server (missing PADDLE_API_KEY)." },
      { status: 501 }
    );
  }

  const body = await request.json();
  const { kind, referenceId, priceUsd, bookingId } = body as {
    kind: "spot" | "ad_slot";
    referenceId: string;
    priceUsd: number;
    bookingId?: string;
  };

  const name =
    kind === "spot"
      ? describeSpot(referenceId)
      : AD_SLOTS.find((s) => s.id === referenceId)?.title ?? "Perchd ad slot";

  const paddleRes = await fetch(`${PADDLE_API_BASE}/transactions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          price: {
            description: name,
            unit_price: { amount: String(Math.round(priceUsd * 100)), currency_code: "USD" },
            product_id: process.env.PADDLE_PRODUCT_ID,
          },
          quantity: 1,
        },
      ],
      custom_data: { kind, referenceId, bookingId },
    }),
  });

  if (!paddleRes.ok) {
    const detail = await paddleRes.text();
    return NextResponse.json({ error: "Paddle rejected the transaction.", detail }, { status: 502 });
  }

  const data = await paddleRes.json();
  return NextResponse.json({ transactionId: data.data.id });
}
