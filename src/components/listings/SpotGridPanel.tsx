"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORY_ICON } from "@/components/ui/icons";
import type { Category, Spot } from "@/lib/types";

export function SpotGridPanel({
  listingId,
  category,
  spots,
}: {
  listingId: string;
  category: Category;
  spots: Spot[];
}) {
  const router = useRouter();
  const [view, setView] = useState<"for_sale" | "final_look">("for_sale");
  const Icon = CATEGORY_ICON[category];

  const large = spots.filter((s) => s.size === "large");
  const medium = spots.filter((s) => s.size === "medium");
  const small = spots.filter((s) => s.size === "small");

  function selectSpot(spot: Spot) {
    if (spot.takenBy) return;
    router.push(`/listing/${listingId}/buy/${spot.id}`);
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-[28px] border border-line bg-paper-alt p-6">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Icon className="h-28 w-28 text-ink opacity-[0.06]" strokeWidth={1} />
        </div>
        <div className="relative flex flex-col gap-3">
          {large.length > 0 && <Row spots={large} view={view} onSelect={selectSpot} />}
          {small.length > 0 && <Row spots={small} view={view} onSelect={selectSpot} />}
          {medium.length > 0 && <Row spots={medium} view={view} onSelect={selectSpot} />}
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <div className="flex rounded-full border border-line p-[3px]">
          <button
            onClick={() => setView("for_sale")}
            className={`rounded-full px-4 py-1.5 text-[12.5px] font-semibold ${
              view === "for_sale" ? "bg-ink text-white" : "text-ink-soft"
            }`}
          >
            For sale
          </button>
          <button
            onClick={() => setView("final_look")}
            className={`rounded-full px-4 py-1.5 text-[12.5px] font-semibold ${
              view === "final_look" ? "bg-ink text-white" : "text-ink-soft"
            }`}
          >
            Final look
          </button>
        </div>
      </div>
      <p className="mt-3 text-center text-[12.5px] text-ink-soft">
        {view === "for_sale" ? "Tap a free spot to buy it." : "A preview of every spot filled."}
      </p>
    </div>
  );
}

function Row({
  spots,
  view,
  onSelect,
}: {
  spots: Spot[];
  view: "for_sale" | "final_look";
  onSelect: (spot: Spot) => void;
}) {
  return (
    <div className="flex gap-3">
      {spots.map((spot) => {
        const filled = view === "final_look" || !!spot.takenBy;
        const available = view === "for_sale" && !spot.takenBy;
        return (
          <button
            key={spot.id}
            type="button"
            disabled={!available}
            onClick={() => onSelect(spot)}
            title={spot.label}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl border py-4 text-center transition-colors ${
              filled
                ? "border-ink bg-ink text-white"
                : "border-line bg-paper text-ink hover:border-ink"
            } ${available ? "cursor-pointer" : "cursor-default"}`}
          >
            {filled ? (
              <span className="text-[11px] font-bold uppercase tracking-wide">
                {view === "final_look" ? "Logo" : spot.takenBy}
              </span>
            ) : (
              <>
                <span className="text-[10.5px] font-bold uppercase tracking-wide text-ink-soft">
                  {spot.size}
                </span>
                <span className="text-[14px] font-bold">${spot.price}</span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
