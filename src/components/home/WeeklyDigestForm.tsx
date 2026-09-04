"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function WeeklyDigestForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const configured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!configured) {
      setStatus("error");
      setError("Signups aren't connected in this preview — set the Supabase env vars to enable it.");
      return;
    }

    setStatus("loading");
    const supabase = createClient();
    const { error: dbError } = await supabase.from("newsletter_subscribers").insert({ email });

    if (dbError) {
      setStatus("error");
      setError(dbError.message.includes("duplicate") ? "That email is already signed up." : dbError.message);
      return;
    }
    setStatus("done");
  }

  if (status === "done") {
    return (
      <p className="text-[13.5px] font-semibold text-green">You&apos;re in &mdash; first one lands this week.</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 sm:flex-row sm:items-start">
      <div className="flex-1">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-full border border-line px-4 py-2.5 text-[13.5px] outline-none focus:border-ink"
        />
        {status === "error" && error && <p className="mt-1.5 text-[12px] text-[#b3261e]">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex-none rounded-full bg-ink px-5 py-2.5 text-[13.5px] font-semibold text-white hover:opacity-90 disabled:opacity-50"
      >
        {status === "loading" ? "Sending…" : "Send me the weekly"}
      </button>
    </form>
  );
}
