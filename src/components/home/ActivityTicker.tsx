import Link from "next/link";
import { LISTINGS, JUST_SOLD, getListing } from "@/lib/mock-data";
import { spotsLeft } from "@/lib/types";

export function ActivityTicker() {
  const soldItems = JUST_SOLD.map((sale) => {
    const listing = getListing(sale.listingId);
    if (!listing) return null;
    return {
      key: `sold-${sale.listingId}-${sale.hoursAgo}`,
      listingId: sale.listingId,
      title: sale.brand,
      status: `$${sale.price}` as const,
      sub: `on ${listing.seller.name.split(" ")[0]}'s ${listing.title.toLowerCase()}`,
      hoursAgo: sale.hoursAgo,
      soldOut: false,
    };
  });

  const claimedItems = LISTINGS.filter((l) => spotsLeft(l) === 0).map((l) => ({
    key: `claimed-${l.id}`,
    listingId: l.id,
    title: l.seller.name.split(" ")[0],
    status: "CLAIMED" as const,
    sub: `fully branded ${l.itemModel}`,
    hoursAgo: 24,
    soldOut: true,
  }));

  const items = [...soldItems, ...claimedItems]
    .filter((i): i is NonNullable<typeof i> => i !== null)
    .sort((a, b) => a.hoursAgo - b.hoursAgo)
    .slice(0, 5);

  return (
    <div>
      <div className="mb-2.5 flex items-center gap-2">
        <span className="inline-block h-[7px] w-[7px] rounded-full bg-green [animation:pulse-dot_1.8s_ease-in-out_infinite]" />
        <span className="text-[13px] font-bold text-ink">Latest activity</span>
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
        {items.map((item) => (
          <Link
            key={item.key}
            href={`/listing/${item.listingId}`}
            className="flex flex-col justify-center rounded-xl border border-line bg-paper px-3 py-2.5 transition-colors hover:border-ink/40"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-[12.5px] font-bold text-ink">{item.title}</span>
              <span className={`flex-none text-[11.5px] font-bold ${item.soldOut ? "text-amber" : "text-green"}`}>
                {item.status}
              </span>
            </div>
            <div className="mt-0.5 truncate text-[11px] text-ink-soft">{item.sub}</div>
            <div className="text-[10.5px] text-ink-soft">{item.hoursAgo}h ago</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
