"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { CATEGORY_ICON, ListIcon, MapPinIcon, SearchIcon } from "@/components/ui/icons";
import { ListingCard } from "@/components/listings/ListingCard";
import {
  CATEGORY_LABEL,
  CONTEXT_LABEL,
  priceFrom,
  soldValue,
  type Category,
  type Listing,
  type SeenContext,
} from "@/lib/types";

const CATEGORIES = Object.keys(CATEGORY_LABEL) as Category[];
const CONTEXTS = Object.keys(CONTEXT_LABEL) as SeenContext[];

type Sort = "newest" | "most_funded" | "price_low" | "price_high";

export function BrowseExplorer({ listings }: { listings: Listing[] }) {
  const [category, setCategory] = useState<Category | "all">("all");
  const [contexts, setContexts] = useState<Set<SeenContext>>(new Set());
  const [sort, setSort] = useState<Sort>("newest");

  function toggleContext(c: SeenContext) {
    setContexts((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  }

  function clearFilters() {
    setCategory("all");
    setContexts(new Set());
  }

  const filtered = useMemo(() => {
    let result = listings.filter((l) => {
      if (category !== "all" && l.category !== category) return false;
      if (contexts.size > 0 && ![...contexts].some((c) => l.contexts.includes(c))) return false;
      return true;
    });
    if (sort === "price_low") result = [...result].sort((a, b) => priceFrom(a) - priceFrom(b));
    else if (sort === "price_high") result = [...result].sort((a, b) => priceFrom(b) - priceFrom(a));
    else if (sort === "most_funded") result = [...result].sort((a, b) => soldValue(b) - soldValue(a));
    else result = [...result].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    return result;
  }, [listings, category, contexts, sort]);

  return (
    <div>
      {/* Filter pills */}
      <Container className="flex flex-col gap-2.5 border-t border-line pt-6 pb-6">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setCategory("all")}
            className={pillClass(category === "all")}
          >
            All items
          </button>
          {CATEGORIES.map((c) => {
            const Icon = CATEGORY_ICON[c];
            return (
              <button key={c} onClick={() => setCategory(c)} className={pillClass(category === c)}>
                <Icon className="h-[15px] w-[15px]" />
                {CATEGORY_LABEL[c]}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="mr-0.5 text-[12px] font-bold uppercase tracking-wide text-ink-soft">
            Seen at
          </span>
          {CONTEXTS.map((c) => (
            <button
              key={c}
              onClick={() => toggleContext(c)}
              className={pillClass(contexts.has(c), "px-3.5 py-1.5 text-[12.5px]")}
            >
              {CONTEXT_LABEL[c]}
            </button>
          ))}
        </div>
      </Container>

      <Container className="pb-14">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[13px] font-semibold text-ink-soft">
            Showing {filtered.length} of {listings.length}
          </h2>
          <div className="flex flex-wrap gap-2">
            <div className="flex rounded-full border border-line p-[3px]">
              <span className="flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-[12.5px] font-semibold text-white">
                <ListIcon className="h-[13px] w-[13px]" />
                List
              </span>
              <Link
                href="/browse/map"
                className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold text-ink-soft hover:text-ink"
              >
                <MapPinIcon className="h-[13px] w-[13px]" />
                Map
              </Link>
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-full border border-line bg-paper px-3 py-1.5 text-[12.5px] font-semibold text-ink-soft outline-none"
            >
              <option value="newest">Sort: Newest</option>
              <option value="most_funded">Sort: Most funded</option>
              <option value="price_low">Sort: Price (low to high)</option>
              <option value="price_high">Sort: Price (high to low)</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={<SearchIcon className="h-6 w-6" />}
            title="No spots match those filters"
            description="Try a different category, or clear your filters to see everything that's live."
            action={{ label: "Clear filters", onClick: clearFilters }}
          />
        ) : (
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

function pillClass(active: boolean, extra = "px-4 py-2 text-[13.5px]") {
  return [
    "inline-flex items-center gap-1.5 rounded-full border font-semibold whitespace-nowrap transition-colors",
    extra,
    active
      ? "bg-ink text-white border-ink"
      : "bg-paper text-ink-soft border-line hover:border-ink hover:text-ink",
  ].join(" ");
}
