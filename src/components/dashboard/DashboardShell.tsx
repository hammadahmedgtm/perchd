import Link from "next/link";
import type { ReactNode } from "react";
import { SignOutButton } from "@/components/layout/SignOutButton";

export type NavItem = {
  label: string;
  href: string;
  icon: ReactNode;
  active?: boolean;
  badge?: number;
};

export function DashboardShell({
  nav,
  identity,
  children,
}: {
  nav: NavItem[];
  identity: { name: string; role: string; initial: string; dark?: boolean; signedIn?: boolean };
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="flex w-[240px] flex-none flex-col border-r border-line p-4">
        <Link href="/" className="flex items-center gap-2.5 px-1.5 pb-6">
          <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-ink">
            <span className="text-[14px] font-extrabold text-white">P</span>
          </span>
          <span className="text-[18px] font-bold tracking-tight">Perchd</span>
        </Link>
        <nav className="flex flex-col gap-0.5">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-2.5 rounded-[10px] px-3.5 py-2.5 text-[13.5px] font-semibold ${
                item.active ? "bg-paper-alt text-ink" : "text-ink-soft hover:text-ink"
              }`}
            >
              <span className="h-4 w-4">{item.icon}</span>
              {item.label}
              {item.badge ? (
                <span className="ml-auto rounded-full bg-amber px-1.5 py-px text-[10.5px] font-bold text-white">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t border-line pt-3.5">
          <div className="flex items-center gap-2.5">
            <span
              className={`flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full border border-line text-[13px] font-bold ${
                identity.dark ? "bg-ink text-white" : "bg-paper-alt"
              }`}
            >
              {identity.initial}
            </span>
            <div className="min-w-0">
              <div className="truncate text-[13px] font-bold">{identity.name}</div>
              <div className="text-[11.5px] text-ink-soft capitalize">{identity.role}</div>
            </div>
          </div>
          {identity.signedIn && (
            <SignOutButton className="mt-2.5 text-[12px] font-semibold text-ink-soft hover:text-ink" />
          )}
        </div>
      </aside>
      <main className="flex-1 overflow-x-hidden px-6 py-8 sm:px-10">
        <div className="mx-auto w-full max-w-[1160px]">{children}</div>
      </main>
    </div>
  );
}

export function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: ReactNode;
  tone?: "green" | "amber";
}) {
  return (
    <div className="rounded-2xl border border-line p-5">
      <div className="text-[12px] font-bold uppercase tracking-wide text-ink-soft">{label}</div>
      <div
        className={`mt-2 text-[28px] font-bold ${
          tone === "green" ? "text-green" : tone === "amber" ? "text-amber" : "text-ink"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: "live" | "pending" | "sold" | "expired" }) {
  const map = {
    live: { bg: "bg-[#e6f4ea]", text: "text-green", label: "Live" },
    pending: { bg: "bg-[#fdf0e6]", text: "text-amber", label: "Pending approval" },
    sold: { bg: "bg-paper-alt", text: "text-ink-soft", label: "Fully claimed" },
    expired: { bg: "bg-paper-alt", text: "text-ink-soft", label: "Expired" },
  } as const;
  const s = map[status];
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11.5px] font-bold ${s.bg} ${s.text}`}>
      {s.label}
    </span>
  );
}
