import { AdminDashboardClient } from "@/components/dashboard/AdminDashboardClient";
import { getCurrentUser } from "@/lib/supabase/profile";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  const identity = user
    ? { name: user.displayName, initial: user.displayName.charAt(0).toUpperCase(), signedIn: true }
    : { name: "Admin", initial: "A", signedIn: false };

  return <AdminDashboardClient identity={identity} />;
}
