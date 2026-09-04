import type { ReactNode } from "react";
import { SponsorRail } from "@/components/listings/SponsorRail";
import { LEFT_AD_SLOTS, RIGHT_AD_SLOTS } from "@/lib/ad-slots";

const LEFT_SPONSORS = LEFT_AD_SLOTS.slice(0, 5);
const RIGHT_SPONSORS = RIGHT_AD_SLOTS.slice(0, 5);

/**
 * Wraps a page's full body (everything between the header and footer) with
 * Perchd's own ad rails on both edges — applied once per page as page-level
 * chrome, the same way SiteHeader/SiteFooter are, so every public page
 * carries the same ad inventory rather than just the browse grid.
 */
export function RailLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full items-start">
      <SponsorRail side="left" sponsors={LEFT_SPONSORS} />
      <div className="min-w-0 flex-1">{children}</div>
      <SponsorRail side="right" sponsors={RIGHT_SPONSORS} />
    </div>
  );
}
