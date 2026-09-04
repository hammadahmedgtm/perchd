import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RailLayout } from "@/components/layout/RailLayout";
import { Container } from "@/components/layout/Container";
import { BrowseExplorer } from "@/components/listings/BrowseExplorer";
import { ActivityTicker } from "@/components/home/ActivityTicker";
import { FeaturedShowcase } from "@/components/home/FeaturedShowcase";
import { ConciergeBanner } from "@/components/home/ConciergeBanner";
import { FullyBrandedShowcase } from "@/components/home/FullyBrandedShowcase";
import { WeeklyDigestForm } from "@/components/home/WeeklyDigestForm";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { JUST_SOLD, LISTINGS, getListing } from "@/lib/mock-data";
import { SELLER_FAQ, BRAND_FAQ } from "@/lib/faq";
import { CATEGORY_LABEL, soldValue, spotsLeft } from "@/lib/types";

const FEATURED_IDS = ["maya-laptop-lid", "owen-bike", "lena-car"];
const HOMEPAGE_FAQ = [SELLER_FAQ[0], BRAND_FAQ[0], SELLER_FAQ[1], BRAND_FAQ[1], SELLER_FAQ[2]];

export default function HomePage() {
  const totalSold = LISTINGS.reduce((sum, l) => sum + soldValue(l), 0);
  const featured = FEATURED_IDS.map((id) => getListing(id)).filter((l) => !!l);
  const fullyClaimed = LISTINGS.filter((l) => spotsLeft(l) === 0);

  return (
    <div>
      <SiteHeader active="browse" />

      <RailLayout>
      {/* Hero */}
      <Container className="pt-14 pb-7 text-center">
        <div className="text-[14px] font-bold text-green">
          ${totalSold.toLocaleString()} sold across {LISTINGS.length} items
        </div>
        <h1 className="mt-3 text-[40px] font-bold leading-[1.08] tracking-tight text-ink sm:text-[46px]">
          Your stuff. Their logo.
        </h1>
        <p className="mx-auto mt-3.5 max-w-[520px] text-[16px] leading-relaxed text-ink-soft">
          Brands buy sticker spots on the laptop, bottle, or backpack you already carry. Set your
          prices and get paid.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/sell"
            className="rounded-full bg-blue px-[26px] py-3.5 text-[15px] font-semibold text-white hover:opacity-90 transition-opacity"
          >
            List my item
          </Link>
          <Link
            href="#listings"
            className="rounded-full border border-line px-[25px] py-3.5 text-[15px] font-semibold text-ink hover:border-ink transition-colors"
          >
            Browse spots
          </Link>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12.5px] font-semibold text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-[6px] w-[6px] rounded-full bg-green [animation:pulse-dot_1.8s_ease-in-out_infinite]" />
            142 people here now
          </span>
          <span className="text-line">&middot;</span>
          <span>18,204 visitors total</span>
        </div>
      </Container>

      {/* Latest activity */}
      <Container className="pb-10">
        <ActivityTicker />
      </Container>

      {/* Featured now */}
      <Container className="pb-12">
        <FeaturedShowcase listings={featured} />
      </Container>

      {/* Listings */}
      <div id="listings">
        <Container className="pb-1">
          <h2 className="text-[20px] font-bold text-ink">{LISTINGS.length} items looking for brands</h2>
        </Container>
        <BrowseExplorer listings={LISTINGS} />
      </div>

      {/* Concierge */}
      <Container className="pb-14 pt-2">
        <ConciergeBanner />
      </Container>

      {/* Just sold */}
      <div className="border-t border-line">
        <Container className="pb-12 pt-10">
          <h2 className="text-[20px] font-bold text-ink">Just sold</h2>
          <p className="mt-1.5 mb-5 text-[13.5px] text-ink-soft">Every spot bought on these items.</p>
          <div className="overflow-hidden rounded-2xl border border-line">
            {JUST_SOLD.map((sale, i) => {
              const listing = getListing(sale.listingId);
              if (!listing) return null;
              return (
                <div
                  key={i}
                  className={`flex items-center justify-between gap-4 px-5 py-3.5 ${
                    i < JUST_SOLD.length - 1 ? "border-b border-line" : ""
                  }`}
                >
                  <span className="text-[13.5px]">
                    <strong>{sale.brand}</strong> took the {sale.spotLabel} on {listing.seller.name.split(" ")[0]}
                    &apos;s {CATEGORY_LABEL[listing.category].toLowerCase()}
                  </span>
                  <span className="flex flex-none items-center gap-4">
                    <span className="text-[13.5px] font-bold text-green">${sale.price}</span>
                    <span className="w-16 text-right text-[12px] text-ink-soft">
                      {sale.hoursAgo}h ago
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </Container>
      </div>

      {/* Fully branded */}
      {fullyClaimed.length > 0 && (
        <div className="border-t border-line">
          <Container className="py-12">
            <FullyBrandedShowcase listings={fullyClaimed} />
          </Container>
        </div>
      )}

      {/* How it works */}
      <div id="how-it-works" className="border-t border-line">
        <Container className="pb-16 pt-10">
          <h2 className="text-[20px] font-bold text-ink">How it works</h2>
          <p className="mt-1.5 mb-6 max-w-[640px] text-[13.5px] leading-relaxed text-ink-soft">
            This is not an auction. Every spot has one price, set by the person who owns the item.
            The first brand to pay it takes it, for as long as the listing promised.
          </p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <Step n={1} title="List your item">
              Pick a category, set your price and how long the sticker stays up. Connect Paddle to
              get paid.
            </Step>
            <Step n={2} title="Brands buy, you approve">
              The first buyer pays in full. Their logo waits for your approval before it goes near
              your item.
            </Step>
            <Step n={3} title="Stick it on, get paid">
              Apply the sticker, post the photo. Payment lands straight in your Paddle account &mdash;
              Perchd keeps 10%.
            </Step>
          </div>
        </Container>
      </div>

      {/* FAQ */}
      <div id="faq" className="border-t border-line">
        <div className="mx-auto max-w-[720px] px-4 pb-16 pt-10 sm:px-8">
          <h2 className="text-[20px] font-bold text-ink">Questions &amp; answers</h2>
          <div className="mt-5">
            <FaqAccordion items={HOMEPAGE_FAQ} />
          </div>
          <Link href="/faq" className="mt-4 inline-block text-[13px] font-bold text-ink hover:underline">
            See all FAQs &rarr;
          </Link>
        </div>
      </div>

      {/* Weekly digest */}
      <div className="border-t border-line">
        <div className="mx-auto max-w-[520px] px-4 py-12 text-center sm:px-8">
          <h2 className="text-[20px] font-bold text-ink">What sold this week, every week</h2>
          <p className="mt-1.5 mb-5 text-[13.5px] leading-relaxed text-ink-soft">
            One email a week: the spots that sold, what brands paid, and what the whole board is
            worth. The numbers, not a newsletter about them.
          </p>
          <WeeklyDigestForm />
          <p className="mt-2.5 text-[11.5px] text-ink-soft">Once a week, nothing else, and one click to stop.</p>
        </div>
      </div>
      </RailLayout>

      <SiteFooter />
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-ink text-[12px] font-bold text-white">
        {n}
      </div>
      <div className="mt-3.5 text-[15.5px] font-bold text-ink">{title}</div>
      <div className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{children}</div>
    </div>
  );
}
