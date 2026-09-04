import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/layout/Container";
import { RailLayout } from "@/components/layout/RailLayout";
import { SpotGridPanel } from "@/components/listings/SpotGridPanel";
import { SpotsTable } from "@/components/listings/SpotsTable";
import { ListingCard } from "@/components/listings/ListingCard";
import { ShieldCheckIcon } from "@/components/ui/icons";
import {
  CATEGORY_LABEL,
  CONTEXT_LABEL,
  SPOT_SIZE_LABEL,
  spotsLeft,
  spotsTotal,
  type SeenContext,
  type SpotSize,
} from "@/lib/types";
import { LISTINGS, getListing } from "@/lib/mock-data";

const ALL_CONTEXTS: SeenContext[] = ["coffee_shops", "video_calls", "campus", "gym", "commute"];
const SIZE_ORDER: SpotSize[] = ["small", "medium", "large"];

export default async function ListingDetailPage(props: PageProps<"/listing/[id]">) {
  const { id } = await props.params;
  const listing = getListing(id);
  if (!listing) notFound();

  const left = spotsLeft(listing);
  const total = spotsTotal(listing);
  // Wall-clock "days left" for a per-request dynamic page (this route is
  // never statically cached, since params/searchParams already force
  // dynamic rendering) — safe despite the purity rule's default assumption.
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();
  const daysLeft = Math.max(0, Math.ceil((new Date(listing.endsAt).getTime() - now) / (1000 * 60 * 60 * 24)));

  const sizeBreakdown = SIZE_ORDER.map((size) => {
    const spots = listing.spots.filter((s) => s.size === size);
    if (spots.length === 0) return null;
    return {
      size,
      count: spots.length,
      dims: spots[0].dimensionsCm,
      from: Math.min(...spots.map((s) => s.price)),
    };
  }).filter(Boolean) as { size: SpotSize; count: number; dims: string; from: number }[];

  const related = LISTINGS.filter((l) => l.id !== listing.id).slice(0, 3);

  return (
    <div>
      <SiteHeader />

      <RailLayout>
      <Container className="pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-ink-soft hover:text-ink"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-[15px] w-[15px]">
            <path d="M15 6l-6 6 6 6" />
          </svg>
          Back to browse
        </Link>
      </Container>

      <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[780px]">
            {/* Title + status */}
            <div className="text-center">
              <div className="text-[11px] font-bold uppercase tracking-wide text-ink-soft">
                {CATEGORY_LABEL[listing.category]}
              </div>
              <h1 className="mt-2 text-[32px] font-bold leading-tight tracking-tight text-ink">
                {listing.title}
              </h1>
              <div className="mt-2.5 text-[13.5px] text-ink-soft">
                {left === 0 ? (
                  <span className="font-semibold text-amber">Fully claimed</span>
                ) : (
                  <span className="font-semibold text-ink">
                    {left} of {total} spots left
                  </span>
                )}
                {daysLeft > 0 && <span> &middot; ends in {daysLeft}d</span>}
              </div>
              <div className="mt-3 flex items-center justify-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-paper-alt">
                  <span className="text-[12px] font-bold">{listing.seller.avatarInitial}</span>
                </div>
                <span className="text-[13.5px] font-semibold">{listing.seller.name}</span>
                <span className="text-[13px] text-ink-soft">{listing.seller.handle}</span>
                {listing.seller.verified && (
                  <span className="rounded-full bg-paper-alt px-2 py-0.5 text-[11px] font-bold text-ink-soft">
                    Verified
                  </span>
                )}
                <span className="text-[13px] text-ink-soft">
                  &middot; {listing.seller.followers.toLocaleString()} followers
                </span>
              </div>
            </div>

            {/* The grid */}
            <div className="mt-8">
              <SpotGridPanel listingId={listing.id} category={listing.category} spots={listing.spots} />
            </div>

            {/* The details */}
            <div className="mt-12">
              <h2 className="text-[20px] font-bold">The details.</h2>

              <DetailBlock title="Who you're buying from">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper-alt">
                    <span className="text-[13px] font-bold">{listing.seller.avatarInitial}</span>
                  </div>
                  <div>
                    <div className="text-[13.5px] font-bold">{listing.seller.name}</div>
                    <div className="text-[12px] text-ink-soft">
                      {listing.seller.handle} &middot; {listing.seller.followers.toLocaleString()}{" "}
                      followers &middot; {listing.seller.role}
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
                  They take the payment, approve your logo, print the sticker and put it on their
                  own {CATEGORY_LABEL[listing.category].toLowerCase()}. Perchd runs the listing and
                  takes 10% &mdash; we are not a party to the sale, and we do not check the item
                  ourselves.
                </p>
              </DetailBlock>

              <DetailBlock title="The item">
                <DlRow label={CATEGORY_LABEL[listing.category]} value={listing.itemModel} />
                <DlRow label="Owned by the seller" value="Yes" />
                <DlRow label="Located in" value={`${listing.city}, ${listing.state}`} />
              </DetailBlock>

              <DetailBlock title="Where it goes">
                <ul className="flex flex-col gap-1.5">
                  {ALL_CONTEXTS.filter((c) => listing.contexts.includes(c)).map((c) => (
                    <li key={c} className="flex items-center gap-2 text-[13.5px] text-ink">
                      <span className="h-1 w-1 rounded-full bg-ink" />
                      {CONTEXT_LABEL[c]}
                    </li>
                  ))}
                </ul>
              </DetailBlock>

              <DetailBlock title="What a spot gets you">
                <div className="flex flex-col gap-2">
                  {sizeBreakdown.map((s) => (
                    <div key={s.size} className="flex items-center justify-between text-[13.5px]">
                      <span>
                        {s.count} &times; {SPOT_SIZE_LABEL[s.size]}
                      </span>
                      <span className="text-ink-soft">
                        {s.dims} &middot; from ${s.from}
                      </span>
                    </div>
                  ))}
                </div>
              </DetailBlock>

              <div className="grid grid-cols-2 gap-4">
                <DetailBlock title="Stays on for">
                  <div className="text-[13.5px] font-semibold">
                    {listing.durationMonths} months from purchase
                  </div>
                </DetailBlock>
                <DetailBlock title="Listing closes">
                  <div className="text-[13.5px] font-semibold">
                    {new Date(listing.endsAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </DetailBlock>
              </div>

              <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">
                Printed as die-cut vinyl at the size shown, plus a listing on this page linking to
                your site. The seller has 14 days from your purchase to apply it and post the
                photo.
              </p>

              <DetailBlock title="Proof">
                {listing.proofPhotoUrl ? (
                  <div className="relative h-64 w-full overflow-hidden rounded-xl">
                    <Image src={listing.proofPhotoUrl} alt="Proof of placement" fill className="object-cover" />
                  </div>
                ) : (
                  <p className="text-[13px] text-ink-soft">
                    No photo yet &mdash; the seller posts one once the stickers are on.
                  </p>
                )}
              </DetailBlock>

              <div className="mt-6 flex items-start gap-3.5 rounded-2xl border border-line bg-paper-alt p-4.5">
                <ShieldCheckIcon className="mt-0.5 h-5 w-5 flex-none text-ink" />
                <div>
                  <div className="text-[13.5px] font-bold">
                    {listing.seller.name.split(" ")[0]} approves every design first
                  </div>
                  <div className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">
                    Paying goes straight to {listing.seller.name.split(" ")[0]} through Paddle. If
                    they refuse your logo you&apos;re refunded in full and nothing is printed.
                    Nobody promises impressions &mdash; a sticker is presence, a paid placement
                    rather than a recommendation.
                  </div>
                </div>
              </div>
            </div>

            {/* The spots */}
            <div className="mt-12">
              <h2 className="text-[20px] font-bold">The spots.</h2>
              <p className="mb-4 mt-1.5 text-[13px] text-ink-soft">
                One price each, paid in full. Your logo goes to {listing.seller.name.split(" ")[0]}{" "}
                for approval before it appears.
              </p>
              <SpotsTable listingId={listing.id} spots={listing.spots} />
            </div>

            {/* Related listings */}
            {related.length > 0 && (
              <div className="mt-12 pb-4">
                <h2 className="text-[20px] font-bold">Other items looking for brands.</h2>
                <p className="mb-4 mt-1.5 text-[13px] text-ink-soft">
                  Every seller carries a few others alongside their own listing.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {related.map((l) => (
                    <ListingCard key={l.id} listing={l} />
                  ))}
                </div>
              </div>
            )}
          </div>
      </div>
      </RailLayout>

      <SiteFooter />
    </div>
  );
}

function DetailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line py-5">
      <h3 className="mb-3 text-[12px] font-bold uppercase tracking-wide text-ink-soft">{title}</h3>
      {children}
    </div>
  );
}

function DlRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-[13.5px]">
      <span className="text-ink-soft">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
