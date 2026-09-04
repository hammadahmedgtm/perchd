"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { CATEGORY_ICON, MapPinIcon, ShieldCheckIcon, UploadIcon } from "@/components/ui/icons";
import {
  CATEGORY_LABEL,
  CONTEXT_LABEL,
  SPOT_SIZE_LABEL,
  type Category,
  type SeenContext,
  type SpotSize,
} from "@/lib/types";

const CATEGORIES = Object.keys(CATEGORY_LABEL) as Category[];
const CONTEXTS = Object.keys(CONTEXT_LABEL) as SeenContext[];
const SIZES = Object.keys(SPOT_SIZE_LABEL) as SpotSize[];
const PLACEMENTS = ["Top panel / lid", "Bottom / base", "Side edge"];
const SUGGESTED_PRICE: Record<SpotSize, string> = { small: "16", medium: "28", large: "50" };

type DraftSpot = { key: string; label: string; size: SpotSize; price: string };

export function SellFlow() {
  const uid = useId();
  const [category, setCategory] = useState<Category>("laptop");
  const [placement, setPlacement] = useState(PLACEMENTS[0]);
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [state, setStateField] = useState("");
  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState<string | null>(null);
  const [contexts, setContexts] = useState<Set<SeenContext>>(new Set());
  const [spots, setSpots] = useState<DraftSpot[]>([
    { key: `${uid}-0`, label: "", size: "medium", price: SUGGESTED_PRICE.medium },
  ]);
  const [durationMonths, setDurationMonths] = useState("6");
  const [submitted, setSubmitted] = useState(false);

  const Icon = CATEGORY_ICON[category];

  function toggleContext(c: SeenContext) {
    setContexts((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  }

  function addSpot() {
    setSpots((prev) => [
      ...prev,
      { key: `${uid}-${prev.length}-${Date.now()}`, label: "", size: "medium", price: SUGGESTED_PRICE.medium },
    ]);
  }

  function removeSpot(key: string) {
    setSpots((prev) => (prev.length > 1 ? prev.filter((s) => s.key !== key) : prev));
  }

  function updateSpot(key: string, patch: Partial<DraftSpot>) {
    setSpots((prev) => prev.map((s) => (s.key === key ? { ...s, ...patch } : s)));
  }

  function useMyLocation() {
    if (!("geolocation" in navigator)) {
      setLocateError("This browser can't share your location — enter it manually below.");
      return;
    }
    setLocating(true);
    setLocateError(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`,
            { headers: { Accept: "application/json" } }
          );
          const data = await res.json();
          const addr = data.address ?? {};
          setCity(addr.city ?? addr.town ?? addr.village ?? addr.county ?? "");
          setStateField(addr.state ?? "");
        } catch {
          setLocateError("Couldn't look up your city — enter it manually below.");
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocateError("Location access was denied — enter your city manually below.");
        setLocating(false);
      }
    );
  }

  const validSpots = spots.filter((s) => s.label.trim() !== "" && Number(s.price) > 0);
  const canSubmit = title.trim() !== "" && city.trim() !== "" && contexts.size > 0 && validSpots.length > 0;
  const priceRange =
    validSpots.length > 0
      ? [Math.min(...validSpots.map((s) => Number(s.price))), Math.max(...validSpots.map((s) => Number(s.price)))]
      : null;

  if (submitted) {
    return (
      <Container className="max-w-[520px] py-24 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-paper-alt">
          <ShieldCheckIcon className="h-7 w-7 text-ink" />
        </div>
        <h1 className="mt-6 text-[24px] font-bold">Sent for review</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
          Your listing for {CATEGORY_LABEL[category].toLowerCase()} &mdash; {validSpots.length}{" "}
          {validSpots.length === 1 ? "spot" : "spots"} &mdash; is in the admin queue. We&apos;ll email
          you once it&apos;s approved and live for brands to buy.
        </p>
        <Link
          href="/dashboard/seller"
          className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-[14px] font-semibold text-white hover:opacity-90"
        >
          Go to your dashboard
        </Link>
      </Container>
    );
  }

  return (
    <div>
      <div className="border-b border-line">
        <Container className="flex items-center justify-between py-4">
          <div>
            <div className="text-[13.5px] font-semibold text-ink">List your item</div>
            <div className="text-[12px] text-ink-soft">
              One form, then it goes to a quick admin review.
            </div>
          </div>
          <Link href="/" className="text-[13.5px] font-semibold text-ink-soft hover:text-ink">
            Save &amp; exit
          </Link>
        </Container>
      </div>

      <Container className="grid grid-cols-1 gap-12 py-9 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (canSubmit) setSubmitted(true);
          }}
          className="flex flex-col gap-8"
        >
          {/* Category */}
          <Section n={1} title="What's carrying the spots?">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {CATEGORIES.map((c) => {
                const CIcon = CATEGORY_ICON[c];
                const selected = c === category;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={`relative flex flex-col items-center gap-2.5 rounded-[14px] border p-5 ${
                      selected ? "border-ink bg-paper-alt" : "border-line hover:border-ink/40"
                    }`}
                  >
                    <CIcon className={`h-[30px] w-[30px] ${selected ? "text-ink" : "text-ink-soft"}`} />
                    <span className={`text-[13.5px] font-bold ${selected ? "text-ink" : "text-ink-soft"}`}>
                      {CATEGORY_LABEL[c]}
                    </span>
                    {selected && <SelectedMark />}
                  </button>
                );
              })}
            </div>

            <div className="mt-5">
              <label className="text-[12.5px] font-bold text-ink-soft">Where on it?</label>
              <div className="mt-2 flex flex-wrap gap-2.5">
                {PLACEMENTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlacement(p)}
                    className={`flex-1 rounded-[10px] border px-3.5 py-2.5 text-left text-[13.5px] font-semibold ${
                      placement === p ? "border-ink bg-paper-alt text-ink" : "border-line text-ink-soft"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <label className="text-[12.5px] font-bold text-ink-soft">Listing title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Ten spots on my MacBook lid"
                className="mt-2 w-full rounded-[10px] border border-line px-3.5 py-2.5 text-[13.5px] outline-none focus:border-ink"
              />
            </div>
          </Section>

          {/* Location */}
          <Section n={2} title="Where is it?">
            <p className="-mt-3 mb-4 text-[13px] text-ink-soft">
              Brands filter by city, so this needs to be accurate.
            </p>
            <button
              type="button"
              onClick={useMyLocation}
              disabled={locating}
              className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-[13px] font-semibold text-ink hover:border-ink disabled:opacity-50"
            >
              <MapPinIcon className="h-[15px] w-[15px]" />
              {locating ? "Finding you…" : "Use my current location"}
            </button>
            {locateError && <p className="mb-4 text-[12.5px] text-[#b3261e]">{locateError}</p>}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[12.5px] font-bold text-ink-soft">City</label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Austin"
                  className="mt-2 w-full rounded-[10px] border border-line px-3.5 py-2.5 text-[13.5px] outline-none focus:border-ink"
                />
              </div>
              <div>
                <label className="text-[12.5px] font-bold text-ink-soft">State</label>
                <input
                  value={state}
                  onChange={(e) => setStateField(e.target.value)}
                  placeholder="TX"
                  className="mt-2 w-full rounded-[10px] border border-line px-3.5 py-2.5 text-[13.5px] outline-none focus:border-ink"
                />
              </div>
            </div>
          </Section>

          {/* Seen at */}
          <Section n={3} title="Where will brands see it?">
            <p className="-mt-3 mb-4 text-[13px] text-ink-soft">
              This is what brands are actually buying &mdash; pick everywhere it&apos;s realistically
              true.
            </p>
            <div className="flex flex-wrap gap-2">
              {CONTEXTS.map((c) => {
                const selected = contexts.has(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleContext(c)}
                    className={`rounded-full border px-4 py-2 text-[13.5px] font-semibold ${
                      selected ? "border-ink bg-ink text-white" : "border-line text-ink-soft hover:border-ink/40"
                    }`}
                  >
                    {CONTEXT_LABEL[c]}
                  </button>
                );
              })}
            </div>
          </Section>

          {/* Photos */}
          <Section n={4} title="Add photos">
            <p className="-mt-3 mb-4 text-[13px] text-ink-soft">
              A clear photo of the bare item, plus any angle that shows scale.
            </p>
            <label className="flex h-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line text-ink-soft hover:border-ink">
              <UploadIcon className="h-6 w-6" />
              <span className="text-[13px] font-semibold">Click to upload, or drag a photo here</span>
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </Section>

          {/* Spots */}
          <Section n={5} title="Set up your spots">
            <p className="-mt-3 mb-4 text-[13px] text-ink-soft">
              List one or several sticker spots on this item. Each has its own name, size, and flat
              price &mdash; the first brand to pay it takes it. Perchd keeps 10% when a spot sells.
            </p>
            <div className="flex flex-col gap-3">
              {spots.map((spot, i) => (
                <div key={spot.key} className="rounded-2xl border border-line p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold uppercase tracking-wide text-ink-soft">
                      Spot {i + 1}
                    </span>
                    {spots.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSpot(spot.key)}
                        className="text-[12px] font-semibold text-ink-soft hover:text-[#b3261e]"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
                    <input
                      value={spot.label}
                      onChange={(e) => updateSpot(spot.key, { label: e.target.value })}
                      placeholder="e.g. Top left banner"
                      className="rounded-[10px] border border-line px-3.5 py-2.5 text-[13.5px] outline-none focus:border-ink"
                    />
                    <select
                      value={spot.size}
                      onChange={(e) => {
                        const size = e.target.value as SpotSize;
                        updateSpot(spot.key, {
                          size,
                          price: spot.price === SUGGESTED_PRICE[spot.size] ? SUGGESTED_PRICE[size] : spot.price,
                        });
                      }}
                      className="rounded-[10px] border border-line px-3.5 py-2.5 text-[13.5px] outline-none focus:border-ink"
                    >
                      {SIZES.map((s) => (
                        <option key={s} value={s}>
                          {SPOT_SIZE_LABEL[s]}
                        </option>
                      ))}
                    </select>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[13.5px] text-ink-soft">
                        $
                      </span>
                      <input
                        type="number"
                        min={1}
                        value={spot.price}
                        onChange={(e) => updateSpot(spot.key, { price: e.target.value })}
                        className="w-full rounded-[10px] border border-line py-2.5 pl-6 pr-3 text-[13.5px] outline-none focus:border-ink"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addSpot}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-[13px] font-semibold text-ink hover:border-ink"
            >
              + Add another spot
            </button>

            <div className="mt-5">
              <label className="text-[12.5px] font-bold text-ink-soft">Stays up for</label>
              <select
                value={durationMonths}
                onChange={(e) => setDurationMonths(e.target.value)}
                className="mt-2 w-full rounded-[10px] border border-line px-3.5 py-2.5 text-[13.5px] outline-none focus:border-ink sm:w-48"
              >
                {[3, 6, 9, 12].map((m) => (
                  <option key={m} value={m}>
                    {m} months
                  </option>
                ))}
              </select>
            </div>
          </Section>

          {/* Payout */}
          <Section n={6} title="Connect payouts">
            <p className="-mt-3 mb-4 text-[13px] text-ink-soft">
              Required before your first payout &mdash; this is where the money goes when a spot
              sells.
            </p>
            <div className="flex items-center gap-3 rounded-2xl border border-line p-4">
              <div className="flex h-9 w-11 items-center justify-center rounded-[6px] border border-line bg-paper-alt text-[9px] font-extrabold">
                Paddle
              </div>
              <div>
                <div className="text-[13.5px] font-bold">Connect Paddle</div>
                <div className="text-[12px] text-ink-soft">Not connected yet</div>
              </div>
              <span className="ml-auto rounded-full bg-paper-alt px-3 py-1 text-[11.5px] font-bold text-ink-soft">
                Optional for now
              </span>
            </div>
          </Section>

          <div>
            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[14.5px] font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Submit for review
            </button>
            {!canSubmit && (
              <p className="mt-2 text-[12px] text-ink-soft">
                Needs a title, city, at least one &ldquo;where brands will see it&rdquo; tag, and one
                named, priced spot.
              </p>
            )}
          </div>
        </form>

        {/* Live preview */}
        <div>
          <div className="sticky top-5">
            <div className="mb-3 text-[12px] font-bold uppercase tracking-wide text-ink-soft">
              Your listing so far
            </div>
            <div className="rounded-2xl border border-line">
              <div className="relative flex h-40 items-center justify-center rounded-t-2xl border-b border-line bg-paper-alt">
                <Icon className="h-[46px] w-[46px] text-ink-soft" strokeWidth={1.3} />
              </div>
              <div className="p-4.5">
                <div className="text-[15px] font-bold">
                  {title || CATEGORY_LABEL[category]} &middot; {placement}
                </div>
                <div className="mt-1.5 text-[12.5px] text-ink-soft">
                  {city ? `${city}${state ? `, ${state}` : ""}` : "City not set yet"}
                </div>
                <div className="mt-1.5 text-[12.5px] text-ink-soft">
                  {validSpots.length > 0 ? (
                    <>
                      {validSpots.length} {validSpots.length === 1 ? "spot" : "spots"} &middot; $
                      {priceRange![0]}
                      {priceRange![0] !== priceRange![1] ? `–$${priceRange![1]}` : ""} &middot;{" "}
                      {durationMonths} months
                    </>
                  ) : (
                    "No priced spots yet"
                  )}
                </div>
                {contexts.size > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {[...contexts].map((c) => (
                      <span
                        key={c}
                        className="rounded-full bg-paper-alt px-2.5 py-1 text-[11px] font-semibold text-ink-soft"
                      >
                        {CONTEXT_LABEL[c]}
                      </span>
                    ))}
                  </div>
                )}
                <div className="my-3.5 h-px bg-line" />
                <div className="flex items-center gap-2 text-[12.5px] font-bold">
                  <ShieldCheckIcon className="h-3.5 w-3.5" />
                  You approve every design before it goes live
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-line bg-paper-alt p-4 text-[12.5px] leading-relaxed text-ink-soft">
              Once approved, your spots are visible to brands immediately. When one sells, you&apos;ll
              get the design to approve &mdash; decline any time before it&apos;s applied.
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line p-7">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-paper-alt text-[11.5px] font-bold text-ink-soft">
          {n}
        </span>
        <h2 className="text-[16px] font-bold">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function SelectedMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="absolute right-2.5 top-2.5 h-[15px] w-[15px] text-ink"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9" />
    </svg>
  );
}
