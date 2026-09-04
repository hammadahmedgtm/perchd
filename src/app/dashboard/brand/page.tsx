import Link from "next/link";
import { DashboardShell, StatCard, StatusBadge, type NavItem } from "@/components/dashboard/DashboardShell";
import { Table } from "@/components/dashboard/Table";
import { CardIcon, GearIcon, GridIcon, SearchIcon, ShieldCheckIcon } from "@/components/ui/icons";
import { BRAND_PURCHASES } from "@/lib/mock-data";
import { getCurrentUser } from "@/lib/supabase/profile";

const STATUS_MAP = {
  awaiting_approval: "pending",
  live: "live",
  declined: "expired",
  expired: "expired",
} as const;

export default async function BrandDashboardPage() {
  const user = await getCurrentUser();
  const name = user?.displayName ?? "Northwind";
  const initial = name.charAt(0).toUpperCase();

  const nav: NavItem[] = [
    { label: "Overview", href: "/dashboard/brand", icon: <GridIcon />, active: true },
    { label: "My spots", href: "/dashboard/brand", icon: <ShieldCheckIcon /> },
    { label: "Discover", href: "/", icon: <SearchIcon /> },
    { label: "Billing", href: "/dashboard/brand", icon: <CardIcon /> },
    { label: "Settings", href: "/dashboard/brand", icon: <GearIcon /> },
  ];

  const activeSpots = BRAND_PURCHASES.filter((p) => p.status === "live").length;
  const pending = BRAND_PURCHASES.filter((p) => p.status === "awaiting_approval").length;
  const totalSpend = BRAND_PURCHASES.reduce((sum, p) => sum + p.price, 0);

  return (
    <DashboardShell
      nav={nav}
      identity={{ name, role: "Brand", initial, signedIn: !!user }}
    >
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-[24px] font-bold">Welcome back, {name}</h1>
          <div className="mt-1 text-[13.5px] text-ink-soft">Your logo, out in the world.</div>
        </div>
        <Link
          href="/"
          className="rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-white hover:opacity-90"
        >
          Browse more spots
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Active spots" value={activeSpots} />
        <StatCard label="Awaiting approval" value={pending} tone="amber" />
        <StatCard label="Total spend" value={`$${totalSpend.toLocaleString()}`} tone="green" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div>
          <h2 className="mb-3.5 text-[16px] font-bold">My spots</h2>
          <div className="overflow-x-auto rounded-2xl border border-line">
            <Table
              head={["Item", "Seller", "Price", "Status"]}
              rows={BRAND_PURCHASES.map((p) => [
                p.listing.title,
                p.listing.seller.name.split(" ")[0],
                `$${p.price}/mo`,
                <StatusBadge key="s" status={STATUS_MAP[p.status]} />,
              ])}
            />
          </div>
        </div>
        <div>
          <h2 className="mb-3.5 text-[16px] font-bold">Billing</h2>
          <div className="rounded-2xl border border-line p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-10 items-center justify-center rounded-[6px] border border-line bg-paper-alt text-[9px] font-extrabold">
                Paddle
              </div>
              <div>
                <div className="text-[13.5px] font-bold">Paddle checkout</div>
                <div className="text-[12px] text-ink-soft">Payment method connected</div>
              </div>
            </div>
            <div className="my-4 h-px bg-line" />
            <div className="flex items-baseline justify-between">
              <span className="text-[12.5px] text-ink-soft">Next charge</span>
              <span className="text-[13.5px] font-bold">$97 on Oct 1</span>
            </div>
            <button className="mt-4 w-full rounded-full border border-line py-2.5 text-[13px] font-semibold">
              Manage billing
            </button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
