import Link from "next/link";
import { CATEGORY_ICON } from "@/components/ui/icons";
import {
  CATEGORY_LABEL,
  CONTEXT_LABEL,
  priceFrom,
  soldValue,
  spotsLeft,
  spotsTotal,
  totalValue,
  type Listing,
} from "@/lib/types";

export function ListingCard({ listing }: { listing: Listing }) {
  const Icon = CATEGORY_ICON[listing.category];
  const left = spotsLeft(listing);
  const total = spotsTotal(listing);
  const soldOut = left === 0;
  const sold = soldValue(listing);
  const value = totalValue(listing);
  const pct = value > 0 ? Math.min(100, Math.round((sold / value) * 100)) : 0;

  return (
    <Link
      href={`/listing/${listing.id}`}
      className="block rounded-2xl border border-line bg-paper hover:border-ink transition-colors"
    >
      <div className="flex h-[120px] items-center justify-center rounded-t-2xl border-b border-line bg-paper-alt">
        <Icon className="h-8 w-8 text-ink-soft" strokeWidth={1.4} />
      </div>
      <div className="p-4">
        <div className="text-[11px] font-bold uppercase tracking-wide text-ink-soft">
          {CATEGORY_LABEL[listing.category]}
        </div>
        <div className="mt-1.5 text-[14.5px] font-bold leading-tight text-ink">{listing.title}</div>
        <div className="mt-1.5 text-[12px] text-ink-soft">
          {listing.seller.handle} &middot; {listing.seller.followers.toLocaleString()} followers
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-paper-alt px-2 py-0.5 text-[10.5px] font-semibold text-ink-soft">
            {listing.seller.role}
          </span>
          {listing.contexts.slice(0, 1).map((c) => (
            <span key={c} className="rounded-full bg-paper-alt px-2 py-0.5 text-[10.5px] font-semibold text-ink-soft">
              {CONTEXT_LABEL[c]}
            </span>
          ))}
        </div>

        <div className="mt-3.5 border-t border-line pt-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[15px] font-bold text-green">${sold}</span>
            <span className="text-[11.5px] text-ink-soft">of ${value}</span>
          </div>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-paper-alt">
            <div className="h-full rounded-full bg-green" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[11.5px] text-ink-soft">
            {soldOut ? (
              <span className="font-bold text-amber">Fully claimed</span>
            ) : (
              <span>
                {left}/{total} left
              </span>
            )}
            <span>from ${priceFrom(listing)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
