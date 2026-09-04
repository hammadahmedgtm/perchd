import { SellerDashboardClient } from "@/components/dashboard/SellerDashboardClient";
import { getCurrentUser } from "@/lib/supabase/profile";

export default async function SellerDashboardPage() {
  const user = await getCurrentUser();
  const identity = user
    ? { name: user.displayName, initial: user.displayName.charAt(0).toUpperCase(), signedIn: true }
    : { name: "Maya R.", initial: "M", signedIn: false };

  return <SellerDashboardClient identity={identity} />;
}
