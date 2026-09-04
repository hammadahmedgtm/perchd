import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RailLayout } from "@/components/layout/RailLayout";

export default function PrivacyPage() {
  return (
    <div>
      <SiteHeader />
      <RailLayout>
        <div className="mx-auto max-w-[680px] px-4 py-16 sm:px-8">
          <h1 className="text-[28px] font-bold">Privacy policy</h1>
          <p className="mt-3 text-[13.5px] text-ink-soft">
            Placeholder — replace with Perchd&apos;s actual privacy policy before launch.
          </p>
          <div className="mt-8 flex flex-col gap-6 text-[13.5px] leading-relaxed text-ink-soft">
            <p>
              This will cover what account, listing, and payment data Perchd collects (via
              Supabase and Paddle), how photos and location details are used, and how to request
              deletion.
            </p>
            <p>
              Until a real policy is drafted, treat this page as a placeholder rather than a
              binding statement of Perchd&apos;s data practices.
            </p>
          </div>
        </div>
      </RailLayout>
      <SiteFooter />
    </div>
  );
}
