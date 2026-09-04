import { BuyButton } from "@/components/listings/BuyButton";
import { SPOT_SIZE_LABEL, type Spot } from "@/lib/types";

export function SpotsTable({ listingId, spots }: { listingId: string; spots: Spot[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line">
      <table className="w-full min-w-[560px] border-collapse">
        <thead>
          <tr>
            {["#", "Spot", "Size", "Taken by", "Price", ""].map((h) => (
              <th
                key={h}
                className="border-b border-line px-4 pb-2.5 pt-3.5 text-left text-[11px] font-bold uppercase tracking-wide text-ink-soft"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {spots.map((spot, i) => {
            const last = i === spots.length - 1;
            const cell = `px-4 py-3 text-[13.5px] ${last ? "" : "border-b border-line"}`;
            return (
              <tr key={spot.id}>
                <td className={`${cell} text-ink-soft`}>{i + 1}</td>
                <td className={`${cell} font-semibold`}>{spot.label}</td>
                <td className={`${cell} text-ink-soft`}>
                  {SPOT_SIZE_LABEL[spot.size]} &middot; {spot.dimensionsCm}
                </td>
                <td className={cell}>
                  {spot.takenBy ? (
                    <span className="text-ink-soft">{spot.takenBy}</span>
                  ) : (
                    <span className="font-semibold text-green">Available</span>
                  )}
                </td>
                <td className={`${cell} font-bold`}>${spot.price}</td>
                <td className={`${cell} text-right`}>
                  <BuyButton listingId={listingId} spotId={spot.id} disabled={!!spot.takenBy} size="sm" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
