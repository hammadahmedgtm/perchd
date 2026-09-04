import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Handles Paddle webhook events. Verifies the Paddle-Signature header
 * against PADDLE_WEBHOOK_SECRET before trusting the payload — see
 * https://developer.paddle.com/webhooks/signature-verification.
 */
export async function POST(request: Request) {
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  const signatureHeader = request.headers.get("paddle-signature");
  const rawBody = await request.text();

  if (!secret || !signatureHeader || !verifySignature(rawBody, signatureHeader, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  switch (event.event_type) {
    case "transaction.completed": {
      const customData = event.data?.custom_data as
        | { kind?: string; referenceId?: string; bookingId?: string }
        | undefined;

      // Spot bookings collect the design/contact info up front (see
      // /listing/[id]/buy/[spotId]) — mark that row paid now that Paddle
      // has confirmed the charge. Ad-slot purchases have no booking row
      // yet (bookingId is undefined) — nothing to update for those.
      if (customData?.bookingId) {
        const admin = createAdminClient();
        if (admin) {
          await admin
            .from("spot_bookings")
            .update({ status: "paid", paddle_transaction_id: event.data.id })
            .eq("id", customData.bookingId);
        }
      }
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

function verifySignature(rawBody: string, header: string, secret: string): boolean {
  const parts = Object.fromEntries(header.split(";").map((p) => p.split("=") as [string, string]));
  const ts = parts.ts;
  const h1 = parts.h1;
  if (!ts || !h1) return false;

  const signedPayload = `${ts}:${rawBody}`;
  const expected = crypto.createHmac("sha256", secret).update(signedPayload).digest("hex");
  const expectedBuf = Buffer.from(expected);
  const actualBuf = Buffer.from(h1);

  return expectedBuf.length === actualBuf.length && crypto.timingSafeEqual(expectedBuf, actualBuf);
}
