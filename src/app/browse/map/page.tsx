import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RailLayout } from "@/components/layout/RailLayout";
import { MapExplorer } from "@/components/map/MapExplorer";

export default function BrowseMapPage() {
  return (
    <div>
      <SiteHeader active="browse" />
      <RailLayout>
        <MapExplorer />
      </RailLayout>
      <SiteFooter />
    </div>
  );
}
