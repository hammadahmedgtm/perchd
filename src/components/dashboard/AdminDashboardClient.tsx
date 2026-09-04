"use client";

import { useState } from "react";
import { DashboardShell, StatCard, type NavItem } from "@/components/dashboard/DashboardShell";
import {
  BuildingIcon,
  CardIcon,
  CheckCircleIcon,
  GearIcon,
  GridIcon,
  PeopleIcon,
  SearchIcon,
} from "@/components/ui/icons";
import { ADMIN_REVIEW_QUEUE } from "@/lib/mock-data";

export function AdminDashboardClient({
  identity,
}: {
  identity: { name: string; initial: string; signedIn: boolean };
}) {
  const [queue, setQueue] = useState(ADMIN_REVIEW_QUEUE);

  const nav: NavItem[] = [
    { label: "Overview", href: "/dashboard/admin", icon: <GridIcon />, active: true },
    { label: "Review queue", href: "/dashboard/admin", icon: <CheckCircleIcon />, badge: queue.length },
    { label: "Sellers", href: "/dashboard/admin", icon: <PeopleIcon /> },
    { label: "Brands", href: "/dashboard/admin", icon: <BuildingIcon /> },
    { label: "Payouts", href: "/dashboard/admin", icon: <CardIcon /> },
    { label: "Settings", href: "/dashboard/admin", icon: <GearIcon /> },
  ];

  function decide(id: string) {
    setQueue((prev) => prev.filter((q) => q.id !== id));
  }

  return (
    <DashboardShell
      nav={nav}
      identity={{ name: identity.name, role: "Platform team", initial: identity.initial, dark: true, signedIn: identity.signedIn }}
    >
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-[24px] font-bold">Platform overview</h1>
          <div className="mt-1 text-[13.5px] text-ink-soft">{queue.length} listings waiting on review.</div>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-paper-alt px-4 py-2 text-[13px] text-ink-soft">
          <SearchIcon className="h-4 w-4" />
          Search users, listings&hellip;
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Pending reviews" value={queue.length} tone="amber" />
        <StatCard label="Sellers" value={318} />
        <StatCard label="Brands" value={94} />
        <StatCard label="GMV this month" value="$6,140" tone="green" />
      </div>

      <div>
        <h2 className="mb-3.5 text-[16px] font-bold">Listing review queue</h2>
        <div className="overflow-x-auto rounded-2xl border border-line">
          {queue.length === 0 ? (
            <div className="px-5 py-8 text-center text-[13.5px] text-ink-soft">Queue is empty.</div>
          ) : (
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr>
                  {["Item", "Seller", "Category", "Price", "Submitted", ""].map((h) => (
                    <th
                      key={h}
                      className="border-b border-line px-5 pb-2.5 pt-4 text-left text-[11px] font-bold uppercase tracking-wide text-ink-soft"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queue.map((q, i) => (
                  <tr key={q.id}>
                    <Cell last={i === queue.length - 1}>{q.item}</Cell>
                    <Cell last={i === queue.length - 1}>{q.seller}</Cell>
                    <Cell last={i === queue.length - 1}>{q.category}</Cell>
                    <Cell last={i === queue.length - 1}>${q.price}/mo</Cell>
                    <Cell last={i === queue.length - 1}>{q.submittedHoursAgo}h ago</Cell>
                    <Cell last={i === queue.length - 1}>
                      <div className="flex justify-end gap-2 whitespace-nowrap">
                        <button
                          onClick={() => decide(q.id)}
                          className="rounded-full bg-[#fdecea] px-4 py-2 text-[12.5px] font-semibold text-[#b3261e]"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => decide(q.id)}
                          className="rounded-full bg-ink px-4 py-2 text-[12.5px] font-semibold text-white"
                        >
                          Approve
                        </button>
                      </div>
                    </Cell>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}

function Cell({ children, last }: { children: React.ReactNode; last?: boolean }) {
  return (
    <td className={`px-5 py-3 text-[13.5px] ${last ? "" : "border-b border-line"}`}>{children}</td>
  );
}
