import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RailLayout } from "@/components/layout/RailLayout";
import { Container } from "@/components/layout/Container";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { SELLER_FAQ, BRAND_FAQ } from "@/lib/faq";

export default function FaqPage() {
  return (
    <div>
      <SiteHeader active="faq" />
      <RailLayout>
        <Container className="pt-14 pb-4 text-center">
          <h1 className="text-[34px] font-bold tracking-tight sm:text-[40px]">
            Frequently asked questions
          </h1>
          <p className="mx-auto mt-3 max-w-[520px] text-[15px] leading-relaxed text-ink-soft">
            Everything about listing an item, buying a spot, and how the money moves.
          </p>
        </Container>

        <div className="mx-auto w-full max-w-[760px] px-4 pt-10 sm:px-8">
          <h2 className="mb-4 text-[13px] font-bold uppercase tracking-wide text-ink-soft">
            For sellers
          </h2>
          <FaqAccordion items={SELLER_FAQ} />
        </div>

        <div className="mx-auto w-full max-w-[760px] px-4 pb-16 pt-10 sm:px-8">
          <h2 className="mb-4 text-[13px] font-bold uppercase tracking-wide text-ink-soft">
            For brands
          </h2>
          <FaqAccordion items={BRAND_FAQ} />
        </div>
      </RailLayout>

      <SiteFooter />
    </div>
  );
}
