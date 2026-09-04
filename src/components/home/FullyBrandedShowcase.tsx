import Link from "next/link";
import { CATEGORY_ICON } from "@/components/ui/icons";
import { totalValue, type Listing } from "@/lib/types";

export function FullyBrandedShowcase({ listings }: { listings: Listing[] }) {
  const totalBought = listings.reduce((sum, l) => sum + totalValue(l), 0);

  return (
    <div>
      <p className="text-[13.5px] text-ink-soft">
        Everyone stares at what you carry. Yours may as well get paid.
      </p>
      <h2 className="mt-1 text-[24px] font-bold">Items fully branded.</h2>
      <p className="mt-2 text-[14px] text-ink-soft">
        ${totalBought.toLocaleString()} of ad space bought by brands, across {listings.length}{" "}
        {listings.length === 1 ? "item" : "items"}.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {listings.map((l) => {
          const Icon = CATEGORY_ICON[l.category];
          const brands = [...new Set(l.spots.map((s) => s.takenBy).filter(Boolean))] as string[];
          return (
            <Link
              key={l.id}
              href={`/listing/${l.id}`}
              className="rounded-2xl border border-line p-5 transition-colors hover:border-ink"
            >
              <div className="flex flex-wrap gap-2">
                {brands.map((b) => (
                  <span key={b} className="rounded-full bg-paper-alt px-2.5 py-1 text-[11.5px] font-semibold text-ink-soft">
                    {b}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2.5">
                <Icon className="h-5 w-5 text-ink-soft" strokeWidth={1.6} />
                <span className="text-[13.5px] font-bold">{l.seller.handle}</span>
              </div>
              <div className="mt-1 text-[20px] font-bold text-green">${totalValue(l)}</div>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/sell"
          className="inline-block rounded-full bg-ink px-6 py-3 text-[14px] font-semibold text-white hover:opacity-90"
        >
          Put your item up
        </Link>
      </div>
    </div>
  );
}
