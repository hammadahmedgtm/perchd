"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Container } from "@/components/layout/Container";
import { CATEGORY_ICON, ListIcon, MapPinIcon } from "@/components/ui/icons";
import { LISTINGS } from "@/lib/mock-data";
import { priceFrom, spotsLeft } from "@/lib/types";

const ListingsMap = dynamic(
  () => import("@/components/map/ListingsMap").then((m) => m.ListingsMap),
  { ssr: false, loading: () => <div className="h-full w-full animate-pulse rounded-2xl bg-paper-alt" /> }
);

export function MapExplorer() {
  const listings = LISTINGS;
  const totalSpotsLeft = listings.reduce((sum, l) => sum + spotsLeft(l), 0);

  return (
    <div>
      <Container className="flex items-center justify-between py-5">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-ink px-4 py-2 text-[13.5px] font-semibold text-white">
            All items
          </span>
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-full border border-line p-[3px]">
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold text-ink-soft hover:text-ink"
            >
              <ListIcon className="h-[13px] w-[13px]" />
              List
            </Link>
            <span className="flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-[12.5px] font-semibold text-white">
              <MapPinIcon className="h-[13px] w-[13px]" />
              Map
            </span>
          </div>
          <span className="rounded-full border border-line px-3 py-1.5 text-[12.5px] font-semibold text-ink-soft">
            {listings.length} items
          </span>
        </div>
      </Container>

      <Container className="grid grid-cols-1 gap-6 pb-14 xl:grid-cols-[440px_minmax(0,1fr)]">
        <div className="h-[680px] overflow-hidden rounded-2xl border border-line">
          <div className="border-b border-line px-4.5 py-4 text-[13px] font-bold text-ink-soft">
            {totalSpotsLeft} spots open across {listings.length} items
          </div>
          <div className="h-[calc(100%-49px)] overflow-y-auto px-4.5">
            {listings.map((l) => {
              const Icon = CATEGORY_ICON[l.category];
              return (
                <Link
                  key={l.id}
                  href={`/listing/${l.id}`}
                  className="flex items-center gap-3 border-b border-line py-3.5 last:border-none hover:bg-paper-alt -mx-4.5 px-4.5"
                >
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-[10px] bg-paper-alt">
                    <Icon className="h-5 w-5 text-ink-soft" strokeWidth={1.6} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[13.5px] font-bold">{l.title}</div>
                    <div className="mt-0.5 text-[12px] text-ink-soft">
                      {l.seller.name} &middot; {l.city}, {l.state}
                    </div>
                  </div>
                  <div className="text-[14px] font-bold text-green">from ${priceFrom(l)}</div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="h-[680px] overflow-hidden rounded-2xl border border-line bg-paper-alt">
          <ListingsMap listings={listings} />
        </div>
      </Container>
    </div>
  );
}
