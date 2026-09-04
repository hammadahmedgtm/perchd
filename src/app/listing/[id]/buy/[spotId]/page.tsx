import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RailLayout } from "@/components/layout/RailLayout";
import { CATEGORY_ICON } from "@/components/ui/icons";
import { BookingForm } from "@/components/listings/BookingForm";
import { CATEGORY_LABEL, SPOT_SIZE_LABEL } from "@/lib/types";
import { getListing, getSpot } from "@/lib/mock-data";

export default async function BookSpotPage(props: PageProps<"/listing/[id]/buy/[spotId]">) {
  const { id, spotId } = await props.params;
  const listing = getListing(id);
  if (!listing) notFound();
  const spot = getSpot(listing, spotId);
  if (!spot) notFound();

  const Icon = CATEGORY_ICON[listing.category];

  return (
    <div>
      <SiteHeader />
      <RailLayout>
      <div className="mx-auto max-w-[760px] px-4 py-10 sm:px-8">
        <Link
          href={`/listing/${listing.id}`}
          className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-ink-soft hover:text-ink"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-[15px] w-[15px]">
            <path d="M15 6l-6 6 6 6" />
          </svg>
          Back to listing
        </Link>

        <h1 className="mt-5 text-[26px] font-bold tracking-tight">Book this spot</h1>
        <p className="mt-1.5 text-[13.5px] text-ink-soft">
          Send your design. You&apos;ll pay on the next step, and{" "}
          {listing.seller.name.split(" ")[0]} reviews it before it goes on the{" "}
          {CATEGORY_LABEL[listing.category].toLowerCase()}.
        </p>

        <div className="mt-6 flex items-center gap-3.5 rounded-2xl border border-line p-4">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-[10px] bg-paper-alt">
            <Icon className="h-5 w-5 text-ink-soft" strokeWidth={1.6} />
          </div>
          <div className="flex-1">
            <div className="text-[13.5px] font-bold">{spot.label}</div>
            <div className="mt-0.5 text-[12px] text-ink-soft">
              {listing.title} &middot; {SPOT_SIZE_LABEL[spot.size]} &middot; {spot.dimensionsCm}
            </div>
          </div>
          <div className="text-[18px] font-bold text-green">${spot.price}</div>
        </div>

        {spot.takenBy ? (
          <p className="mt-8 rounded-2xl border border-line bg-paper-alt p-5 text-center text-[13.5px] text-ink-soft">
            This spot was just taken by {spot.takenBy}. <Link href={`/listing/${listing.id}`} className="font-semibold text-ink hover:underline">Pick another spot &rarr;</Link>
          </p>
        ) : (
          <div className="mt-8">
            <BookingForm listingId={listing.id} spotId={spot.id} price={spot.price} />
          </div>
        )}
      </div>
      </RailLayout>
      <SiteFooter />
    </div>
  );
}
