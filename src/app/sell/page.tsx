import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RailLayout } from "@/components/layout/RailLayout";
import { SellFlow } from "@/components/sell/SellFlow";

export default function SellPage() {
  return (
    <div>
      <SiteHeader />
      <RailLayout>
        <SellFlow />
      </RailLayout>
      <SiteFooter />
    </div>
  );
}
