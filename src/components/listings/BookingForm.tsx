"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { openCheckout } from "@/lib/paddle";
import { ShieldCheckIcon } from "@/components/ui/icons";

export function BookingForm({
  listingId,
  spotId,
  price,
}: {
  listingId: string;
  spotId: string;
  price: number;
}) {
  const [brandName, setBrandName] = useState("");
  const [email, setEmail] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "unavailable">("idle");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = brandName.trim() !== "" && email.trim() !== "" && logoUrl.trim() !== "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setStatus("submitting");

    let bookingId: string | undefined;
    const supabaseConfigured =
      !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseConfigured) {
      const supabase = createClient();
      const { data, error: dbError } = await supabase
        .from("spot_bookings")
        .insert({
          listing_id: listingId,
          spot_id: spotId,
          brand_name: brandName,
          brand_email: email,
          logo_url: logoUrl,
          website_url: website || null,
          price_cents: Math.round(price * 100),
        })
        .select("id")
        .single();

      if (dbError) {
        setStatus("idle");
        setError(`Couldn't save your design: ${dbError.message}`);
        return;
      }
      bookingId = data?.id;
    }

    const opened = await openCheckout({ kind: "spot", referenceId: spotId, priceUsd: price, bookingId });
    setStatus(opened ? "idle" : "unavailable");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label className="text-[12.5px] font-bold text-ink-soft">Brand / company name</label>
        <input
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          placeholder="Northwind"
          required
          className="mt-2 w-full rounded-[10px] border border-line px-3.5 py-2.5 text-[13.5px] outline-none focus:border-ink"
        />
      </div>
      <div>
        <label className="text-[12.5px] font-bold text-ink-soft">Contact email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
          className="mt-2 w-full rounded-[10px] border border-line px-3.5 py-2.5 text-[13.5px] outline-none focus:border-ink"
        />
      </div>
      <div>
        <label className="text-[12.5px] font-bold text-ink-soft">Logo URL</label>
        <input
          type="url"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          placeholder="https://yourcompany.com/logo.svg"
          required
          className="mt-2 w-full rounded-[10px] border border-line px-3.5 py-2.5 text-[13.5px] outline-none focus:border-ink"
        />
        <p className="mt-1.5 text-[12px] text-ink-soft">
          A link to your logo file. The seller reviews this before it&apos;s printed.
        </p>
      </div>
      <div>
        <label className="text-[12.5px] font-bold text-ink-soft">Website (optional)</label>
        <input
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="https://yourcompany.com"
          className="mt-2 w-full rounded-[10px] border border-line px-3.5 py-2.5 text-[13.5px] outline-none focus:border-ink"
        />
      </div>

      <div className="flex items-start gap-2.5 rounded-2xl border border-line bg-paper-alt p-3.5">
        <ShieldCheckIcon className="mt-0.5 h-4 w-4 flex-none text-ink" />
        <p className="text-[12px] leading-relaxed text-ink-soft">
          You&apos;re charged now. The seller can still decline this design &mdash; if they do,
          you&apos;re refunded in full and nothing is printed.
        </p>
      </div>

      {error && <p className="text-[12.5px] text-[#b3261e]">{error}</p>}

      <button
        type="submit"
        disabled={!canSubmit || status === "submitting"}
        className="rounded-full bg-ink py-3.5 text-[15px] font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {status === "submitting" ? "Saving…" : `Continue to payment — $${price}`}
      </button>
      {status === "unavailable" && (
        <p className="text-center text-[12px] text-ink-soft">
          Your design was saved, but checkout isn&apos;t connected in this preview &mdash; set{" "}
          <code className="rounded bg-paper-alt px-1 py-0.5">NEXT_PUBLIC_PADDLE_CLIENT_TOKEN</code>{" "}
          to enable Paddle.
        </p>
      )}
    </form>
  );
}
