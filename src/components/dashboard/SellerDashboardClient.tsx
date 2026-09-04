"use client";

import Link from "next/link";
import { useState } from "react";
import { DashboardShell, StatCard, StatusBadge, type NavItem } from "@/components/dashboard/DashboardShell";
import { Table } from "@/components/dashboard/Table";
import { CardIcon, GearIcon, GridIcon, LaptopIcon, ShieldCheckIcon } from "@/components/ui/icons";
import { SELLER_PURCHASES } from "@/lib/mock-data";

export function SellerDashboardClient({
  identity,
}: {
  identity: { name: string; initial: string; signedIn: boolean };
}) {
  const [requests, setRequests] = useState(SELLER_PURCHASES);
  const firstName = identity.name.split(" ")[0];

  const nav: NavItem[] = [
    { label: "Overview", href: "/dashboard/seller", icon: <GridIcon />, active: true },
    { label: "My listings", href: "/dashboard/seller", icon: <LaptopIcon /> },
    { label: "Requests", href: "/dashboard/seller", icon: <ShieldCheckIcon />, badge: requests.length },
    { label: "Payouts", href: "/dashboard/seller", icon: <CardIcon /> },
    { label: "Settings", href: "/dashboard/seller", icon: <GearIcon /> },
  ];

  function respond(id: string) {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <DashboardShell
      nav={nav}
      identity={{ name: identity.name, role: "Seller", initial: identity.initial, signedIn: identity.signedIn }}
    >
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-[24px] font-bold">Welcome back, {firstName}</h1>
          <div className="mt-1 text-[13.5px] text-ink-soft">Here&apos;s how your spots are doing.</div>
        </div>
        <Link
          href="/sell"
          className="rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-white hover:opacity-90"
        >
          List another item
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Active listings" value={6} />
        <StatCard label="Pending approvals" value={requests.length} tone="amber" />
        <StatCard label="Earned this month" value="$212" tone="green" />
      </div>

      <div className="mb-8">
        <h2 className="mb-3.5 text-[16px] font-bold">Pending approvals</h2>
        <div className="rounded-2xl border border-line">
          {requests.length === 0 ? (
            <div className="px-5 py-8 text-center text-[13.5px] text-ink-soft">
              Nothing waiting on you right now.
            </div>
          ) : (
            requests.map((r, i) => (
              <div
                key={r.id}
                className={`flex flex-wrap items-center gap-4 px-5 py-4 ${
                  i < requests.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-[10px] bg-paper-alt">
                  <span className="text-[10px] font-bold text-ink-soft">LOGO</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13.5px] font-bold">
                    {r.brandName} wants your {r.listing.title.toLowerCase()}
                  </div>
                  <div className="mt-0.5 text-[12px] text-ink-soft">
                    ${r.price}/mo &middot; submitted {new Date(r.purchasedAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex flex-none gap-2">
                  <button
                    onClick={() => respond(r.id)}
                    className="rounded-full border border-line px-4 py-2 text-[12.5px] font-semibold"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => respond(r.id)}
                    className="rounded-full bg-ink px-4 py-2 text-[12.5px] font-semibold text-white"
                  >
                    Approve
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div>
          <h2 className="mb-3.5 text-[16px] font-bold">My listings</h2>
          <div className="overflow-x-auto rounded-2xl border border-line">
            <Table
              head={["Item", "Price", "Status"]}
              rows={[
                ['14" MacBook lid', "$45/mo", <StatusBadge key="s" status="pending" />],
                ["Laptop base", "$20/mo", <StatusBadge key="s" status="live" />],
                ["Sleeve edge", "$15/mo", <StatusBadge key="s" status="live" />],
                ["Laptop lid corner", "$25/mo", <StatusBadge key="s" status="sold" />],
              ]}
            />
          </div>
        </div>
        <div>
          <h2 className="mb-3.5 text-[16px] font-bold">Payout history</h2>
          <div className="overflow-x-auto rounded-2xl border border-line">
            <Table
              head={["Date", "Amount", "Via"]}
              rows={[
                ["Sep 1", <span key="a" className="font-bold text-green">$45</span>, "Paddle"],
                ["Aug 24", <span key="a" className="font-bold text-green">$22</span>, "Paddle"],
                ["Aug 12", <span key="a" className="font-bold text-green">$18</span>, "Paddle"],
              ]}
            />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
