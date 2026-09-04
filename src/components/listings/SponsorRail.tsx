import Link from "next/link";
import { UploadIcon } from "@/components/ui/icons";
import type { SponsorEntry } from "@/lib/ad-slots";

/**
 * Ad rail pinned near the browser edge, filling the full viewport height
 * and staying in place while its own section scrolls — sticky, not fixed,
 * so it's confined to the section it belongs to (the listings grid, a
 * listing page) rather than bleeding into unrelated sections like the FAQ
 * or footer further down the page. Every empty slot is individually
 * bookable: it links straight to /advertise?slot=<id>.
 */
export function SponsorRail({ sponsors, side }: { sponsors: SponsorEntry[]; side: "left" | "right" }) {
  const edgePad = side === "left" ? "pl-4 xl:pl-8" : "pr-4 xl:pr-8";

  return (
    <div className={`hidden w-[220px] flex-none self-stretch lg:block ${edgePad}`}>
      <div className="sticky top-[72px] flex h-[calc(100vh-72px)] flex-col py-4">
        <div className="mb-2.5 flex-none text-[11px] font-bold uppercase tracking-wide text-ink-soft">
          Sponsors
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-2.5">
          {sponsors.map((sponsor) =>
            sponsor.name ? (
              <div
                key={sponsor.id}
                className="flex flex-1 flex-col items-center justify-center rounded-[14px] border border-line bg-paper p-4 text-center"
              >
                <div className="mb-2 flex h-[52px] w-full items-center justify-center rounded-lg bg-paper-alt">
                  <span className="text-[11px] font-bold text-ink-soft">LOGO</span>
                </div>
                <div className="text-[12px] font-semibold text-ink">{sponsor.name}</div>
                {sponsor.tagline && (
                  <div className="mt-0.5 text-[10.5px] text-ink-soft">{sponsor.tagline}</div>
                )}
              </div>
            ) : (
              <Link
                key={sponsor.id}
                href={`/advertise?slot=${sponsor.id}`}
                className="flex flex-1 flex-col items-center justify-center rounded-[14px] border border-dashed border-line bg-paper p-4 text-center text-ink-soft transition-colors hover:border-ink"
              >
                <div className="mb-2 flex h-[52px] w-full items-center justify-center rounded-lg border border-dashed border-line">
                  <UploadIcon className="h-4 w-4 text-ink-soft" />
                </div>
                <div className="text-[11.5px]">Your brand here</div>
              </Link>
            )
          )}
        </div>
        <Link
          href="/advertise"
          className="mt-2.5 block flex-none rounded-full py-2 text-center text-[12px] font-bold text-ink hover:underline"
        >
          Advertise here &rarr;
        </Link>
      </div>
    </div>
  );
}
