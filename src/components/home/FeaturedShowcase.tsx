import { ListingCard } from "@/components/listings/ListingCard";
import type { Listing } from "@/lib/types";

export function FeaturedShowcase({ listings }: { listings: Listing[] }) {
  return (
    <div className="rounded-[24px] bg-ink p-6 sm:p-7">
      <h2 className="mb-5 text-[17px] font-bold text-white">Featured now</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {listings.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </div>
  );
}
