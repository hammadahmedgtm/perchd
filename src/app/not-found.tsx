import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RailLayout } from "@/components/layout/RailLayout";
import { EmptyState } from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
    <div>
      <SiteHeader />
      <RailLayout>
        <div className="mx-auto max-w-[520px] px-4 py-20 sm:px-8">
          <EmptyState
            title="This spot doesn't exist"
            description="The page, listing, or spot you're looking for isn't here — it may have sold, expired, or the link's just wrong."
            action={{ label: "Back to browse", href: "/" }}
          />
        </div>
      </RailLayout>
      <SiteFooter />
    </div>
  );
}
