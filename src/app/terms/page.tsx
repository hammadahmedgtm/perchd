import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RailLayout } from "@/components/layout/RailLayout";

export default function TermsPage() {
  return (
    <div>
      <SiteHeader />
      <RailLayout>
        <div className="mx-auto max-w-[680px] px-4 py-16 sm:px-8">
          <h1 className="text-[28px] font-bold">Terms of service</h1>
          <p className="mt-3 text-[13.5px] text-ink-soft">
            Placeholder — replace with Perchd&apos;s actual terms before launch.
          </p>
          <div className="mt-8 flex flex-col gap-6 text-[13.5px] leading-relaxed text-ink-soft">
            <p>
              These terms will cover how listings work, the 10% platform commission on peer
              listings, seller and brand obligations, the design-approval step, refunds, and
              acceptable use of the marketplace.
            </p>
            <p>
              Until real terms are drafted, treat this page as a placeholder rather than a binding
              agreement.
            </p>
          </div>
        </div>
      </RailLayout>
      <SiteFooter />
    </div>
  );
}
