import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RailLayout } from "@/components/layout/RailLayout";
import { Container } from "@/components/layout/Container";
import { AdSlotBuyButton } from "@/components/listings/AdSlotBuyButton";
import { AD_SLOTS } from "@/lib/mock-data";
import { LEFT_AD_SLOTS, RIGHT_AD_SLOTS } from "@/lib/ad-slots";

export default async function AdvertisePage(props: PageProps<"/advertise">) {
  const searchParams = await props.searchParams;
  const slotParam = typeof searchParams.slot === "string" ? searchParams.slot : null;
  const railSlot = slotParam
    ? [...LEFT_AD_SLOTS, ...RIGHT_AD_SLOTS].find((s) => s.id === slotParam)
    : null;
  const sidebarAd = AD_SLOTS.find((s) => s.kind === "category_sidebar")!;

  return (
    <div>
      <SiteHeader active="advertise" />

      <RailLayout>
      {/* Hero */}
      <Container className="pb-4 pt-16 text-center">
        {railSlot ? (
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue bg-blue/5 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-wide text-blue">
            Reserving sidebar slot {railSlot.id}
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-wide text-ink-soft">
            Platform ad space
          </div>
        )}
        <h1 className="mx-auto mt-4.5 max-w-[680px] text-[34px] font-bold leading-[1.12] tracking-tight sm:text-[42px]">
          {railSlot ? "Book this exact spot." : "Put your logo in front of real people, on real stuff."}
        </h1>
        <p className="mx-auto mt-3.5 max-w-[560px] text-[15.5px] leading-relaxed text-ink-soft">
          {railSlot
            ? `You picked slot ${railSlot.id} — one of the sponsor positions shown on every browse and listing page. Same flat price as any category sidebar slot.`
            : "These slots run directly on Perchd's own pages — homepage banners, category placements. No seller, no approval wait, no bidding. Book it, pay it, it's live."}
        </p>
      </Container>

      {!railSlot && (
        <Container className="pb-1 pt-11">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1 rounded-2xl border border-line p-5.5">
              <div className="inline-block rounded-[8px] bg-paper-alt px-2.5 py-1 text-[11.5px] font-bold text-ink-soft">
                This page
              </div>
              <div className="mt-2.5 text-[15px] font-bold">Perchd&apos;s own ad space</div>
              <div className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
                Fixed slots on Perchd&apos;s pages. 100% direct &mdash; pay Perchd, go live
                immediately.
              </div>
            </div>
            <div className="flex-1 rounded-2xl border border-line p-5.5">
              <div className="inline-block rounded-[8px] bg-paper-alt px-2.5 py-1 text-[11.5px] font-bold text-ink-soft">
                Browse marketplace
              </div>
              <div className="mt-2.5 text-[15px] font-bold">Peer listings</div>
              <div className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
                Real people&apos;s laptops, bottles, bikes. Pick a person, pay them, they approve
                your design first.
              </div>
            </div>
          </div>
        </Container>
      )}

      {railSlot ? (
        <Container className="pt-9">
          <div className="mx-auto max-w-[420px] rounded-2xl border border-line p-5.5">
            <div className="mb-4 h-[100px] rounded-[10px] bg-paper-alt" />
            <div className="text-[15px] font-bold">Category sidebar &mdash; slot {railSlot.id}</div>
            <div className="mt-1 text-[12px] leading-relaxed text-ink-soft">{sidebarAd.description}</div>
            <div className="mt-4 text-[20px] font-bold text-green">
              ${sidebarAd.price}
              <span className="text-[12px] font-semibold text-ink-soft">/mo</span>
            </div>
            <div className="mt-3.5">
              <AdSlotBuyButton slotId={railSlot.id} price={sidebarAd.price} />
            </div>
          </div>
        </Container>
      ) : (
        <Container className="pt-9">
          <h2 className="text-[20px] font-bold">Available slots</h2>
          <p className="mb-5.5 mt-1.5 text-[13.5px] text-ink-soft">
            Flat monthly pricing. Reserve directly &mdash; no negotiation.
          </p>
          <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-3">
            {AD_SLOTS.map((slot) => (
              <div key={slot.id} className="rounded-2xl border border-line p-5.5">
                <div className="mb-4 h-[100px] rounded-[10px] bg-paper-alt" />
                <div className="text-[15px] font-bold">{slot.title}</div>
                <div className="mt-1 text-[12px] leading-relaxed text-ink-soft">{slot.description}</div>
                <div className="mt-4 text-[20px] font-bold text-green">
                  ${slot.price}
                  <span className="text-[12px] font-semibold text-ink-soft">/mo</span>
                </div>
                <div className="mt-3.5">
                  <AdSlotBuyButton slotId={slot.id} price={slot.price} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      )}

      {/* How it works */}
      <div className="mt-12 border-t border-line">
        <Container className="pb-2 pt-14">
          <h2 className="text-[24px] font-bold">How it works</h2>
          <p className="mt-2 max-w-[640px] text-[14px] leading-relaxed text-ink-soft">
            No auction, no negotiation. Every slot has one flat price. Pay it and it&apos;s yours
            for the month.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <Step n={1} title="Pick a slot">
              Homepage banner, category sidebar, or a sponsored listing spot. Prices are fixed.
            </Step>
            <Step n={2} title="Send your creative">
              Upload your logo or banner. No seller review &mdash; this space is Perchd&apos;s, not
              a person&apos;s.
            </Step>
            <Step n={3} title="Go live">
              Your ad runs for the month you paid for. Renew or release the slot any time.
            </Step>
          </div>
        </Container>
      </div>

      {/* Footer note */}
      <Container className="pb-16 pt-14">
        <div className="flex items-center gap-3.5 rounded-2xl border border-line bg-paper-alt p-4.5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 flex-none text-ink-soft">
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <circle cx="12" cy="16" r="0.6" fill="currentColor" stroke="none" />
          </svg>
          <div className="text-[12.5px] leading-relaxed text-ink-soft">
            Want to reach a specific person&apos;s audience instead? Browse the marketplace to buy
            space directly on someone&apos;s laptop, bottle, or bike &mdash; those go through their
            approval first.
          </div>
        </div>
      </Container>
      </RailLayout>

      <SiteFooter />
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[13px] font-bold text-white">
        {n}
      </div>
      <div className="mt-3.5 text-[15.5px] font-bold">{title}</div>
      <div className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{children}</div>
    </div>
  );
}
